import { connect } from 'cloudflare:sockets';

/**
 * CFNext Secure v1.1.0
 *
 * Cloudflare Worker / Pages Worker 单文件版。
 *
 * 安全重构目标：
 * 1. 管理面板强制 ADMIN 认证；ADMIN 为空时拒绝启用管理面板。
 * 2. 使用 HMAC-SHA256 无状态会话 Cookie，不把登录 token 放进 KV。
 * 3. 管理 API 与公开订阅、代理入口分离。
 * 4. 代理入口只接受 VLESS UUID / Trojan password，不允许匿名建立 TCP 隧道。
 * 5. 外部订阅源限制 HTTPS、响应大小、候选数量和请求超时。
 * 6. 管理 API 做 Origin / CSRF 检查，配置写入严格白名单和长度限制。
 * 7. 管理页面输出使用 textContent，避免把配置值当 HTML 执行。
 * 8. 所有敏感配置默认不回传前端。
 *
 * 兼容环境变量：
 * U / D / PATH / ADMIN / HOST / PROXYIP / S / OUTBOUND / ECH / TROJAN /
 * TROJAN_PASSWORD / ALPN / YX / YXURL / K / BESTIP_AUTO
 *
 * 说明：这是安全重构版，核心 VLESS WS、Trojan WS、VLESS XHTTP、订阅和
 * SOCKS5/HTTP CONNECT 出站均保留；优选器采用受限外部源模式，避免把任意
 * URL 变成 Worker 的无限制服务端请求入口。
 */

const VERSION = '1.1.0-secure';
const SESSION_COOKIE = 'cfnext_auth';
const SESSION_TTL = 24 * 60 * 60;
const MAX_BODY = 128 * 1024;
const MAX_SOURCE_BYTES = 512 * 1024;
const MAX_SOURCE_NODES = 800;
const MAX_STRUCTURED_NODES = 300;
const CONNECT_TIMEOUT = 6000;
const HTTP_PORTS = new Set([80, 8080, 8880, 2052, 2082, 2086, 2095]);

const DEFAULT_REGION_SOURCES = [
  'https://bestcf.pages.dev/random-region/HK/100.txt',
  'https://bestcf.pages.dev/random-region/TW/100.txt',
  'https://bestcf.pages.dev/random-region/JP/100.txt',
  'https://bestcf.pages.dev/random-region/SG/100.txt',
  'https://bestcf.pages.dev/random-region/US/100.txt',
  'https://bestcf.pages.dev/random-region/KR/100.txt'
];

const SOURCE_CACHE = new Map();
const NODE_CACHE = new Map();
const SOURCE_CACHE_TTL = 5 * 60 * 1000;
const NODE_CACHE_TTL = 30 * 1000;

const DEFAULT_CONFIG = {
  uuid: '',
  path: '',
  admin: '',
  host: '',
  enableVless: true,
  enableTrojan: false,
  trojanPassword: '',
  enableXhttp: false,
  alpn: '',
  ech: false,
  echHost: 'cloudflare-ech.com',
  echDns: '',
  tlsOnly: false,
  nodeLimit: false,
  nodeLimitCount: 100,
  polling: true,
  proxyIP: '',
  outboundProxy: '',
  outboundMode: '',
  preferredDomains: DEFAULT_REGION_SOURCES,
  preferredIPs: [],
  optimizer: {
    sourceURL: '',
    subMode: '',
    subRandomCount: 16,
    maxNodes: 100
  }
};

const CLASH_RULES = `
rule-providers:
  private_domain:
    type: http
    behavior: domain
    format: mrs
    interval: 86400
    url: https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/private.mrs
  ai:
    type: http
    behavior: domain
    format: mrs
    interval: 86400
    url: https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-ai-!cn.mrs
  youtube_domain:
    type: http
    behavior: domain
    format: mrs
    interval: 86400
    url: https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/youtube.mrs
  google_domain:
    type: http
    behavior: domain
    format: mrs
    interval: 86400
    url: https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/google.mrs
  github_domain:
    type: http
    behavior: domain
    format: mrs
    interval: 86400
    url: https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/github.mrs
  telegram_domain:
    type: http
    behavior: domain
    format: mrs
    interval: 86400
    url: https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/telegram.mrs
  netflix_domain:
    type: http
    behavior: domain
    format: mrs
    interval: 86400
    url: https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/netflix.mrs
  gfw_domain:
    type: http
    behavior: domain
    format: mrs
    interval: 86400
    url: https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/gfw.mrs
  cn_domain:
    type: http
    behavior: domain
    format: mrs
    interval: 86400
    url: https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/cn.mrs
  cn_ip:
    type: http
    behavior: ipcidr
    format: mrs
    interval: 86400
    url: https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/cn.mrs

rules:
  - RULE-SET,private_domain,DIRECT
  - RULE-SET,ai,🚀 Proxy
  - RULE-SET,youtube_domain,🚀 Proxy
  - RULE-SET,google_domain,🚀 Proxy
  - RULE-SET,github_domain,🚀 Proxy
  - RULE-SET,telegram_domain,🚀 Proxy
  - RULE-SET,netflix_domain,🚀 Proxy
  - RULE-SET,gfw_domain,🚀 Proxy
  - RULE-SET,cn_domain,DIRECT
  - RULE-SET,cn_ip,DIRECT
  - MATCH,🚀 Proxy
`;

function cloneConfig(cfg) {
  return JSON.parse(JSON.stringify(cfg));
}

function bool(v) {
  return v === true || v === 1 || v === '1' || String(v).toLowerCase() === 'true';
}

function cleanPath(v) {
  return String(v || '').trim().replace(/^\/+|\/+$/g, '').replace(/[^A-Za-z0-9._~-]/g, '');
}

function cleanHost(v) {
  return String(v || '').trim().replace(/^https?:\/\//i, '').split('/')[0].slice(0, 253);
}

function validUUID(v) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
}

function normalizeUUID(v) {
  const s = String(v || '').trim().toLowerCase();
  return validUUID(s) ? s : '';
}

function parseCSVLines(v) {
  return String(v || '').split(/[\r\n,;]+/).map(x => x.trim()).filter(Boolean);
}

function parseHostPort(input, defaultPort = 443) {
  let s = String(input || '').trim();
  if (!s) return null;
  s = s.replace(/^\s+|\s+$/g, '');
  if (s.includes('://')) {
    try {
      const u = new URL(s);
      return { host: u.hostname, port: Number(u.port || defaultPort) };
    } catch (_) { return null; }
  }
  if (s.startsWith('[')) {
    const i = s.indexOf(']');
    if (i > 0) return { host: s.slice(1, i), port: Number(s.slice(i + 1).replace(/^:/, '') || defaultPort) };
  }
  const m = s.match(/^(.+?)(?::(\d{1,5}))?$/);
  if (!m) return null;
  return { host: m[1], port: Number(m[2] || defaultPort) };
}

function parseProxyAddress(input) {
  const raw = String(input || '').trim();
  if (!raw) return null;
  let type = 'socks5';
  let value = raw;
  if (/^https?:\/\//i.test(value)) type = 'http';
  else if (/^socks5h?:\/\//i.test(value)) type = 'socks5';
  else if (/^socks4a?:\/\//i.test(value)) return null;
  try {
    const u = value.includes('://') ? new URL(value) : new URL('socks5://' + value);
    const port = Number(u.port || (type === 'http' ? 8080 : 1080));
    if (!u.hostname || port < 1 || port > 65535) return null;
    return { type, host: u.hostname, port, user: decodeURIComponent(u.username || ''), pass: decodeURIComponent(u.password || '') };
  } catch (_) { return null; }
}

function parseCookie(request, name) {
  const raw = request.headers.get('Cookie') || '';
  const re = new RegExp('(?:^|;\\s*)' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)');
  const m = raw.match(re);
  return m ? decodeURIComponent(m[1]) : '';
}

function randomBytes(n) {
  const a = new Uint8Array(n);
  crypto.getRandomValues(a);
  return a;
}

function base64url(bytes) {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function utf8(s) { return new TextEncoder().encode(String(s)); }

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', utf8(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, utf8(data)));
}

async function constantTimeEqual(a, b) {
  const aa = typeof a === 'string' ? utf8(a) : a;
  const bb = typeof b === 'string' ? utf8(b) : b;
  if (aa.length !== bb.length) return false;
  let x = 0;
  for (let i = 0; i < aa.length; i++) x |= aa[i] ^ bb[i];
  return x === 0;
}

async function createSession(admin) {
  const iat = Math.floor(Date.now() / 1000);
  const nonce = base64url(randomBytes(24));
  const body = `${iat}.${nonce}`;
  const sig = base64url(await hmac(admin, body));
  return `${body}.${sig}`;
}

async function verifySession(request, admin) {
  if (!admin) return false;
  const token = parseCookie(request, SESSION_COOKIE);
  const p = token.split('.');
  if (p.length !== 3) return false;
  const iat = Number(p[0]);
  if (!Number.isSafeInteger(iat)) return false;
  if (Math.floor(Date.now() / 1000) - iat < 0 || Math.floor(Date.now() / 1000) - iat > SESSION_TTL) return false;
  const expected = base64url(await hmac(admin, `${p[0]}.${p[1]}`));
  return constantTimeEqual(p[2], expected);
}

function securityHeaders(extra = {}) {
  return Object.assign({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'same-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'X-Frame-Options': 'DENY',
    'Cross-Origin-Opener-Policy': 'same-origin'
  }, extra);
}

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: securityHeaders(Object.assign({
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }, extra))
  });
}

function text(data, status = 200, extra = {}) {
  return new Response(String(data), {
    status,
    headers: securityHeaders(Object.assign({
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store'
    }, extra))
  });
}

function isBrowserUA(ua) {
  return /Mozilla\//i.test(ua) && !/(?:Clash|v2ray|sing-box|Surge|Loon|Quantumult|Shadowrocket|Stash|Neko)/i.test(ua);
}

function sameOrigin(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  try { return new URL(origin).origin === new URL(request.url).origin; } catch (_) { return false; }
}

function redactConfig(cfg) {
  const out = cloneConfig(cfg);
  delete out.admin;
  delete out.trojanPassword;
  out.adminSet = !!cfg.admin;
  out.trojanPasswordSet = !!cfg.trojanPassword;
  if (out.outboundProxy) {
    try {
      const u = out.outboundProxy.includes('://') ? new URL(out.outboundProxy) : new URL('socks5://' + out.outboundProxy);
      out.outboundProxy = `${u.protocol}//${u.hostname}:${u.port || (u.protocol.startsWith('http') ? 8080 : 1080)}`;
    } catch (_) { out.outboundProxy = '***'; }
  }
  return out;
}

async function loadConfig(env) {
  const cfg = cloneConfig(DEFAULT_CONFIG);
  if (env.U) cfg.uuid = normalizeUUID(env.U);
  if (env.D || env.PATH) cfg.path = cleanPath(env.D || env.PATH);
  if (env.ADMIN) cfg.admin = String(env.ADMIN);
  if (env.HOST) cfg.host = cleanHost(env.HOST);
  if (env.PROXYIP) cfg.proxyIP = String(env.PROXYIP).slice(0, 255);
  if (env.S || env.OUTBOUND) cfg.outboundProxy = String(env.S || env.OUTBOUND).slice(0, 512);
  if (bool(env.ECH)) cfg.ech = true;
  if (bool(env.TROJAN)) cfg.enableTrojan = true;
  if (env.TROJAN_PASSWORD) cfg.trojanPassword = String(env.TROJAN_PASSWORD).slice(0, 256);
  if (env.ALPN) cfg.alpn = String(env.ALPN).slice(0, 128);
  if (env.YX) cfg.preferredIPs = parseIPList(env.YX);
  if (env.YXURL) cfg.optimizer.sourceURL = String(env.YXURL).slice(0, 512);

  if (env.K && typeof env.K.get === 'function') {
    try {
      const raw = await env.K.get('config');
      if (raw) mergeSafeConfig(cfg, JSON.parse(raw));
    } catch (_) {}
  }

  if (!cfg.uuid) throw new Error('缺少 U：必须配置合法的 VLESS UUID');
  if (!cfg.path) cfg.path = cfg.uuid;
  if (!cfg.admin) {
    // 安全版不允许关闭管理认证；代理订阅仍可工作。
    cfg.admin = '';
  }
  if (!cfg.host) cfg.host = '';
  if (!Array.isArray(cfg.preferredDomains) || !cfg.preferredDomains.length) cfg.preferredDomains = [...DEFAULT_REGION_SOURCES];
  cfg.preferredDomains = cfg.preferredDomains.slice(0, 32).map(String).filter(isAllowedSourceUrl);
  cfg.preferredIPs = normalizePreferredIPs(cfg.preferredIPs);
  cfg.nodeLimitCount = Math.min(Math.max(Number(cfg.nodeLimitCount) || 100, 1), MAX_STRUCTURED_NODES);
  cfg.optimizer = Object.assign(cloneConfig(DEFAULT_CONFIG.optimizer), cfg.optimizer || {});
  cfg.optimizer.subRandomCount = Math.min(Math.max(Number(cfg.optimizer.subRandomCount) || 16, 1), 99);
  return cfg;
}

function mergeSafeConfig(cfg, incoming) {
  if (!incoming || typeof incoming !== 'object') return;
  const boolKeys = ['enableVless','enableTrojan','enableXhttp','ech','tlsOnly','nodeLimit','polling'];
  for (const k of boolKeys) if (k in incoming) cfg[k] = !!incoming[k];
  const strKeys = ['host','alpn','echHost','echDns','proxyIP','outboundProxy','outboundMode','trojanPassword'];
  for (const k of strKeys) if (k in incoming) cfg[k] = String(incoming[k] ?? '').slice(0, 1024);
  if (incoming.path) cfg.path = cleanPath(incoming.path);
  if (incoming.uuid && validUUID(String(incoming.uuid))) cfg.uuid = String(incoming.uuid).toLowerCase();
  if (Number.isFinite(Number(incoming.nodeLimitCount))) cfg.nodeLimitCount = Number(incoming.nodeLimitCount);
  if (Array.isArray(incoming.preferredDomains)) cfg.preferredDomains = incoming.preferredDomains.slice(0, 32).map(String).filter(isAllowedSourceUrl);
  if (Array.isArray(incoming.preferredIPs)) cfg.preferredIPs = normalizePreferredIPs(incoming.preferredIPs);
  if (incoming.optimizer && typeof incoming.optimizer === 'object') {
    cfg.optimizer = Object.assign(cfg.optimizer, {
      sourceURL: String(incoming.optimizer.sourceURL || '').slice(0, 512),
      subMode: String(incoming.optimizer.subMode || '').slice(0, 16),
      subRandomCount: Number(incoming.optimizer.subRandomCount) || 16,
      maxNodes: Number(incoming.optimizer.maxNodes) || 100
    });
  }
}

async function saveConfig(env, cfg) {
  if (!env.K || typeof env.K.put !== 'function') return false;
  const safe = cloneConfig(cfg);
  // ADMIN、UUID 等来自运行环境，不允许图形化保存覆盖 ADMIN。
  delete safe.admin;
  delete safe.trojanPassword;
  await env.K.put('config', JSON.stringify(safe));
  return true;
}

function isAllowedSourceUrl(value) {
  try {
    const u = new URL(String(value));
    return u.protocol === 'https:' && u.hostname.length <= 253 && !isPrivateHostname(u.hostname);
  } catch (_) { return false; }
}

function isPrivateHostname(host) {
  const h = String(host || '').toLowerCase().replace(/^\[|\]$/g, '');
  if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h === '0.0.0.0') return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) || /^169\.254\./.test(h)) return true;
  const m = h.match(/^172\.(\d+)\./); if (m && Number(m[1]) >= 16 && Number(m[1]) <= 31) return true;
  if (/^(::1|fc|fd|fe80:)/i.test(h)) return true;
  return false;
}

function parseIPList(input) {
  return normalizePreferredIPs(parseCSVLines(input).map(item => {
    const [left, name] = item.split('#');
    const hp = parseHostPort(left, 443);
    return hp ? { ip: hp.host, port: hp.port, name: name || '' } : null;
  }).filter(Boolean));
}

function normalizePreferredIPs(list) {
  if (!Array.isArray(list)) return [];
  const out = [], seen = new Set();
  for (const item of list.slice(0, 300)) {
    if (!item) continue;
    const hp = parseHostPort(item.ip || item.host || item.server || '', Number(item.port || 443));
    if (!hp || hp.port < 1 || hp.port > 65535 || isPrivateHostname(hp.host)) continue;
    const key = `${hp.host}:${hp.port}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ ip: hp.host, port: hp.port, name: String(item.name || key).slice(0, 100) });
  }
  return out;
}

async function fetchLimited(url, timeout = 5000, maxBytes = MAX_SOURCE_BYTES) {
  if (!isAllowedSourceUrl(url)) throw new Error('外部源地址不在允许范围');
  const cached = SOURCE_CACHE.get(url);
  if (cached && Date.now() - cached.time < SOURCE_CACHE_TTL) return cached.text;
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeout);
  try {
    const res = await fetch(url, { redirect: 'error', signal: ac.signal, headers: { 'User-Agent': 'CFNext-Secure/1.1' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const len = Number(res.headers.get('Content-Length') || 0);
    if (len && len > maxBytes) throw new Error('外部源过大');
    if (!res.body) return '';
    const reader = res.body.getReader();
    const chunks = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) { try { await reader.cancel(); } catch (_) {} ; throw new Error('外部源过大'); }
      chunks.push(value);
    }
    const all = new Uint8Array(total);
    let p = 0; for (const c of chunks) { all.set(c, p); p += c.length; }
    const text = new TextDecoder().decode(all);
    SOURCE_CACHE.set(url, { time: Date.now(), text });
    if (SOURCE_CACHE.size > 32) SOURCE_CACHE.delete(SOURCE_CACHE.keys().next().value);
    return text;
  } finally { clearTimeout(timer); }
}

function parseSourceLines(text) {
  const result = [];
  const seen = new Set();
  for (const raw of String(text || '').split(/\r?\n/).slice(0, 5000)) {
    let s = raw.trim();
    if (!s || s.startsWith('#') || s.startsWith('//')) continue;
    s = s.replace(/^[-*]\s*/, '');
    if (/^vless:\/\//i.test(s) || /^trojan:\/\//i.test(s)) {
      if (!seen.has(s)) { seen.add(s); result.push({ link: s }); }
      continue;
    }
    const hp = parseHostPort(s.replace(/#.*/, ''), 443);
    if (!hp || isPrivateHostname(hp.host)) continue;
    const key = `${hp.host}:${hp.port}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ ip: hp.host, port: hp.port, name: key });
    if (result.length >= MAX_SOURCE_NODES) break;
  }
  return result;
}

async function collectCandidates(cfg) {
  const out = [...cfg.preferredIPs.map(x => ({ ip: x.ip, port: x.port, name: x.name }))];
  const sources = [...cfg.preferredDomains];
  if (cfg.optimizer?.sourceURL && isAllowedSourceUrl(cfg.optimizer.sourceURL)) sources.unshift(cfg.optimizer.sourceURL);
  const seen = new Set(out.map(x => `${x.ip}:${x.port}`));
  for (const source of sources.slice(0, 12)) {
    try {
      const parsed = parseSourceLines(await fetchLimited(source, 4500, MAX_SOURCE_BYTES));
      for (const n of parsed) {
        if (n.link) { out.push(n); continue; }
        const key = `${n.ip}:${n.port}`;
        if (!seen.has(key)) { seen.add(key); out.push(n); }
        if (out.length >= MAX_SOURCE_NODES) return out;
      }
    } catch (_) {}
  }
  return out.slice(0, MAX_SOURCE_NODES);
}

function nodeName(name, i) {
  return String(name || `CFNext-${i + 1}`).replace(/[\r\n#]/g, ' ').slice(0, 80);
}

function vlessNode(cfg, server, port, name, xhttp = false) {
  const host = cfg.host || server;
  const addr = String(server).includes(':') && !String(server).startsWith('[') ? `[${server}]` : server;
  const tls = !HTTP_PORTS.has(Number(port));
  let q = 'encryption=none';
  if (tls) q += '&security=tls&sni=' + encodeURIComponent(host) + '&fp=chrome';
  else q += '&security=none';
  q += '&host=' + encodeURIComponent(host);
  if (xhttp) {
    q += '&type=xhttp&mode=stream-one';
    q += '&path=' + encodeURIComponent('/' + cfg.path);
  } else {
    q += '&type=ws&path=' + encodeURIComponent('/' + cfg.path);
  }
  if (cfg.alpn) q += '&alpn=' + encodeURIComponent(cfg.alpn);
  if (cfg.ech && tls) q += '&ech=' + encodeURIComponent((cfg.echHost || 'cloudflare-ech.com') + '+' + (cfg.echDns || 'https://223.5.5.5/dns-query'));
  return `vless://${cfg.uuid}@${addr}:${port}?${q}#${encodeURIComponent(nodeName(name, 0))}`;
}

function trojanNode(cfg, server, port, name) {
  const host = cfg.host || server;
  const addr = String(server).includes(':') && !String(server).startsWith('[') ? `[${server}]` : server;
  let q = 'security=tls&sni=' + encodeURIComponent(host) + '&fp=chrome&host=' + encodeURIComponent(host) + '&type=ws&path=' + encodeURIComponent('/' + cfg.path);
  if (cfg.alpn) q += '&alpn=' + encodeURIComponent(cfg.alpn);
  if (cfg.ech) q += '&ech=' + encodeURIComponent((cfg.echHost || 'cloudflare-ech.com') + '+' + (cfg.echDns || 'https://223.5.5.5/dns-query'));
  return `trojan://${encodeURIComponent(cfg.trojanPassword || cfg.uuid)}@${addr}:${port}?${q}#${encodeURIComponent(nodeName(name, 0))}`;
}

function getParam(link, key) {
  const q = link.indexOf('?'); if (q < 0) return '';
  const h = link.indexOf('#', q); const qs = link.slice(q + 1, h >= 0 ? h : link.length);
  for (const p of qs.split('&')) { const [k, ...rest] = p.split('='); if (decodeURIComponent(k || '') === key) return decodeURIComponent(rest.join('=') || ''); }
  return '';
}

function parseShareNode(n, i) {
  const at = n.indexOf('@');
  let auth = '', srv = '', prt = 443;
  if (at >= 0) auth = n.slice(n.indexOf('://') + 3, at);
  const start = at >= 0 ? at + 1 : 0;
  const q = n.indexOf('?', start);
  const end = q >= 0 ? q : (n.indexOf('#', start) >= 0 ? n.indexOf('#', start) : n.length);
  const hostport = n.slice(start, end);
  if (hostport.startsWith('[')) {
    const close = hostport.indexOf(']'); srv = hostport.slice(1, close); prt = Number(hostport.slice(close + 1).replace(/^:/, '') || 443);
  } else {
    const m = hostport.match(/^(.+):([0-9]+)$/); if (m) { srv = m[1]; prt = Number(m[2]); } else srv = hostport;
  }
  let name = '';
  const hash = n.indexOf('#'); if (hash >= 0) { try { name = decodeURIComponent(n.slice(hash + 1)); } catch (_) { name = n.slice(hash + 1); } }
  return { srv, prt, name: name || `Node-${i + 1}`, user: decodeURIComponent(auth || ''), isTrojan: /^trojan:\/\//i.test(n), tls: /^trojan:\/\//i.test(n) || getParam(n, 'security') === 'tls' };
}

function filterNodes(cfg, nodes) {
  const seen = new Set(), out = [];
  for (const n of nodes) {
    const p = parseShareNode(n, out.length);
    const key = `${p.srv}:${p.prt}:${p.isTrojan ? 't' : 'v'}:${getParam(n, 'type')}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (cfg.tlsOnly && !p.tls) continue;
    out.push(n);
    if (out.length >= (cfg.nodeLimit ? cfg.nodeLimitCount : MAX_SOURCE_NODES)) break;
  }
  return out;
}

async function buildNodes(cfg) {
  const cacheKey = JSON.stringify({ path: cfg.path, host: cfg.host, v: cfg.enableVless, t: cfg.enableTrojan, x: cfg.enableXhttp, tls: cfg.tlsOnly, limit: cfg.nodeLimit, count: cfg.nodeLimitCount, domains: cfg.preferredDomains, ips: cfg.preferredIPs, sourceURL: cfg.optimizer?.sourceURL });
  const cached = NODE_CACHE.get(cacheKey);
  if (cached && Date.now() - cached.time < NODE_CACHE_TTL) return cached.nodes;
  const candidates = await collectCandidates(cfg);
  let nodes = [];
  let index = 0;
  for (const c of candidates) {
    if (c.link) {
      nodes.push(c.link);
      continue;
    }
    if (cfg.enableVless) nodes.push(vlessNode(cfg, c.ip, c.port, c.name || `优选-${++index}`));
    if (cfg.enableTrojan && !HTTP_PORTS.has(Number(c.port))) nodes.push(trojanNode(cfg, c.ip, c.port, c.name || `优选-${++index}`));
    if (cfg.enableXhttp) nodes.push(vlessNode(cfg, c.ip, c.port, c.name || `XHTTP-${++index}`, true));
    if (nodes.length >= MAX_SOURCE_NODES) break;
  }
  nodes = filterNodes(cfg, nodes);
  if (!nodes.length && cfg.enableVless) nodes.push(vlessNode(cfg, cfg.host || 'example.com', 443, '备用节点'));
  NODE_CACHE.set(cacheKey, { time: Date.now(), nodes });
  if (NODE_CACHE.size > 16) NODE_CACHE.delete(NODE_CACHE.keys().next().value);
  return nodes;
}

function clashProxy(n, i, cfg) {
  const p = parseShareNode(n, i), host = cfg.host || p.srv, path = getParam(n, 'path') || '/' + cfg.path;
  const tls = p.tls ? 'true' : 'false';
  if (p.isTrojan) return `  - {name: "${escapeYaml(p.name)}", type: trojan, server: ${p.srv}, port: ${p.prt}, password: "${escapeYaml(p.user)}", sni: "${escapeYaml(host)}", udp: true, network: ws, ws-opts: {path: "${escapeYaml(path)}", headers: {Host: "${escapeYaml(host)}"}}}`;
  return `  - {name: "${escapeYaml(p.name)}", type: vless, server: ${p.srv}, port: ${p.prt}, uuid: ${p.user}, cipher: none, tls: ${tls}, servername: "${escapeYaml(host)}", udp: true, network: ws, ws-opts: {path: "${escapeYaml(path)}", headers: {Host: "${escapeYaml(host)}"}}}`;
}

function escapeYaml(s) { return String(s || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

function generateClash(cfg, nodes) {
  const proxies = nodes.map((n, i) => clashProxy(n, i, cfg)).join('\n');
  const names = nodes.map((n, i) => `"${escapeYaml(parseShareNode(n, i).name)}"`).join(', ');
  return `mixed-port: 7890\nallow-lan: false\nmode: rule\nproxies:\n${proxies}\nproxy-groups:\n  - {name: 🚀 Proxy, type: select, proxies: [${names}, DIRECT]}\n  - {name: DIRECT, type: select, proxies: [DIRECT]}\n${CLASH_RULES}`;
}

function generateSingbox(cfg, nodes) {
  const out = nodes.map((n, i) => {
    const p = parseShareNode(n, i), tls = p.tls;
    const base = { type: p.isTrojan ? 'trojan' : 'vless', tag: p.name, server: p.srv, server_port: p.prt };
    if (p.isTrojan) { base.password = p.user; base.tls = { enabled: true, server_name: cfg.host || p.srv }; }
    else { base.uuid = p.user; base.tls = { enabled: tls, server_name: cfg.host || p.srv }; base.transport = { type: 'ws', path: getParam(n, 'path') || '/' + cfg.path, headers: { Host: cfg.host || p.srv } }; }
    return base;
  });
  return JSON.stringify({ log: { level: 'info' }, outbounds: [...out, { type: 'direct', tag: 'direct' }, { type: 'selector', tag: '🚀 节点选择', outbounds: out.map(x => x.tag) }] }, null, 2);
}

function generateSurge(cfg, nodes) {
  const lines = nodes.map((n, i) => {
    const p = parseShareNode(n, i), host = cfg.host || p.srv, path = getParam(n, 'path') || '/' + cfg.path;
    if (p.isTrojan) return `${p.name} = trojan, ${p.srv}, ${p.prt}, password=${p.user}, sni=${host}, ws=true, ws-path=${path}, ws-headers=Host:${host}`;
    return `${p.name} = vless, ${p.srv}, ${p.prt}, username=${p.user}, tls-name=${host}, ws=true, ws-path=${path}, ws-headers=Host:${host}`;
  });
  return `#!MANAGED-CONFIG\n[General]\ndns-server = 223.5.5.5, 119.29.29.29\n[Proxy]\n${lines.join('\n')}\n[Proxy Group]\n🚀 节点选择 = select, ${nodes.map((n, i) => parseShareNode(n, i).name).join(', ')}, DIRECT\n[Rule]\nGEOIP,CN,DIRECT\nFINAL,🚀 节点选择\n`;
}

function generateLoon(cfg, nodes) {
  const lines = nodes.map((n, i) => {
    const p = parseShareNode(n, i), host = cfg.host || p.srv, path = getParam(n, 'path') || '/' + cfg.path;
    if (p.isTrojan) return `${p.name} = trojan, ${p.srv}, ${p.prt}, password=${p.user}, over-tls=true, tls-name=${host}, obfs=wss, obfs-host=${host}, obfs-uri=${path}`;
    return `${p.name} = vless, ${p.srv}, ${p.prt}, uuid=${p.user}, transport=ws, path=${path}, host=${host}`;
  });
  return `[General]\ndns-server = 223.5.5.5, 119.29.29.29\n[Proxy]\n${lines.join('\n')}\n[Proxy Group]\n🚀 节点选择 = select, ${nodes.map((n, i) => parseShareNode(n, i).name).join(', ')}, DIRECT\n[Rule]\nGEOIP,CN,DIRECT\nFINAL,🚀 节点选择\n`;
}

function generateQuanX(cfg, nodes) {
  const lines = nodes.map((n, i) => {
    const p = parseShareNode(n, i), host = cfg.host || p.srv, path = getParam(n, 'path') || '/' + cfg.path;
    if (p.isTrojan) return `trojan=${p.srv}:${p.prt}, password=${p.user}, over-tls=true, tls-host=${host}, obfs=wss, obfs-host=${host}, obfs-uri=${path}, tag=${p.name}`;
    return `vless=${p.srv}:${p.prt}, method=none, password=${p.user}, obfs=${p.tls ? 'wss' : 'ws'}, obfs-host=${host}, obfs-uri=${path}, tag=${p.name}`;
  });
  return `[general]\nserver_check_url=http://www.gstatic.com/generate_204\n[server_local]\n${lines.join('\n')}\n[policy]\nstatic=🚀 节点选择, ${nodes.map((n, i) => parseShareNode(n, i).name).join(', ')}\n[filter_local]\ngeoip, cn, DIRECT\nfinal, 🚀 节点选择\n`;
}

function detectFormat(ua, url) {
  const f = new URL(url).searchParams.get('format');
  if (f) return f.toLowerCase();
  const u = String(ua || '').toLowerCase();
  if (u.includes('clash') || u.includes('mihomo')) return 'clash';
  if (u.includes('sing-box') || u.includes('singbox')) return 'singbox';
  if (u.includes('surge')) return 'surge';
  if (u.includes('loon')) return 'loon';
  if (u.includes('quantumult')) return 'quanx';
  return 'v2ray';
}

function generateSubscription(cfg, nodes, format) {
  switch (format) {
    case 'clash': case 'mihomo': return generateClash(cfg, nodes);
    case 'singbox': case 'sing-box': return generateSingbox(cfg, nodes);
    case 'surge': return generateSurge(cfg, nodes);
    case 'loon': return generateLoon(cfg, nodes);
    case 'quanx': case 'quantumult': case 'quantumultx': return generateQuanX(cfg, nodes);
    default: return nodes.join('\n');
  }
}

function uuidBytes(uuid) {
  const h = uuid.replace(/-/g, '');
  const a = new Uint8Array(16);
  for (let i = 0; i < 16; i++) a[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return a;
}

function bytesEqual(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  let x = 0; for (let i = 0; i < a.length; i++) x |= a[i] ^ b[i];
  return x === 0;
}

function concatBytes(...parts) {
  const len = parts.reduce((n, x) => n + x.length, 0);
  const out = new Uint8Array(len); let p = 0;
  for (const x of parts) { out.set(x, p); p += x.length; }
  return out;
}

function parseAddress(view, offset) {
  const type = view.getUint8(offset++);
  if (type === 1) {
    if (offset + 4 > view.byteLength) throw new Error('VLESS 地址不完整');
    const addr = [...new Uint8Array(view.buffer, view.byteOffset + offset, 4)].join('.');
    return { addr, offset: offset + 4 };
  }
  if (type === 2) {
    const len = view.getUint8(offset++);
    if (offset + len > view.byteLength) throw new Error('VLESS 域名不完整');
    const addr = new TextDecoder().decode(new Uint8Array(view.buffer, view.byteOffset + offset, len));
    return { addr, offset: offset + len };
  }
  if (type === 3) {
    if (offset + 16 > view.byteLength) throw new Error('VLESS IPv6 地址不完整');
    const b = new Uint8Array(view.buffer, view.byteOffset + offset, 16);
    const groups = []; for (let i = 0; i < 16; i += 2) groups.push(((b[i] << 8) | b[i + 1]).toString(16));
    return { addr: groups.join(':'), offset: offset + 16 };
  }
  throw new Error('不支持的地址类型');
}

function parseVlessHeader(data, uuid) {
  if (data.byteLength < 24) throw new Error('VLESS 头部过短');
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  if (view.getUint8(0) !== 0) throw new Error('VLESS 版本错误');
  const got = new Uint8Array(data.buffer, data.byteOffset + 1, 16);
  if (!bytesEqual(got, uuidBytes(uuid))) throw new Error('VLESS UUID 无效');
  let o = 17;
  const addonLen = view.getUint8(o++);
  if (o + addonLen + 4 > view.byteLength) throw new Error('VLESS 头部不完整');
  o += addonLen;
  const cmd = view.getUint8(o++);
  if (cmd !== 1) throw new Error('当前安全版仅支持 VLESS TCP');
  const port = view.getUint16(o); o += 2;
  const a = parseAddress(view, o); o = a.offset;
  return { addr: a.addr, port, headerLength: o, isVless: true };
}

async function sha224Hex(s) {
  // Cloudflare Web Crypto 不保证 SHA-224，因此用小型纯 JS SHA-224。
  return sha224(s);
}

function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }
function sha256Words(msg) {
  const K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  let h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  const ml = msg.length * 8, n = (((msg.length + 9 + 63) >> 6) << 6);
  const m = new Uint8Array(n); m.set(msg); m[msg.length] = 0x80;
  const dv = new DataView(m.buffer); dv.setUint32(n - 4, ml >>> 0); dv.setUint32(n - 8, Math.floor(ml / 0x100000000));
  const w = new Uint32Array(64);
  for (let p = 0; p < n; p += 64) {
    for (let i = 0; i < 16; i++) w[i] = dv.getUint32(p + i * 4);
    for (let i = 16; i < 64; i++) { const x = w[i-15], y = w[i-2]; w[i] = (((rotr(x,7)^rotr(x,18)^(x>>>3)) + w[i-16]) + (rotr(y,17)^rotr(y,19)^(y>>>10)) + w[i-7]) >>> 0; }
    let [a,b,c,d,e,f,g,hh] = h;
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e,6)^rotr(e,11)^rotr(e,25), ch = (e&f)^((~e)&g), t1 = (hh + S1 + ch + K[i] + w[i]) >>> 0;
      const S0 = rotr(a,2)^rotr(a,13)^rotr(a,22), maj = (a&b)^(a&c)^(b&c), t2 = (S0 + maj) >>> 0;
      hh=g; g=f; f=e; e=(d+t1)>>>0; d=c; c=b; b=a; a=(t1+t2)>>>0;
    }
    h = h.map((x,i)=> (x + [a,b,c,d,e,f,g,hh][i]) >>> 0);
  }
  return h;
}
function sha224(s) {
  const K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  const init = [0xc1059ed8,0x367cd507,0x3070dd17,0xf70e5939,0xffc00b31,0x68581511,0x64f98fa7,0xbefa4fa4];
  const msg = utf8(s), ml = msg.length * 8;
  const n = (((msg.length + 9 + 63) >> 6) << 6);
  const m = new Uint8Array(n); m.set(msg); m[msg.length] = 0x80;
  const dv = new DataView(m.buffer);
  dv.setUint32(n - 8, Math.floor(ml / 0x100000000));
  dv.setUint32(n - 4, ml >>> 0);
  let h = [...init]; const w = new Uint32Array(64);
  for (let p = 0; p < n; p += 64) {
    for (let i = 0; i < 16; i++) w[i] = dv.getUint32(p + i * 4);
    for (let i = 16; i < 64; i++) {
      const x = w[i - 15], y = w[i - 2];
      w[i] = ((rotr(x,7)^rotr(x,18)^(x>>>3)) + w[i-16] + (rotr(y,17)^rotr(y,19)^(y>>>10)) + w[i-7]) >>> 0;
    }
    let [a,b,c,d,e,f,g,hh] = h;
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e,6)^rotr(e,11)^rotr(e,25);
      const ch = (e&f)^((~e)&g);
      const t1 = (hh + S1 + ch + K[i] + w[i]) >>> 0;
      const S0 = rotr(a,2)^rotr(a,13)^rotr(a,22);
      const maj = (a&b)^(a&c)^(b&c);
      const t2 = (S0 + maj) >>> 0;
      hh=g; g=f; f=e; e=(d+t1)>>>0; d=c; c=b; b=a; a=(t1+t2)>>>0;
    }
    h = h.map((x,i) => (x + [a,b,c,d,e,f,g,hh][i]) >>> 0);
  }
  return h.slice(0,7).map(x => x.toString(16).padStart(8,'0')).join('');
}

function parseTrojanHeader(data, passwordHash) {
  if (data.byteLength < 59) throw new Error('Trojan 头部过短');
  const td = new TextDecoder();
  const hash = td.decode(data.subarray(0, 56)).toLowerCase();
  if (hash !== passwordHash.toLowerCase()) throw new Error('Trojan 密码无效');
  if (data[56] !== 0x0d || data[57] !== 0x0a) throw new Error('Trojan 认证头无效');
  let o = 58; const cmd = data[o++]; if (cmd !== 1) throw new Error('当前安全版仅支持 Trojan TCP');
  o += 2;
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const a = parseAddress(view, o); o = a.offset;
  if (o + 2 > data.byteLength) throw new Error('Trojan 端口不完整');
  const port = view.getUint16(o); o += 2;
  if (o + 2 > data.byteLength || data[o] !== 0x0d || data[o+1] !== 0x0a) throw new Error('Trojan 结束符无效');
  return { addr: a.addr, port, headerLength: o + 2, isTrojan: true };
}

async function tryConnect(target, timeout = CONNECT_TIMEOUT) {
  const p = connect({ hostname: target.hostname, port: Number(target.port) });
  const timer = new Promise((_, reject) => setTimeout(() => reject(new Error('connect timeout')), timeout));
  try { return await Promise.race([p, timer]); } catch (_) { try { (await Promise.resolve(p)).close(); } catch (_) {} return null; }
}

async function connectViaSocks5(proxy, target) {
  const socket = await tryConnect({ hostname: proxy.host, port: proxy.port });
  if (!socket) throw new Error('SOCKS5 连接失败');
  const w = socket.writable.getWriter(); const r = socket.readable.getReader();
  const methods = proxy.user ? new Uint8Array([5,1,2]) : new Uint8Array([5,1,0]);
  await w.write(methods);
  const g = await r.read(); if (g.done || g.value.length < 2 || g.value[0] !== 5) throw new Error('SOCKS5 握手失败');
  if (g.value[1] === 2) {
    const ub = utf8(proxy.user), pb = utf8(proxy.pass); if (ub.length > 255 || pb.length > 255) throw new Error('SOCKS5 凭据过长');
    await w.write(concatBytes(new Uint8Array([1, ub.length]), ub, new Uint8Array([pb.length]), pb));
    const a = await r.read(); if (a.done || a.value.length < 2 || a.value[1] !== 0) throw new Error('SOCKS5 认证失败');
  } else if (g.value[1] !== 0) throw new Error('SOCKS5 不支持认证方式');
  const host = target.hostname;
  let req;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) req = concatBytes(new Uint8Array([5,1,0,1]), new Uint8Array(host.split('.').map(Number)));
  else { const hb = utf8(host); if (hb.length > 255) throw new Error('目标域名过长'); req = concatBytes(new Uint8Array([5,1,0,3,hb.length]), hb); }
  req = concatBytes(req, new Uint8Array([target.port >> 8, target.port & 255]));
  await w.write(req); const b = await r.read(); if (b.done || b.value.length < 2 || b.value[1] !== 0) throw new Error('SOCKS5 CONNECT 失败');
  r.releaseLock(); w.releaseLock(); return socket;
}

async function readUntil(reader, marker, max = 8192) {
  const chunks=[]; let total=0;
  while(total<max){const {done,value}=await reader.read();if(done)break;chunks.push(value);total+=value.length;const all=new Uint8Array(total);let p=0;for(const c of chunks){all.set(c,p);p+=c.length;}const text=new TextDecoder().decode(all);const idx=text.indexOf(marker);if(idx>=0)return {all,idx};}
  throw new Error('代理响应头过大');
}

async function connectViaHttpProxy(proxy, target) {
  const socket = await tryConnect({ hostname: proxy.host, port: proxy.port }); if (!socket) throw new Error('HTTP 代理连接失败');
  const w=socket.writable.getWriter(), r=socket.readable.getReader();
  const auth = proxy.user ? 'Proxy-Authorization: Basic ' + btoa(`${proxy.user}:${proxy.pass}`) + '\r\n' : '';
  await w.write(utf8(`CONNECT ${target.hostname}:${target.port} HTTP/1.1\r\nHost: ${target.hostname}:${target.port}\r\n${auth}Connection: Keep-Alive\r\n\r\n`));
  const x=await readUntil(r,'\r\n\r\n'); const head=new TextDecoder().decode(x.all.subarray(0,x.idx+4));
  if (!/^HTTP\/\d\.\d\s+200\b/i.test(head)) throw new Error('HTTP CONNECT 被拒绝');
  r.releaseLock(); w.releaseLock(); return socket;
}

async function openOutbound(parsed, cfg) {
  const target = { hostname: parsed.addr, port: parsed.port };
  const proxy = parseProxyAddress(cfg.outboundProxy);
  const direct = () => tryConnect(target, CONNECT_TIMEOUT);
  const viaProxy = () => proxy ? (proxy.type === 'http' ? connectViaHttpProxy(proxy, target) : connectViaSocks5(proxy, target)) : null;

  if (cfg.outboundMode === 'only') {
    if (!proxy) throw new Error('outboundMode=only 但未配置出站代理');
    const s = await viaProxy(); if (!s) throw new Error('出站代理连接失败'); return s;
  }
  if (cfg.outboundMode !== 'no' && proxy) {
    try { const s = await viaProxy(); if (s) return s; } catch (_) {}
  }
  let s = await direct(); if (s) return s;

  // PROXYIP：透明 TCP relay。适合 Cloudflare IP + TLS SNI 场景。
  const relay = parseHostPort(cfg.proxyIP, 443);
  if (relay) {
    s = await tryConnect({ hostname: relay.host, port: relay.port }, CONNECT_TIMEOUT);
    if (s) return s;
  }
  throw new Error('无法建立出站连接');
}

async function pipeSocketToWebSocket(socket, ws) {
  const reader = socket.readable.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value && value.byteLength) ws.send(value);
    }
  } catch (_) {}
  try { reader.releaseLock(); } catch (_) {}
}

async function handleWebSocketProxy(request, cfg) {
  const pair = new WebSocketPair();
  const [client, server] = Object.values(pair);
  server.accept(); server.binaryType = 'arraybuffer';
  let socket = null, writer = null, headerDone = false, pending = new Uint8Array(0);
  const expectedUUID = uuidBytes(cfg.uuid);
  const trojanHash = cfg.enableTrojan ? await sha224Hex(cfg.trojanPassword || cfg.uuid) : '';

  const closeAll = () => { try { writer?.releaseLock(); } catch (_) {} try { socket?.close(); } catch (_) {} try { server.close(); } catch (_) {} };
  server.addEventListener('message', async ev => {
    try {
      let data = typeof ev.data === 'string' ? utf8(ev.data) : new Uint8Array(ev.data);
      if (!headerDone) {
        if (pending.length + data.length > 64 * 1024) throw new Error('代理头过大');
        pending = concatBytes(pending, data);
        let parsed;
        try {
          const vlessPossible = pending.length >= 1 && pending[0] === 0;
          if (vlessPossible && cfg.enableVless) parsed = parseVlessHeader(pending, cfg.uuid);
          else if (cfg.enableTrojan) parsed = parseTrojanHeader(pending, trojanHash);
          else throw new Error('协议未启用');
        } catch (e) {
          if (/过短|不完整/.test(e.message || '') && pending.length < 64 * 1024) return;
          throw e;
        }
        socket = await openOutbound(parsed, cfg);
        writer = socket.writable.getWriter();
        const rest = pending.subarray(parsed.headerLength);
        if (rest.length) await writer.write(rest);
        pending = new Uint8Array(0); headerDone = true;
        void pipeSocketToWebSocket(socket, server);
        return;
      }
      if (data.length) await writer.write(data);
    } catch (_) { closeAll(); }
  });
  server.addEventListener('close', closeAll); server.addEventListener('error', closeAll);
  return new Response(null, { status: 101, webSocket: client });
}

async function handleXhttpProxy(request, cfg) {
  if (!cfg.enableXhttp) return text('xhttp disabled', 404);
  if (!request.body) return text('empty body', 400);
  const reader = request.body.getReader();
  const first = await reader.read(); if (first.done) return text('empty body', 400);
  const firstData = new Uint8Array(first.value);
  let parsed;
  try { parsed = parseVlessHeader(firstData, cfg.uuid); } catch (e) { return text(e.message || 'invalid vless', 403); }
  let socket;
  try { socket = await openOutbound(parsed, cfg); } catch (e) { return text('connect failed', 502); }
  const writer = socket.writable.getWriter();
  const firstPayload = firstData.subarray(parsed.headerLength); if (firstPayload.length) await writer.write(firstPayload);
  const pump = (async () => { try { while (true) { const x = await reader.read(); if (x.done) break; if (x.value?.length) await writer.write(x.value); } } catch (_) {} try { await writer.close(); } catch (_) {} })();
  const outReader = socket.readable.getReader();
  const stream = new ReadableStream({
    async pull(controller) { try { const x = await outReader.read(); if (x.done) { controller.close(); outReader.releaseLock(); return; } controller.enqueue(x.value); } catch (_) { try { controller.close(); } catch (_) {} } },
    cancel() { try { socket.close(); } catch (_) {} }
  });
  void pump;
  return new Response(stream, { status: 200, headers: securityHeaders({ 'Content-Type': 'application/octet-stream', 'Cache-Control': 'no-store' }) });
}

const LOGIN_HTML = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CFNext Secure</title><style>body{margin:0;background:#0f172a;color:#e5e7eb;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;display:grid;place-items:center;min-height:100vh}.box{width:min(420px,90vw);padding:28px;border:1px solid #334155;border-radius:16px;background:#111827;box-shadow:0 20px 60px #0006}h1{margin:0 0 8px}p{color:#94a3b8}input,button{box-sizing:border-box;width:100%;padding:12px;border-radius:10px;border:1px solid #475569;background:#0b1220;color:#fff;margin-top:10px}button{cursor:pointer;background:#2563eb;border:0}.err{color:#fca5a5;min-height:20px}</style></head><body><form class="box" id="f"><h1>CFNext Secure</h1><p>管理面板需要 ADMIN 密码。</p><input id="p" type="password" autocomplete="current-password" placeholder="ADMIN"><div class="err" id="e"></div><button>登录</button></form><script>f.onsubmit=async e=>{e.preventDefault();let r=await fetch('/login',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'password='+encodeURIComponent(p.value)+'&next='+encodeURIComponent(new URLSearchParams(location.search).get('next')||'/')});let j=await r.json();if(j.ok)location.href=j.next||'/';else document.getElementById('e').textContent=j.msg||'登录失败'};</script></body></html>`;

const PANEL_HTML = (panelPath) => `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CFNext Secure</title><style>body{margin:0;background:#0f172a;color:#e5e7eb;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.wrap{max-width:1000px;margin:30px auto;padding:0 16px}.card{background:#111827;border:1px solid #334155;border-radius:16px;padding:18px;margin:14px 0}h1{margin:0}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}label{display:block;color:#94a3b8;font-size:13px}input,select,textarea,button{width:100%;box-sizing:border-box;margin-top:6px;padding:10px;border-radius:9px;border:1px solid #475569;background:#0b1220;color:#fff}textarea{min-height:130px;font-family:monospace}button{cursor:pointer;background:#2563eb;border:0}.danger{background:#7f1d1d}.muted{color:#94a3b8}.ok{color:#86efac}.err{color:#fca5a5;white-space:pre-wrap}</style></head><body><div class="wrap"><div class="card"><h1>CFNext Secure <span class="muted">v1.1.0</span></h1><p class="muted">安全重构版：管理认证、代理认证、外部源限制、敏感配置脱敏。</p><div id="status" class="muted">加载中…</div></div><div class="card"><h2>基础配置</h2><div class="grid"><div><label>面板路径</label><input id="path"></div><div><label>Host / SNI</label><input id="host"></div><div><label>ALPN</label><input id="alpn"></div><div><label>PROXYIP</label><input id="proxyIP"></div><div><label>出站代理</label><input id="outboundProxy"></div><div><label>出站方式</label><select id="outboundMode"><option value="">代理优先，失败直连</option><option value="no">直连优先</option><option value="only">仅代理</option></select></div></div></div><div class="card"><h2>协议</h2><div class="grid"><label>VLESS WS <input id="enableVless" type="checkbox"></label><label>Trojan WS <input id="enableTrojan" type="checkbox"></label><label>XHTTP <input id="enableXhttp" type="checkbox"></label><label>ECH <input id="ech" type="checkbox"></label><label>TLS-only <input id="tlsOnly" type="checkbox"></label><label>节点数量限制 <input id="nodeLimit" type="checkbox"></label></div><div class="grid"><div><label>Trojan 密码（不填则使用 UUID）</label><input id="trojanPassword" type="password"></div><div><label>最大节点数</label><input id="nodeLimitCount" type="number" min="1" max="300"></div></div></div><div class="card"><h2>优选源</h2><label>每行一个 HTTPS 源</label><textarea id="preferredDomains"></textarea><label>固定优选 IP（IP:端口#名称，每行一个）</label><textarea id="preferredIPs"></textarea></div><div class="card"><button id="save">保存</button><button id="logout">退出登录</button><div id="msg"></div></div></div><script>
const P=${JSON.stringify(panelPath)};const $=id=>document.getElementById(id);async function api(n,o={}){let r=await fetch('/'+P+'/api/'+n,o);let j=await r.json().catch(()=>({ok:false,msg:'响应错误'}));if(r.status===401||r.status===403)location.href='/login?next='+encodeURIComponent(location.pathname);return j}function setv(c){$('path').value=c.path||P;$('host').value=c.host||'';$('alpn').value=c.alpn||'';$('proxyIP').value=c.proxyIP||'';$('outboundProxy').value=c.outboundProxy||'';$('outboundMode').value=c.outboundMode||'';$('enableVless').checked=c.enableVless!==false;$('enableTrojan').checked=!!c.enableTrojan;$('enableXhttp').checked=!!c.enableXhttp;$('ech').checked=!!c.ech;$('tlsOnly').checked=!!c.tlsOnly;$('nodeLimit').checked=!!c.nodeLimit;$('nodeLimitCount').value=c.nodeLimitCount||100;$('preferredDomains').value=(c.preferredDomains||[]).join('\\n');$('preferredIPs').value=(c.preferredIPs||[]).map(x=>x.ip+':'+x.port+'#'+(x.name||'')).join('\\n');$('status').textContent='版本 '+(c.version||'')+'；ADMIN '+(c.adminSet?'已设置':'未设置（安全版拒绝启用管理）')}async function load(){let r=await api('config');if(r.ok)setv(r.data);else $('msg').textContent=r.msg||'加载失败'}$('save').onclick=async()=>{let body={path:$('path').value,host:$('host').value,alpn:$('alpn').value,proxyIP:$('proxyIP').value,outboundProxy:$('outboundProxy').value,outboundMode:$('outboundMode').value,enableVless:$('enableVless').checked,enableTrojan:$('enableTrojan').checked,enableXhttp:$('enableXhttp').checked,ech:$('ech').checked,tlsOnly:$('tlsOnly').checked,nodeLimit:$('nodeLimit').checked,nodeLimitCount:+$('nodeLimitCount').value,preferredDomains:$('preferredDomains').value.split(/\\n/).map(x=>x.trim()).filter(Boolean),preferredIPs:$('preferredIPs').value.split(/\\n/).map(x=>{let[a,n]=x.split('#');let m=a.match(/^(.+?)(?::(\\d+))?$/);return m?{ip:m[1],port:+(m[2]||443),name:n||''}:null}).filter(Boolean)};let r=await api('config',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});$('msg').textContent=r.ok?'已保存':'保存失败：'+(r.msg||'未知错误')};$('logout').onclick=async()=>{await fetch('/logout',{method:'POST'});location.href='/login'};load();</script></body></html>`;

async function handleRequest(request, env) {
  const url = new URL(request.url);
  if (url.protocol === 'http:') return Response.redirect(url.href.replace(/^http:/, 'https:'), 301);
  const cfg = await loadConfig(env);
  const path = url.pathname.replace(/^\/+|\/+$/g, '');
  const segs = path ? path.split('/') : [];
  const panelPath = cfg.path || cfg.uuid;
  const isPanelRoot = segs[0] === panelPath;

  if (segs[0] === 'version') return json({ version: VERSION });

  if (segs[0] === 'login') {
    if (request.method === 'GET') return new Response(LOGIN_HTML, { headers: securityHeaders({ 'Content-Type':'text/html; charset=utf-8', 'Content-Security-Policy': "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; form-action 'self'" }) });
    if (request.method === 'POST') {
      const body = await request.text();
      if (body.length > 4096) return json({ ok:false,msg:'请求过大' }, 400);
      const p = new URLSearchParams(body);
      if (!cfg.admin) return json({ ok:false,msg:'安全版必须配置 ADMIN' }, 503);
      if (!(await constantTimeEqual(String(p.get('password') || ''), cfg.admin))) return json({ ok:false,msg:'密码错误' }, 403);
      const token = await createSession(cfg.admin);
      const nextRaw = p.get('next') || '/' + panelPath;
      const next = nextRaw.startsWith('/' + panelPath) ? nextRaw : '/' + panelPath;
      return json({ ok:true,next }, 200, { 'Set-Cookie': `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${SESSION_TTL}; HttpOnly; Secure; SameSite=Strict` });
    }
    return text('Method Not Allowed',405);
  }

  if (segs[0] === 'logout') {
    return new Response(JSON.stringify({ok:true}), { status:200, headers:securityHeaders({ 'Content-Type':'application/json; charset=utf-8', 'Set-Cookie':`${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`, 'Cache-Control':'no-store' }) });
  }

  if (isPanelRoot && (request.headers.get('Upgrade') || '').toLowerCase() === 'websocket') {
    if (!cfg.enableVless && !cfg.enableTrojan) return text('proxy disabled', 404);
    return handleWebSocketProxy(request, cfg);
  }

  if (isPanelRoot && request.method === 'POST' && cfg.enableXhttp) {
    return handleXhttpProxy(request, cfg);
  }

  if (isPanelRoot && segs.length === 2 && segs[1] === 'sub') {
    const nodes = await buildNodes(cfg);
    const format = detectFormat(request.headers.get('User-Agent') || '', request.url);
    const body = generateSubscription(cfg, nodes, format);
    return new Response(body, { status:200, headers:securityHeaders({ 'Content-Type': format === 'v2ray' ? 'text/plain; charset=utf-8' : 'text/plain; charset=utf-8', 'Cache-Control':'no-store', 'Access-Control-Allow-Origin':'*', 'Profile-Update-Interval':'6' }) });
  }

  if (isPanelRoot && segs[1] === 'api') {
    if (!(await verifySession(request, cfg.admin))) return json({ok:false,msg:'未授权'},403);
    if (!sameOrigin(request)) return json({ok:false,msg:'Origin 校验失败'},403);
    const apiName = segs[2] || '';
    if (apiName === 'config') {
      if (request.method === 'GET') return json({ok:true,data:Object.assign(redactConfig(cfg),{version:VERSION})});
      if (request.method === 'POST') {
        if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY) return json({ok:false,msg:'请求过大'},413);
        const raw = await request.text(); if (raw.length > MAX_BODY) return json({ok:false,msg:'请求过大'},413);
        try { const incoming=JSON.parse(raw); mergeSafeConfig(cfg,incoming); if(!cfg.uuid) return json({ok:false,msg:'UUID 无效'},400); await saveConfig(env,cfg); return json({ok:true,data:Object.assign(redactConfig(cfg),{version:VERSION})}); } catch(e){ return json({ok:false,msg:e.message||'保存失败'},400); }
      }
      return text('Method Not Allowed',405);
    }
    if (apiName === 'status') return json({ok:true,data:{version:VERSION,adminSet:!!cfg.admin,kv:!!env.K,protocols:{vless:!!cfg.enableVless,trojan:!!cfg.enableTrojan,xhttp:!!cfg.enableXhttp},nodeLimit:!!cfg.nodeLimit}});
    return json({ok:false,msg:'Unknown API'},404);
  }

  if (isPanelRoot && segs.length === 1 && isBrowserUA(request.headers.get('User-Agent') || '')) {
    if (!cfg.admin) return text('安全版需要配置 ADMIN 后才能使用管理面板。',503);
    if (!(await verifySession(request,cfg.admin))) return Response.redirect(new URL('/login?next='+encodeURIComponent('/'+panelPath),request.url).href,302);
    return new Response(PANEL_HTML(panelPath), {headers:securityHeaders({'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'self'; form-action 'self'"})});
  }

  return text('Not Found',404);
}

export default {
  async fetch(request, env) {
    try { return await handleRequest(request, env); }
    catch (e) { return json({ok:false,msg:'Worker error'},500); }
  },
  async scheduled(event, env, ctx) {
    // 安全版默认不做自动外部测速；scheduled 仅预热配置，不执行任意外部写入。
    try { await loadConfig(env); } catch (_) {}
  }
};

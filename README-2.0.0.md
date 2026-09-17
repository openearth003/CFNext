# CFNext 2.0.0

本版本以用户提供的 CFNext 1.0.3 明文版为完整功能基线，采用“原代码增量加固”方式，不做功能裁剪。

## 保留的核心能力

- VLESS WS / VLESS XHTTP / Trojan WS
- 请求类型自动识别
- Clash / Sing-box / Surge / Loon / Quantumult X / v2ray 订阅
- 订阅模式：默认 / 自定义汇聚 / 随机优选
- 节点数量控制、轮询去重、地区/IP 类型/运营商筛选
- TLS / ECH / 自定义 ECH 域名与 DNS
- 内置地区中继 / 自定义 PROXYIP
- SOCKS5 / HTTP CONNECT 出站
- 在线优选：微测网、bestcf、HostMonit、自定义 URL、CF CIDR 补足
- 优选节点保存、订阅下发、定时 BESTIP_AUTO
- 原有 Clash 分流规则集与面板功能

## 2.0 安全改进

1. 管理面板默认要求 ADMIN，不再默认提供匿名管理面板。
2. 可用 `ADMIN_PATH` 将管理面板/API 与代理/订阅入口分离。
3. `ALLOW_ANONYMOUS_PANEL=1` 仅作为明确的 1.x 兼容开关，不建议公网使用。
4. 登录 Cookie 改为随机会话令牌；KV 中只保存 SHA-256 摘要和过期时间，不保存明文会话令牌。
5. 会话默认 24 小时过期，Cookie 使用 HttpOnly + Secure + SameSite=Strict。
6. 登录增加按来源地址的短周期失败次数限制。
7. 管理 API 的 POST 增加同源 Origin 校验，降低 CSRF 风险。
8. 配置、候选源请求体及外部数据源响应增加大小上限。
9. 外部数据源统一使用超时读取；优选候选增加短 TTL 缓存，降低重复请求与 CPU/子请求压力。
10. 所有代理出站路径统一检查明显的内网、链路本地、元数据和保留地址，避免通过已配置的 SOCKS5/HTTP 出站绕过 SSRF 防线。
11. 管理页面/API 增加基础安全响应头。
12. 定时优选增加同一 Worker 实例内的并发执行锁。

## 部署注意

### 推荐

至少配置：

- `U`：VLESS UUID（如果不设置会自动生成）
- `ADMIN`：管理密码
- `K`：建议绑定 KV，用于配置、轮询去重和登录会话持久化

可选：

- `D` / `PATH`：代理/订阅入口路径
- `ADMIN_PATH`：独立管理入口，例如 `cf-admin-随机字符串`
- `HOST`
- `PROXYIP`
- `S` / `OUTBOUND`
- `ECH`
- `TROJAN` / `TROJAN_PASSWORD`
- `ALPN`
- `YX` / `YXURL`
- `BESTIP_AUTO`

### 1.x 匿名面板兼容

如果升级后确实需要继续使用旧版“ADMIN 留空即可进入面板”的行为，可显式设置：

`ALLOW_ANONYMOUS_PANEL=1`

这会降低管理面板的安全性，不建议公网部署。

## 验证

该文件已经通过 Node.js 语法检查；Worker 运行时需要 Cloudflare Workers 的 `cloudflare:sockets` 环境，不能用普通 Node.js 直接启动代理服务。

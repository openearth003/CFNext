import{connect as t}from"cloudflare:sockets";const e="1.0.3",n=["173.245.48.0/20","103.21.244.0/22","103.22.200.0/22","103.31.4.0/22","141.101.64.0/18","108.162.192.0/18","190.93.240.0/20","188.114.96.0/20","197.234.240.0/22","198.41.128.0/17","162.158.0.0/15","104.16.0.0/13","104.24.0.0/14","172.64.0.0/13","131.0.72.0/22"],o=["104.16.0.0/13","104.24.0.0/14","172.64.0.0/13","162.158.0.0/15","188.114.96.0/20"],r=["2400:cb00::/32","2606:4700::/32","2803:f800::/32","2405:b500::/32","2405:8100::/32","2a06:98c0::/29","2c0f:f248::/32"];function a(t){if(!y(t=String(t||"")))return!1;if(t.indexOf(":")>=0)return r.some(e=>function(t,e){const[n,o]=e.split("/"),r=parseInt(o,10),a=t=>{const e=t.indexOf("::");let n;if(e>=0){const o=t.slice(0,e).split(":").filter(Boolean),r=t.slice(e+2).split(":").filter(Boolean),a=8-o.length-r.length;n=[...o,...Array(a).fill("0"),...r]}else n=t.split(":");return n.map(t=>t.padStart(4,"0"))},s=t=>t.map(t=>parseInt(t,16).toString(2).padStart(16,"0")).join("");return s(a(t)).slice(0,r)===s(a(n)).slice(0,r)}(t,e));const e=t.split(".").map(Number),n=(e[0]<<24|e[1]<<16|e[2]<<8|e[3])>>>0;return S.some(([t,e])=>n>=t&&n<=e)}const s={HK:"香港",TW:"台湾",MO:"澳门",JP:"日本",SG:"新加坡",US:"美国",KR:"韩国",DE:"德国",FR:"法国",GB:"英国",CA:"加拿大",AU:"澳大利亚",SE:"瑞典",NL:"荷兰",FI:"芬兰",NO:"挪威",DK:"丹麦",CH:"瑞士",IT:"意大利",ES:"西班牙",PT:"葡萄牙",IE:"爱尔兰",BE:"比利时",AT:"奥地利",PL:"波兰",CZ:"捷克",RO:"罗马尼亚",HU:"匈牙利",GR:"希腊",RU:"俄罗斯",TR:"土耳其",UA:"乌克兰",IN:"印度",TH:"泰国",MY:"马来西亚",VN:"越南",PH:"菲律宾",ID:"印尼",BR:"巴西",MX:"墨西哥",AR:"阿根廷",CL:"智利",ZA:"南非",EG:"埃及",AE:"阿联酋",IL:"以色列",NZ:"新西兰",KZ:"哈萨克斯坦",SA:"沙特"},i=["https://bestcf.pages.dev/random-region/HK/100.txt","https://bestcf.pages.dev/random-region/TW/100.txt","https://bestcf.pages.dev/random-region/JP/100.txt","https://bestcf.pages.dev/random-region/SG/100.txt","https://bestcf.pages.dev/random-region/US/100.txt","https://bestcf.pages.dev/random-region/KR/100.txt"].join("\n"),l=/random-region\/[A-Z]{2,}\/\d+\.txt/i;const c={uuid:"",path:"",admin:"",host:"",enableVless:!0,enableTrojan:!1,trojanPassword:"",enableXhttp:!1,alpn:"",ech:!1,echHost:"cloudflare-ech.com",echDns:"",tlsOnly:!1,nodeLimit:!1,nodeLimitCount:100,polling:!0,proxyIP:"",outboundProxy:"",outboundMode:"",preferredDomains:i,preferredIPs:[],optimizer:{source:"wetest_v4",sourceURL:"",port:443,threads:5,count:20,useCidr:!0,fillCount:0,subMode:"",subRandomCount:16,subIncludeDefault:!1},filter:{region:"all",ipType:["IPv4","IPv6"],isp:["移动","联通","电信"]}},d=["cloudflare.com","www.cloudflare.com","speed.cloudflare.com"],p=["104.17.127.180#优选IP-001","104.16.123.96#优选IP-002","104.16.124.96#优选IP-003","104.16.125.96#优选IP-004","104.16.126.96#优选IP-005","104.16.127.96#优选IP-006","104.16.132.229#优选IP-007","104.16.248.248#优选IP-008","104.16.249.249#优选IP-009","162.159.0.1#优选IP-010","188.114.96.1#优选IP-011","104.17.24.252#优选IP-012","188.114.99.52#优选IP-013","162.159.94.229#优选IP-014","162.159.5.175#优选IP-015","104.18.119.34#优选IP-016","104.21.213.24#优选IP-017","104.17.234.5#优选IP-018","104.16.245.187#优选IP-019","172.67.64.211#优选IP-020","172.67.64.12#优选IP-021","104.18.43.224#优选IP-022","104.18.40.93#优选IP-023","104.18.37.92#优选IP-024","104.18.47.234#优选IP-025","104.18.42.54#优选IP-026","172.64.144.49#优选IP-027","172.64.146.15#优选IP-028","104.17.185.207#优选IP-029","104.17.101.139#优选IP-030","162.159.44.215#优选IP-031","162.159.44.214#优选IP-032","104.18.217.109#优选IP-033","172.65.127.225#优选IP-034","104.18.184.243#优选IP-035","162.159.137.205#优选IP-036","172.65.64.7#优选IP-037","104.25.45.44#优选IP-038","104.19.88.253#优选IP-039","162.159.136.73#优选IP-040","104.18.185.40#优选IP-041","104.25.141.168#优选IP-042","104.25.246.123#优选IP-043","104.24.54.254#优选IP-044","104.19.123.4#优选IP-045","188.114.98.144#优选IP-046","188.114.99.18#优选IP-047","104.17.127.106#优选IP-048","162.159.4.175#优选IP-049","104.18.255.187#优选IP-050","172.65.173.221#优选IP-051","104.18.176.111#优选IP-052","104.25.122.6#优选IP-053","188.114.96.116#优选IP-054","104.25.214.211#优选IP-055","104.16.223.195#优选IP-056","104.25.101.186#优选IP-057","172.64.81.44#优选IP-058","104.25.143.238#优选IP-059","188.114.99.114#优选IP-060","104.19.169.53#优选IP-061","104.16.113.211#优选IP-062","104.27.40.81#优选IP-063","188.114.98.91#优选IP-064","162.159.236.5#优选IP-065","104.25.44.144#优选IP-066","162.159.46.167#优选IP-067","104.18.84.180#优选IP-068","104.18.196.199#优选IP-069","104.24.155.234#优选IP-070","162.159.228.244#优选IP-071","162.159.235.27#优选IP-072","104.19.214.25#优选IP-073","104.19.168.107#优选IP-074","104.24.244.237#优选IP-075","104.27.66.179#优选IP-076","104.24.2.253#优选IP-077","104.21.61.179#优选IP-078","104.21.114.216#优选IP-079","188.114.98.53#优选IP-080","172.65.145.187#优选IP-081","188.114.96.255#优选IP-082","104.25.245.147#优选IP-083","172.66.161.31#优选IP-084","104.18.133.24#优选IP-085","188.114.99.155#优选IP-086","172.64.34.109#优选IP-087","172.64.145.202#优选IP-088","104.19.78.30#优选IP-089","104.17.118.180#优选IP-090","104.17.13.179#优选IP-091","172.65.35.169#优选IP-092","104.16.0.133#优选IP-093","104.16.238.98#优选IP-094","104.18.28.140#优选IP-095","104.19.115.243#优选IP-096","104.24.58.243#优选IP-097","104.27.207.36#优选IP-098","104.21.192.230#优选IP-099","104.25.20.146#优选IP-100","104.27.113.151#优选IP-101","104.24.230.144#优选IP-102","172.65.134.100#优选IP-103","188.114.96.94#优选IP-104","104.25.197.107#优选IP-105","104.16.108.18#优选IP-106","172.64.233.36#优选IP-107","172.67.163.14#优选IP-108","104.24.230.213#优选IP-109","104.19.106.1#优选IP-110","104.27.72.4#优选IP-111","104.21.57.47#优选IP-112","172.65.162.213#优选IP-113","172.67.255.83#优选IP-114","172.67.189.246#优选IP-115","162.159.230.149#优选IP-116","162.159.197.16#优选IP-117","172.67.103.87#优选IP-118","162.159.237.243#优选IP-119","104.25.193.135#优选IP-120","104.18.141.27#优选IP-121","172.65.11.191#优选IP-122","104.24.184.158#优选IP-123","188.114.97.52#优选IP-124","104.27.4.144#优选IP-125","104.25.93.154#优选IP-126","172.66.199.166#优选IP-127","172.67.64.94#优选IP-128","104.27.94.231#优选IP-129","104.24.168.96#优选IP-130","104.18.173.224#优选IP-131","172.67.173.89#优选IP-132","104.17.107.217#优选IP-133","188.114.97.91#优选IP-134","104.17.195.184#优选IP-135","162.159.14.18#优选IP-136","172.67.229.44#优选IP-137","104.24.51.58#优选IP-138","104.19.97.238#优选IP-139","104.25.161.217#优选IP-140","104.17.146.117#优选IP-141","172.67.161.136#优选IP-142","104.17.99.0#优选IP-143","104.25.100.203#优选IP-144","104.19.23.222#优选IP-145","188.114.96.141#优选IP-146","104.19.247.23#优选IP-147","104.25.24.66#优选IP-148","104.16.123.26#优选IP-149","104.27.23.242#优选IP-150","104.25.36.200#优选IP-151","104.17.195.133#优选IP-152","104.16.68.175#优选IP-153","188.114.98.19#优选IP-154","104.16.218.231#优选IP-155","104.18.28.48#优选IP-156","162.159.143.225#优选IP-157","162.159.19.201#优选IP-158","104.25.166.112#优选IP-159","104.16.201.45#优选IP-160","104.16.91.33#优选IP-161","172.67.82.86#优选IP-162","104.16.11.246#优选IP-163","188.114.97.61#优选IP-164","104.17.240.245#优选IP-165","172.66.157.150#优选IP-166","104.17.25.173#优选IP-167","104.18.26.28#优选IP-168","104.18.123.15#优选IP-169","104.25.124.155#优选IP-170","188.114.96.64#优选IP-171","104.18.18.214#优选IP-172","104.17.46.187#优选IP-173","104.17.153.58#优选IP-174","188.114.96.89#优选IP-175","172.67.174.143#优选IP-176","104.25.251.220#优选IP-177","104.27.195.79#优选IP-178","162.159.153.10#优选IP-179","104.25.129.238#优选IP-180","172.65.3.67#优选IP-181","172.67.232.109#优选IP-182","104.18.178.193#优选IP-183","104.19.78.144#优选IP-184","104.18.63.107#优选IP-185","104.19.69.150#优选IP-186","104.25.73.92#优选IP-187","172.67.195.152#优选IP-188","172.65.184.114#优选IP-189","172.65.202.216#优选IP-190","172.65.21.190#优选IP-191","104.19.32.220#优选IP-192","104.18.211.8#优选IP-193","104.17.160.131#优选IP-194","162.159.6.39#优选IP-195","162.159.43.223#优选IP-196","104.21.224.5#优选IP-197","104.25.18.216#优选IP-198","162.159.6.246#优选IP-199","104.24.46.127#优选IP-200","104.17.87.46#优选IP-201","188.114.97.80#优选IP-202","188.114.97.108#优选IP-203","162.159.241.11#优选IP-204","188.114.97.0#优选IP-205","188.114.99.14#优选IP-206","104.19.68.127#优选IP-207","162.159.10.45#优选IP-208","104.25.181.74#优选IP-209","104.24.178.200#优选IP-210","188.114.96.164#优选IP-211","104.24.41.240#优选IP-212","104.17.97.72#优选IP-213","104.16.77.112#优选IP-214","104.19.181.118#优选IP-215","172.67.165.245#优选IP-216","104.17.169.109#优选IP-217","172.65.44.103#优选IP-218","188.114.97.63#优选IP-219","172.65.47.182#优选IP-220","104.17.245.237#优选IP-221","162.159.2.86#优选IP-222","188.114.96.151#优选IP-223","172.65.139.108#优选IP-224","172.65.118.105#优选IP-225","104.21.7.133#优选IP-226","162.159.134.174#优选IP-227","104.18.194.107#优选IP-228","188.114.97.21#优选IP-229","162.159.9.18#优选IP-230","104.18.41.168#优选IP-231","162.159.192.111#优选IP-232","162.159.240.54#优选IP-233","104.17.0.4#优选IP-234","104.25.86.143#优选IP-235","104.27.97.130#优选IP-236","172.67.127.122#优选IP-237","104.25.33.126#优选IP-238","104.25.223.90#优选IP-239","104.25.123.130#优选IP-240","172.65.167.52#优选IP-241","172.67.159.243#优选IP-242","104.25.113.22#优选IP-243","188.114.98.27#优选IP-244","162.159.198.200#优选IP-245","104.17.76.49#优选IP-246","104.21.215.255#优选IP-247","172.67.131.200#优选IP-248","162.159.135.234#优选IP-249","172.65.45.102#优选IP-250","172.66.164.60#优选IP-251","162.159.26.248#优选IP-252","162.159.90.82#优选IP-253","172.65.50.167#优选IP-254","162.159.236.19#优选IP-255","104.19.143.220#优选IP-256","104.17.151.244#优选IP-257","104.17.121.245#优选IP-258","104.18.144.168#优选IP-259","162.159.228.231#优选IP-260","104.17.100.40#优选IP-261","104.27.116.114#优选IP-262","162.159.199.220#优选IP-263","104.20.17.160#优选IP-264","104.25.62.39#优选IP-265","104.27.20.220#优选IP-266","172.65.118.85#优选IP-267","104.19.83.33#优选IP-268","188.114.96.238#优选IP-269","162.159.42.67#优选IP-270","104.27.46.114#优选IP-271","104.25.126.144#优选IP-272","104.25.173.14#优选IP-273","104.24.46.107#优选IP-274","104.25.109.0#优选IP-275","162.159.137.71#优选IP-276","104.25.238.28#优选IP-277","104.27.124.239#优选IP-278","104.24.34.149#优选IP-279","104.19.246.234#优选IP-280","162.159.10.243#优选IP-281","104.27.96.232#优选IP-282","172.65.78.200#优选IP-283","104.24.25.178#优选IP-284","104.24.84.86#优选IP-285","104.25.238.237#优选IP-286","104.16.45.249#优选IP-287","104.16.234.241#优选IP-288","104.24.18.62#优选IP-289","172.65.45.248#优选IP-290","104.25.169.144#优选IP-291","104.27.27.106#优选IP-292","162.159.43.85#优选IP-293","172.67.71.106#优选IP-294","162.159.228.164#优选IP-295","104.24.250.89#优选IP-296","104.18.185.26#优选IP-297","104.27.21.175#优选IP-298","104.24.49.39#优选IP-299","172.67.85.54#优选IP-300"],u=["cloudflare.182682.xyz","bestcf.top","cdn.2020111.xyz","cf.0sm.com","cf.090227.xyz","cfip.1323123.xyz","cloudflare-ip.mofashi.ltd","cdn.tzpro.xyz","cf.877771.xyz","xn--b6gac.eu.org","bestcf.030101.xyz","cdns.doon.eu.org","fn.130519.xyz","saas.sin.fan"].join("\n"),f=new Set([80,8080,8880,2052,2082,2086,2095]),h={wetest_v4:{label:"微测网 IPv4",url:"https://www.wetest.vip/page/cloudflare/address_v4.html"},wetest_v6:{label:"微测网 IPv6",url:"https://www.wetest.vip/page/cloudflare/address_v6.html"},bestcf:{label:"优选 IP 列表",url:"https://cf.090227.xyz/ip.164746.xyz"},hostmonit:{label:"HostMonit 优选",url:"https://stock.hostmonit.com/CloudFlareYes"},wetest_cname:{label:"微测网 优选域名",url:"https://www.wetest.vip/page/cloudflare/cname.html"}},m=new TextEncoder,g=new TextDecoder;function v(){if(crypto.randomUUID)return crypto.randomUUID();const t=crypto.getRandomValues(new Uint8Array(16));return t[6]=15&t[6]|64,t[8]=63&t[8]|128,[...t].map((t,e)=>(4===e||6===e||8===e||10===e?"-":"")+t.toString(16).padStart(2,"0")).join("")}function b(t,e=443){if(!(t=String(t||"").trim()))return{host:"",port:e};if(t.startsWith("[")){const n=t.match(/^\[([^\]]+)\](?::(\d+))?$/);return{host:n?n[1]:t.replace(/^\[|\]$/g,""),port:n&&n[2]?parseInt(n[2]):e}}const n=t.lastIndexOf(":");return n>0&&/^\d+$/.test(t.slice(n+1))?{host:t.slice(0,n),port:parseInt(t.slice(n+1))}:{host:t,port:e}}function y(t){if(!(t=String(t||"").trim()))return!1;const e=t.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);if(e)return e.slice(1).every(t=>Number(t)<=255);if(!/^[0-9a-fA-F:]+$/.test(t))return!1;if((t.match(/::/g)||[]).length>1)return!1;const n=t.includes("::"),o=t.replace(/::/g,":").split(":").filter(Boolean);return!(!n&&8!==o.length)&&((!n||!(o.length<1||o.length>7))&&o.every(t=>/^[0-9a-fA-F]{1,4}$/.test(t)))}const I=new Set(["localhost","localhost.localdomain","metadata.google.internal","metadata","instance-data","169.254.169.254","100.100.100.200"]);function P(t){if(!(t=String(t||"").toLowerCase().trim().replace(/^\[|\]$/g,"")))return!0;if(I.has(t))return!0;if(t.endsWith(".local")||t.endsWith(".internal")||t.endsWith(".localhost"))return!0;const e=t.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);if(e){const[t,n,o]=e.slice(1).map(Number);if(0===t||10===t||127===t)return!0;if(169===t&&254===n)return!0;if(100===t&&n>=64&&n<=127)return!0;if(172===t&&n>=16&&n<=31)return!0;if(192===t&&168===n)return!0;if(192===t&&0===n&&0===o)return!0;if(192===t&&0===n&&2===o)return!0;if(t>=224)return!0;if(198===t&&(18===n||19===n))return!0}if(t.includes(":")){if("::1"===t||t.startsWith("fe80:")||t.startsWith("fc")||t.startsWith("fd"))return!0;if(t.startsWith("::ffff:127.")||t.startsWith("::ffff:10.")||t.startsWith("::ffff:169.254."))return!0}return!1}function x(t){try{const e=new URL(String(t||""));return("http:"===e.protocol||"https:"===e.protocol)&&!P(e.hostname)}catch(t){return!1}}function w(t){const e=[];for(let n=0;n<16;n+=2)e.push((t[n]<<8|t[n+1]).toString(16));let n=-1,o=0,r=-1,a=0;for(let t=0;t<8;t++)"0"===e[t]?(r<0?(r=t,a=1):a++,a>o&&(o=a,n=r)):(r=-1,a=0);if(o>=2){const t=e.slice(0,n).join(":");return(t?t+"::":"::")+e.slice(n+o).join(":")}return e.join(":")}function k(t){const[e,n]=t.split("/"),o=e.split(".").map(Number),r=(o[0]<<24|o[1]<<16|o[2]<<8|o[3])>>>0,a=n>=32?0:4294967295<<32-n>>>0;return[(r&a)>>>0,(r|~a>>>0)>>>0]}const S=n.map(k),C=(o.map(k),new Map);function $(t){const[e,n]=function(t){let e=C.get(t);return e||(e=k(t),C.set(t,e)),e}(t),o=e+Math.floor(Math.random()*(n-e>>>0));return`${o>>>24&255}.${o>>>16&255}.${o>>>8&255}.${255&o}`}function T(t,e){const n=new Set,o=[];let r=0;for(;o.length<e&&r++<20*e;){const e=$(t[Math.floor(Math.random()*t.length)]);n.has(e)||(n.add(e),o.push(e))}return o}function E(t){const e=[],n=new Set;return String(t||"").split(/[\n,;]+/).map(t=>t.trim()).filter(Boolean).forEach(t=>{let o="";if(t.includes("#")){const[e,n]=t.split("#");t=e,o=n}const{host:r,port:a}=b(t,443);r&&y(r)&&!n.has(r)&&(n.add(r),e.push({ip:r,port:a,name:o}))}),e}function A(t,e){return new Response(JSON.stringify(t),{status:e||200,headers:{"Content-Type":"application/json; charset=utf-8"}})}async function U(t){const e=JSON.parse(JSON.stringify(c));if(t.U&&(e.uuid=String(t.U).toLowerCase()),(t.D||t.PATH)&&(e.path=String(t.D||t.PATH)),(t.ADMIN||t.admin)&&(e.admin=String(t.ADMIN||t.admin)),t.HOST&&(e.host=String(t.HOST).replace(/^https?:\/\//,"").split("/")[0]),t.PROXYIP&&(e.proxyIP=String(t.PROXYIP)),(t.S||t.OUTBOUND)&&(e.outboundProxy=String(t.S||t.OUTBOUND)),"true"!==t.ECH&&"1"!==t.ECH||(e.ech=!0),"true"!==t.TROJAN&&"1"!==t.TROJAN||(e.enableTrojan=!0),t.TROJAN_PASSWORD&&(e.trojanPassword=String(t.TROJAN_PASSWORD)),t.ALPN&&(e.alpn=String(t.ALPN)),t.YX&&(e.preferredIPs=E(t.YX)),t.YXURL&&(e.optimizer.sourceURL=String(t.YXURL)),t.K&&"function"==typeof t.K.get)try{const n=await t.K.get("config");if(n){const t=JSON.parse(n);Object.assign(e,t),t.optimizer&&(e.optimizer=Object.assign(JSON.parse(JSON.stringify(c.optimizer)),t.optimizer)),t.preferredIPs&&Array.isArray(t.preferredIPs)&&(e.preferredIPs=t.preferredIPs),t.admin&&(e.admin=String(t.admin)),t.uuid&&(e.uuid=String(t.uuid).toLowerCase())}}catch(t){}var n;return delete e.fragment,delete e.fragmentParam,e.uuid=String(e.uuid||"").toLowerCase(),n=e.uuid,/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(n||"")||(e.uuid=v()),e.path||(e.path=e.uuid),Array.isArray(e.preferredIPs)||(e.preferredIPs=E(e.preferredIPs)),Object.defineProperty(e,"__env",{value:t,enumerable:!1,writable:!0}),e}async function L(t,e){if(!t.K||"function"!=typeof t.K.put)return!1;const n=JSON.parse(JSON.stringify(e));return n.admin&&(n.admin=String(n.admin)),await t.K.put("config",JSON.stringify(n)),!0}function R(t){const e=JSON.parse(JSON.stringify(t));return e.admin=t.admin?"***":"",e.hasAdmin=!!t.admin,e.trojanPassword=t.trojanPassword?"***":"",e.outboundProxy&&(e.outboundProxy=String(e.outboundProxy).replace(/\/\/([^@\/]+)@/,"//***@")),e}function O(t){if(!t||t.byteLength<1)throw new Error("VLESS 头部过短");const e=new DataView(t.buffer,t.byteOffset,t.byteLength);let n=0;if(0!==e.getUint8(0))throw new Error("不支持的 VLESS 版本");if(n+=17,n>=t.byteLength)throw new Error("VLESS 头部过短");const o=e.getUint8(n);if(n+=1,n+=o,n+3>t.byteLength)throw new Error("VLESS 头部过短");const r=e.getUint8(n);n+=1;const a=e.getUint16(n);n+=2;const s=e.getUint8(n);n+=1;const{addr:i,len:l}=function(t,e,n,o){if(1===o)return{addr:`${e.getUint8(n)}.${e.getUint8(n+1)}.${e.getUint8(n+2)}.${e.getUint8(n+3)}`,len:4};if(2===o){const o=e.getUint8(n),r=t.subarray(n+1,n+1+o);return{addr:g.decode(r),len:1+o}}if(3===o)return{addr:w(t.subarray(n,n+16)),len:16};throw new Error("无法识别的地址类型")}(t,e,n,s);return n+=l,{command:r,port:a,addr:i,headerLength:n,earlyData:t.subarray(n)}}const M=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];let j="",D="";function z(t){return t!==j&&(j=t,D=function(t){const e=m.encode(String(t)),n=8*e.length,o=1+(e.length+8>>6)<<6,r=new Uint8Array(o);r.set(e),r[e.length]=128;const a=new DataView(r.buffer);a.setUint32(o-8,Math.floor(n/4294967296),!1),a.setUint32(o-4,n>>>0,!1);let s=3238371032,i=914150663,l=812702999,c=4144912697,d=4290775857,p=1750603025,u=1694076839,f=3204075428;const h=(t,e)=>t>>>e|t<<32-e;for(let t=0;t<o;t+=64){const e=new Uint32Array(64);for(let n=0;n<16;n++)e[n]=a.getUint32(t+4*n,!1);for(let t=16;t<64;t++){const n=h(e[t-15],7)^h(e[t-15],18)^e[t-15]>>>3,o=h(e[t-2],17)^h(e[t-2],19)^e[t-2]>>>10;e[t]=e[t-16]+n+e[t-7]+o>>>0}let n=s,o=i,r=l,m=c,g=d,v=p,b=u,y=f;for(let t=0;t<64;t++){const a=y+(h(g,6)^h(g,11)^h(g,25))+(g&v^~g&b)+M[t]+e[t]>>>0,s=n&o^n&r^o&r;y=b,b=v,v=g,g=m+a>>>0,m=r,r=o,o=n,n=a+((h(n,2)^h(n,13)^h(n,22))+s>>>0)>>>0}s=s+n>>>0,i=i+o>>>0,l=l+r>>>0,c=c+m>>>0,d=d+g>>>0,p=p+v>>>0,u=u+b>>>0,f=f+y>>>0}let g="";for(const t of[s,i,l,c,d,p,u])g+=(t>>>24&255).toString(16).padStart(2,"0"),g+=(t>>>16&255).toString(16).padStart(2,"0"),g+=(t>>>8&255).toString(16).padStart(2,"0"),g+=(255&t).toString(16).padStart(2,"0");return g}(t)),D}async function H(e,n){if(P(e.hostname))throw new Error("目标地址被拒绝（内网/保留地址）: "+e.hostname);const o=t({hostname:e.hostname,port:e.port});let r=null;const a=new Promise((t,a)=>{r=setTimeout(()=>{try{o.close()}catch(t){}a(new Error("连接超时 "+e.hostname+":"+e.port))},n>0?n:8e3)});try{return await Promise.race([o.opened,a]),clearTimeout(r),o}catch(t){clearTimeout(r);try{o.close()}catch(t){}throw t}}async function N(e,n){if(P(e.host))throw new Error("出站代理地址被拒绝: "+e.host);const o=t({hostname:e.host,port:e.port});await o.opened;const r=o.writable.getWriter(),a=o.readable.getReader();let s="";e.user&&(s="Proxy-Authorization: Basic "+function(t){let e="";for(let n=0;n<t.length;n+=32768)e+=String.fromCharCode(...t.subarray(n,n+32768));return btoa(e)}(m.encode(`${e.user}:${e.pass}`))+"\r\n");const i=`CONNECT ${n.hostname}:${n.port} HTTP/1.1\r\nHost: ${n.hostname}:${n.port}\r\n${s}\r\n`;await r.write(m.encode(i));const l=await async function(t){let e=new Uint8Array(0);for(;e.length<65536;){const{done:n,value:o}=await t.read();if(n)break;e=_(e,o);const r=F(e,[13,10,13,10]);if(r>=0)return g.decode(e.subarray(0,r))}return g.decode(e)}(a);if(!/^HTTP\/\d\.\d\s+2\d\d/i.test(l))throw new Error("HTTP 代理 CONNECT 失败: "+l.split("\r\n")[0]);return r.releaseLock(),a.releaseLock(),o}function _(t,e){const n=new Uint8Array(t.length+e.length);return n.set(t,0),n.set(e,t.length),n}function F(t,e){t:for(let n=0;n<=t.length-e.length;n++){for(let o=0;o<e.length;o++)if(t[n+o]!==e[o])continue t;return n}return-1}const W={HK:"proxyip.hk.cmliussss.net",US:"proxyip.us.cmliussss.net",SG:"proxyip.sg.cmliussss.net",JP:"proxyip.jp.cmliussss.net",KR:"proxyip.kr.cmliussss.net",DE:"proxyip.de.cmliussss.net",SE:"proxyip.se.cmliussss.net",NL:"proxyip.nl.cmliussss.net",FI:"proxyip.fi.cmliussss.net",GB:"proxyip.gb.cmliussss.net",Oracle:"proxyip.oracle.cmliussss.net",DigitalOcean:"proxyip.digitalocean.cmliussss.net",Vultr:"proxyip.vultr.cmliussss.net",Multacom:"proxyip.multacom.cmliussss.net"};const K=new Map;async function G(t,e){if(e=e||443,y(t))return[{hostname:t,port:e}];const n=t+":"+e,o=Date.now(),r=K.get(n);if(r&&o-r.t<3e5)return r.ips;const a=["https://cloudflare-dns.com/dns-query","https://dns.alidns.com/resolve","https://doh.pub/dns-query"],s=async(e,n)=>{const o=a.map(async o=>{const r=await tt(o+"?name="+encodeURIComponent(t)+"&type="+e,{headers:{accept:"application/dns-json"}},4e3);if(!r||!r.ok)throw new Error("doh fail");return((await r.json()).Answer||[]).filter(t=>t.type===n).map(t=>t.data)});try{return await Promise.any(o)}catch(t){return[]}},[i,l]=await Promise.all([s("TXT",16),s("A",1)]);let c=[];for(const t of i){const n=String(t).replace(/^"|"$/g,"").replace(/\\010/g,",").replace(/\n/g,",").trim();if(!n)continue;if("@edtunnel"===n){c=l.filter(t=>/^\d+\.\d+\.\d+\.\d+$/.test(t)).map(t=>({hostname:t,port:e}));break}const o=n.split(/[,;\s]+/).map(t=>t.trim()).filter(Boolean),r=[];for(const t of o){const{host:n,port:o}=b(t,e);y(n)&&r.push({hostname:n,port:o})}if(r.length){c=r;break}}if(c.length||(c=l.filter(t=>/^\d+\.\d+\.\d+\.\d+$/.test(t)).map(t=>({hostname:t,port:e}))),!c.length){c=(await s("AAAA",28)).filter(t=>y(t)).map(t=>({hostname:t,port:e}))}const d=new Set,p=c.filter(t=>{const e=t.hostname+":"+t.port;return!d.has(e)&&(d.add(e),!0)});return p.length&&K.set(n,{t:o,ips:p}),p}async function X(e,n,o,r){const a=function(t){if(!t)return null;let e="socks5",n=String(t).trim();const o=n.match(/^(socks5|http|https):\/\/(.+)$/i);o&&(e=o[1].toLowerCase(),n=o[2]);let r="",a="";if(n.includes("@")){const[t,e]=n.split("@"),o=t.indexOf(":");o>=0?(r=t.slice(0,o),a=t.slice(o+1)):r=t,n=e}const s="http"===e?80:"https"===e?443:1080,{host:i,port:l}=b(n,s);return{type:e,host:i,port:l,user:r,pass:a}}(n.outboundProxy),s=n.outboundMode||"",i=a?"http"===a.type||"https"===a.type?t=>N(a,t):e=>async function(e,n){if(P(e.host))throw new Error("出站代理地址被拒绝: "+e.host);const o=t({hostname:e.host,port:e.port});await o.opened;const r=o.writable.getWriter(),a=o.readable.getReader();let s=new Uint8Array(0);const i=async t=>{for(;s.length<t;){const{done:t,value:e}=await a.read();if(t)throw new Error("连接被关闭");s=_(s,e)}const e=s.slice(0,t);return s=s.subarray(t),e},l=e.user?[5,2,0,2]:[5,1,0];await r.write(new Uint8Array(l));const c=await i(2);if(5!==c[0]||255===c[1])throw new Error("SOCKS5 握手失败");if(2===c[1]){if(!e.user)throw new Error("SOCKS5 服务器要求认证但未提供凭据");const t=m.encode(e.user),n=m.encode(e.pass),o=new Uint8Array([1,t.length,...t,n.length,...n]);if(await r.write(o),0!==(await i(2))[1])throw new Error("SOCKS5 认证失败")}else if(0!==c[1])throw new Error("SOCKS5 不支持的认证方法 "+c[1]);const d=m.encode(n.hostname);let p;p=/^\d+\.\d+\.\d+\.\d+$/.test(n.hostname)?new Uint8Array([5,1,0,1,...n.hostname.split(".").map(Number),n.port>>8&255,255&n.port]):new Uint8Array([5,1,0,3,d.length,...d,n.port>>8&255,255&n.port]),await r.write(p);const u=await i(4);if(0!==u[1])throw new Error("SOCKS5 连接失败 码"+u[1]);if(1===u[3])await i(6);else if(3===u[3]){const t=(await i(1))[0];await i(t+2)}else 4===u[3]&&await i(18);return r.releaseLock(),a.releaseLock(),o}(a,e):null;let l;const c=async(t,e)=>{for(const n of((t,e)=>{const n=[];return"only"===s?n.push(i?()=>i(t):()=>H(t,e)):"no"===s?(n.push(()=>H(t,e)),i&&n.push(()=>i(t))):(i&&n.push(()=>i(t)),n.push(()=>H(t,e))),n})(t,e))try{return await n()}catch(t){l=t}return null},d=await c({hostname:e.addr,port:e.port},6e3);if(d)return d;const p=n.proxyIP?b(n.proxyIP,443):null;if(p&&p.host){let t=await G(p.host,p.port);t.length||(t=[{hostname:p.host,port:p.port}]);for(const e of t){const t=await c(e,6e3);if(t)return t}}if(r){const t=function(t){const e=(t||"").toUpperCase();return e.startsWith("HKG")||e.startsWith("HK")?"HK":e.startsWith("SIN")||e.startsWith("SG")?"SG":e.startsWith("NRT")||e.startsWith("KIX")||e.startsWith("TYO")||e.startsWith("OSA")||e.startsWith("JP")?"JP":e.startsWith("ICN")||e.startsWith("SEL")||e.startsWith("KR")?"KR":/^(HKG|SIN|NRT|KIX|ICN|TYO|OSA|SEL|HK|SG|JP|KR|SJC)/.test(e)?"HK":e.startsWith("FRA")||e.startsWith("BER")||e.startsWith("MUC")||e.startsWith("DUS")||e.startsWith("HAM")||e.startsWith("STR")||e.startsWith("DE")?"DE":e.startsWith("ARN")||e.startsWith("SE")?"SE":e.startsWith("AMS")||e.startsWith("NL")?"NL":e.startsWith("HEL")||e.startsWith("FI")?"FI":e.startsWith("LHR")||e.startsWith("MAN")||e.startsWith("GB")||e.startsWith("UK")?"GB":/^(FRA|ARN|AMS|HEL|LHR|MAN|CDG|MAD|VIE|ZRH|MXP|PRG|WAW|BER|MUC|DUS|HAM|STR|DE|SE|NL|FI|GB|UK|FR|ES|AT|CH|IT|CZ|PL)/.test(e)?"DE":"US"}(o),e=[t,...Object.keys(W).filter(e=>e!==t)].slice(0,3);for(const t of e){const e=W[t];if(!e)continue;let n=[];try{n=await G(e,443)}catch(t){}if(n.length)for(const t of n){const e=await c(t,5e3);if(e)return e}}}throw l||new Error("所有出站方式均失败")}async function B(t,e){const n=new WebSocketPair,[o,r]=Object.values(n);try{r.accept({allowHalfOpen:!0})}catch(t){r.accept()}r.binaryType="arraybuffer";let a=null,s=null,i=!1,l=null;const c=t=>{try{r.send(t)}catch(t){}};r.addEventListener("message",async n=>{try{const o="string"==typeof n.data?m.encode(n.data):new Uint8Array(n.data);if(i)s?await s.write(o):l=l?_(l,o):o;else{let n,d;l=l?_(l,o):o;try{let t=!1;if(e.enableTrojan){const n=e.trojanPassword||e.uuid;t=l.byteLength>=58&&g.decode(l.subarray(0,56)).toLowerCase()===z(n)}d=!t,n=t?function(t){if(!t||t.byteLength<66)throw new Error("Trojan 头部过短");const e=new DataView(t.buffer,t.byteOffset,t.byteLength);let n=58;const o=e.getUint8(n);n+=1;const r=e.getUint8(n);let a,s;if(n+=1,1===r)a=`${e.getUint8(n)}.${e.getUint8(n+1)}.${e.getUint8(n+2)}.${e.getUint8(n+3)}`,s=4;else if(3===r){const o=e.getUint8(n);a=g.decode(t.subarray(n+1,n+1+o)),s=1+o}else{if(4!==r)throw new Error("无法识别的地址类型");a=w(t.subarray(n,n+16)),s=16}n+=s;const i=e.getUint16(n);return n+=2,n+=2,{command:o,port:i,addr:a,password:g.decode(t.subarray(0,56)),headerLength:n}}(l):O(l)}catch(t){if(/头部过短/.test(t.message||""))return;throw t}i=!0;const p=await X(n,e,t.cf&&t.cf.colo,d);a=p,s=p.writable.getWriter(),d&&c(new Uint8Array([0,0])),l&&l.byteLength>n.headerLength&&await s.write(l.subarray(n.headerLength)),l=null,async function(t,e,n){try{for(;;){const{done:n,value:o}=await t.read();if(n)break;e(o)}}catch(t){}try{n&&n()}catch(t){}}(p.readable.getReader(),c,()=>{try{r.close(1e3)}catch(t){}})}}catch(t){try{r.close(1011,String(t&&t.message||t))}catch(t){}}});const d=()=>{if(a){try{a.close()}catch(t){}a=null}};return r.addEventListener("close",d),r.addEventListener("error",d),new Response(null,{status:101,webSocket:o})}function J(t){const e=new Set,n=[],o=(t,o,r)=>{y(t)&&(e.has(t)||(e.add(t),n.push({ip:t,port:o||443,name:r||""})))};E(t).forEach(t=>o(t.ip,t.port,t.name));const r=/\b(?:\d{1,3}\.){3}\d{1,3}(?::\d{1,5})?\b/g;let a;for(;a=r.exec(t);){const{host:t,port:e}=b(a[0],443);t&&o(t,e,"")}const s=/[0-9a-fA-F:]+/g;for(;a=s.exec(t);){const t=a[0];t.includes(":")&&t.split(":").length>=3&&y(t)&&o(t,443,"")}return n}async function q(t){const e=[],o={preset:0,presetErr:"",custom:0,customErr:"",cidr:0},r=n=>{n&&n.ip&&a(n.ip)&&e.push({ip:n.ip,port:t.port||n.port||443,name:n.name||""})};if((t=t||{}).source&&h[t.source]){const e=await tt(h[t.source].url,{headers:{"User-Agent":"Mozilla/5.0"}},6e3);if(e&&e.ok){const t=J(await e.text());t.forEach(r),o.preset=t.length}else o.presetErr=e?"HTTP "+e.status:"超时/网络错误"}if(t.sourceURL)if(x(t.sourceURL)){const e=await tt(t.sourceURL,{headers:{"User-Agent":"Mozilla/5.0"}},6e3);if(e&&e.ok){const t=J(await e.text());t.forEach(r),o.custom=t.length}else o.customErr=e?"HTTP "+e.status:"超时/网络错误"}else o.customErr="自定义源地址被拒绝（非 http/https 或内网地址）";const s=new Set,i=[];for(const t of e)s.has(t.ip)||(s.add(t.ip),i.push(t));if(!1!==t.useCidr&&i.length<(t.count||20)){const e=(t.count||20)-i.length,r=T(n,3*e);let a=0;for(const n of r){if(a>=e)break;s.has(n)||(s.add(n),i.push({ip:n,port:t.port||443,name:""}),a++)}o.cidr=a}return{candidates:i,stats:o}}function V(e,n,o){return new Promise(r=>{const a=Date.now();let s,i=!1;const l=(t,o)=>{if(!i){i=!0,clearTimeout(c);try{s&&s.close()}catch(t){}r({ip:e,port:n,ok:t,latency:o})}},c=setTimeout(()=>l(!1,-1),o);try{s=t({hostname:e,port:n})}catch(t){return l(!1,-1)}s.opened.then(()=>l(!0,Date.now()-a)).catch(()=>l(!1,-1))})}function Y(t,e,n,o,r={}){const a=t.host,s=e.includes(":")&&!e.startsWith("[")?`[${e}]`:e,i=!f.has(Number(n)),l=encodeURIComponent;let c="encryption=none";return c+=i?"&security=tls&sni="+l(a)+"&fp=chrome":"&security=none",c+="&host="+l(a),"xhttp"===r.type?(c+="&type=xhttp&mode=stream-one",c+="&extra="+l(JSON.stringify(function(t){const e=t.uuid||"";return{xPaddingObfsMode:!0,xPaddingMethod:"tokenish",xPaddingPlacement:"queryInHeader",xPaddingHeader:e.slice(1,7),xPaddingKey:"_"+e.slice(25,31)}}(t)))):c+="&type=ws",c+="&path="+l("/"+t.path),t.alpn&&(c+="&alpn="+l(t.alpn)),t.ech&&(c+="&ech="+l((t.echHost||"cloudflare-ech.com")+"+"+(t.echDns||"https://223.5.5.5/dns-query"))),`vless://${t.uuid}@${s}:${n}?${c}#${encodeURIComponent(o)}`}function Z(t,e,n,o){const r=t.host,a=e.includes(":")&&!e.startsWith("[")?`[${e}]`:e,s=encodeURIComponent;let i="security=tls&sni="+s(r)+"&fp=chrome&host="+s(r)+"&type=ws&path="+s("/"+t.path);return t.alpn&&(i+="&alpn="+s(t.alpn)),t.ech&&(i+="&ech="+s((t.echHost||"cloudflare-ech.com")+"+"+(t.echDns||"https://223.5.5.5/dns-query"))),`trojan://${t.trojanPassword||t.uuid}@${a}:${n}?${i}#${encodeURIComponent(o)}`}const Q=new Map;function tt(t,e,n){return new Promise(o=>{const r=new AbortController,a=setTimeout(()=>r.abort(),n);fetch(t,Object.assign({},e,{signal:r.signal})).then(t=>{clearTimeout(a),o(t)}).catch(()=>{clearTimeout(a),o(null)})})}async function et(t,e=100,n=300,r=!1,i=!0,c=!1){const d=String(t||"").split(/[\n,;]+/).map(t=>t.trim().replace(/^\*\./,"")).filter(Boolean),p=Date.now(),u=["https://cloudflare-dns.com/dns-query","https://dns.alidns.com/resolve"],f=async(t,e,n)=>{const o=u.map(async o=>{const r=await tt(o+"?name="+encodeURIComponent(t)+"&type="+e,{headers:{accept:"application/dns-json"}},4e3);if(!r||!r.ok)throw new Error("doh unavailable");const a=((await r.json()).Answer||[]).filter(t=>t.type===n&&("A"===e?/^\d+\.\d+\.\d+\.\d+$/.test(t.data):/^[0-9a-fA-F:]+$/.test(t.data))).map(t=>t.data);if(!a.length)throw new Error("no answer");return a});try{return await Promise.any(o)}catch(t){return[]}},h=await Promise.all(d.map(async t=>{if(t.includes("://")){const c="url:"+t+(r?"|rf":"")+(i?"":"|raw"),d=Q.get(c);if(d&&p-d.t<6e5)return d.ips.slice(0,e);try{if(!x(t))throw new Error("目标地址被拒绝（SSRF）");const d=await tt(t,{},6e3);if(!d||!d.ok)throw new Error("unreachable");const u=await d.text(),f=new Set,h={},m=[],g=(n=t,l.test(String(n||"")));for(const t of u.split(/\r?\n/)){if(m.length>=e)break;const n=t.match(/(\d{1,3}(?:\.\d{1,3}){3})(?::(\d{1,5}))?(?:#([^\r\n]*))?/);if(!n)continue;const o=n[1],r=n[2]?parseInt(n[2]):443,l=o+":"+r;if(f.has(l))continue;if(i&&!a(o)&&!g)continue;f.add(l);const c=(n[3]||"").trim();if(c&&!/[\u4e00-\u9fa5]/.test(c)&&!c.includes("|")){m.push({ip:o,port:r,name:c,...g?{relay:!0}:{}});continue}let d="";if(n[3]){const t=n[3].match(/^\s*[\u4e00-\u9fa5]{2,5}\s+[A-Z]{2}/);if(t){const e=t[0].match(/[\u4e00-\u9fa5]{2,5}/);e&&(d=e[0])}else{const t=n[3].split("|").map(t=>t.trim()),e=t.find(t=>/^[\u4e00-\u9fa5]{2,5}\s+[A-Z]{2}$/.test(t));if(e){const t=e.match(/[\u4e00-\u9fa5]{2,5}/);t&&(d=t[0])}else{const e=t.find(t=>/^[\u4e00-\u9fa5]{2,5}$/.test(t)&&!/^(地区随机|随机优选|官方优选|优选|CF优选)$/.test(t));if(e)d=e;else{const t=n[3].match(/\b([A-Z]{2})\b/);t&&(d=s[t[1]]||t[1])}}}}d?(h[d]=(h[d]||0)+1,m.push({ip:o,port:r,name:d+"-"+String(h[d]).padStart(2,"0"),...g?{relay:!0}:{}})):m.push({ip:o,port:r,name:"",...g?{relay:!0}:{}})}if(!m.length&&r){const n=(String(t).match(/\/([A-Z]{2})\//)||[])[1]||String(t).replace(/^https?:\/\//,"").split(".")[0];if(s[n]){T(o,e).forEach((t,e)=>m.push({ip:t,port:443,name:s[n]+"-"+String(e+1).padStart(2,"0")}))}}return Q.set(c,{t:p,ips:m}),m.slice()}catch(t){const n=Q.get(c);return n&&n.ips&&n.ips.length?n.ips.slice(0,e):[]}}var n;if(!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(t))return[];const d=Q.get(t);if(d&&p-d.t<6e5)return d.ips.slice(0,e).map((e,n)=>({ip:e,port:443,name:t+"-"+(n+1)}));const u=await f(t,"A",1);let h=u.filter(a);if(c){const e=await f(t,"AAAA",28);h=[...new Set(u.concat(e))].filter(a)}return h=h.slice(0,e),h.length?(Q.set(t,{t:p,ips:h}),h.map((e,n)=>({ip:e,port:443,name:t+"-"+(n+1)}))):d&&d.ips&&d.ips.length?d.ips.slice(0,e).map((e,n)=>({ip:e,port:443,name:t+"-"+(n+1)})):[]})),m=[];let g=0;for(;g<n;){let t=!1;for(const e of h){if(g>=n)break;e.length&&(m.push(e.shift()),g++,t=!0)}if(!t)break}return m}function nt(t){const e=t.indexOf("@"),n=t.indexOf("?",e),o=n>e&&e>=0?t.slice(e+1,n):t.slice(e+1);if(o.startsWith("[")){const t=o.indexOf("]"),e=t>0?o.slice(1,t):o,n=o.slice(t+1),r=n.startsWith(":")?parseInt(n.slice(1)):443;return{host:e,port:isNaN(r)?443:r}}const r=o.lastIndexOf(":");if(r>0){const t=parseInt(o.slice(r+1));return{host:o.slice(0,r),port:isNaN(t)?443:t}}return{host:o,port:443}}function ot(t,e){const n=t.indexOf("?");if(n<0)return null;const o=t.indexOf("#",n),r=o>n?t.slice(n+1,o):t.slice(n+1);for(const t of r.split("&")){const n=t.indexOf("=");if((n>0?t.slice(0,n):t)===e)return n>0?decodeURIComponent(t.slice(n+1)):""}return null}function rt(t,e){const{host:n,port:o}=nt(t),r=t.indexOf("#");let a=`节点${e+1}`;if(r>=0)try{a=decodeURIComponent(t.slice(r+1))||a}catch(t){}const s=t.indexOf("@");let i="";if(s>=0){const e=t.indexOf("://"),n=e>=0?e+3:0;try{i=decodeURIComponent(t.slice(n,s))}catch(e){i=t.slice(n,s)}}const l=t.startsWith("trojan://");return{srv:n,prt:o,name:a,user:i,isTrojan:l,tls:l||"tls"===(ot(t,"security")||"tls")}}const at={HK:["HK","香港"],TW:["TW","台湾"],US:["US","美国"],SG:["SG","新加坡"],JP:["JP","日本"],KR:["KR","韩国"],DE:["DE","德国"]},st={"移动":["移动","CM","CHINAMOBILE"],"联通":["联通","CU","UNICOM"],"电信":["电信","CT","CHINATELECOM"]},it=["移动","联通","电信"],lt=["IPv4","IPv6"];function ct(t){if("boolean"==typeof t||"number"==typeof t)return String(t);const e=String(t);return/^[\w.\-/\u4e00-\u9fa5]+$/.test(e)?e:JSON.stringify(e)}function dt(t,e){const n=t.host,o="/"+t.path,r=new Set,a=e.map(e=>{const{user:a,srv:s,prt:i,name:l,isTrojan:c,tls:d}=rt(e,0);let p=l;const u=ot(e,"type")||"ws";if(r.has(p)){const t=c?"T":"xhttp"===u?"X":"W";let e=p+"·"+t,n=2;for(;r.has(e);)e=p+"·"+t+n,n++;p=e}r.add(p);const f={name:p,server:s,port:i,udp:!0,...d?{tls:!0,"skip-cert-verify":!1,servername:n,"client-fingerprint":"chrome"}:{},...t.ech&&d?{"tls-opts":{ech:{enable:!0}}}:{}};if(c)return{...f,type:"trojan",password:a,network:"ws","ws-opts":{path:o,headers:{Host:n}}};if("xhttp"===u){let t={};try{t=JSON.parse(ot(e,"extra")||"{}")}catch(t){}return{...f,type:"vless",uuid:a,network:"xhttp","xhttp-opts":{path:o,mode:"stream-one",headers:{Host:n},"x-padding-obfs-mode":void 0===t.xPaddingObfsMode||t.xPaddingObfsMode,"x-padding-method":t.xPaddingMethod||"tokenish","x-padding-placement":t.xPaddingPlacement||"queryInHeader","x-padding-header":t.xPaddingHeader||"","x-padding-key":t.xPaddingKey||""}}}return{...f,type:"vless",uuid:a,network:"ws","ws-opts":{path:o,headers:{Host:n}}}});a.sort((t,e)=>(443===t.port?0:1)-(443===e.port?0:1));return`# CFNext 订阅\ntest-url: 'http://www.gstatic.com/generate_204'\nproxies:\n${a.map(t=>function(t){const e=[];if(e.push("  - name: "+ct(t.name)),e.push("    type: "+t.type),e.push("    server: "+ct(t.server)),e.push("    port: "+t.port),"vless"===t.type?e.push("    uuid: "+ct(t.uuid)):e.push("    password: "+ct(t.password)),e.push("    network: "+t.network),e.push("    udp: true"),t.tls&&(e.push("    tls: true"),e.push("    skip-cert-verify: false"),e.push("    servername: "+ct(t.servername)),e.push("    client-fingerprint: chrome"),t["tls-opts"]&&(e.push("    tls-opts:"),e.push("      ech:"),e.push("        enable: true"))),"ws"===t.network)e.push("    ws-opts:"),e.push("      path: "+ct(t["ws-opts"].path)),e.push("      headers:"),e.push("        Host: "+ct(t["ws-opts"].headers.Host));else if("xhttp"===t.network){const n=t["xhttp-opts"];e.push("    xhttp-opts:"),e.push("      path: "+ct(n.path)),e.push("      mode: "+ct(n.mode)),e.push("      headers:"),e.push("        Host: "+ct(n.headers.Host)),e.push("      x-padding-obfs-mode: "+ct(n["x-padding-obfs-mode"])),e.push("      x-padding-method: "+ct(n["x-padding-method"])),e.push("      x-padding-placement: "+ct(n["x-padding-placement"])),e.push("      x-padding-header: "+ct(n["x-padding-header"])),e.push("      x-padding-key: "+ct(n["x-padding-key"]))}return e.join("\n")}(t)).join("\n")}\npr: &pr {type: select, proxies: [♻️ 自动选择, 🚀 默认代理, 🌐 全部节点, ♻️ 香港自动, ♻️ 日本自动, ♻️ 美国自动, 🔯 香港故转, 🔯 日本故转, 🇭🇰 香港节点, 🇯🇵 日本节点, 🇺🇲 美国节点, DIRECT]}\nproxy-groups:\n  - {name: 🌐 全部节点, type: select, include-all: true, filter: "^((?!(DIRECT|REJECT)).)*$"}\n  - {name: ♻️ 自动选择, type: url-test, url: 'http://www.gstatic.com/generate_204', include-all: true, tolerance: 20, interval: 300, filter: "^((?!(DIRECT|REJECT)).)*$"}\n  - {name: ♻️ 香港自动, type: url-test, url: 'http://www.gstatic.com/generate_204', include-all: true, tolerance: 20, interval: 300, filter: "(?=.*(港|HK|(?i)Hong))^((?!(台|日|韩|新|深|美)).)*$"}\n  - {name: ♻️ 日本自动, type: url-test, url: 'http://www.gstatic.com/generate_204', include-all: true, tolerance: 20, interval: 300, filter: "(?=.*(日|JP|(?i)Japan))^((?!(港|台|韩|新|美)).)*$" }\n  - {name: ♻️ 美国自动, type: url-test, url: 'http://www.gstatic.com/generate_204', include-all: true, tolerance: 20, interval: 300, filter: "(?=.*(美|US|(?i)States|America))^((?!(港|台|日|韩|新)).)*$"}\n  - {name: 🔯 香港故转, type: fallback, url: 'http://www.gstatic.com/generate_204', include-all: true, tolerance: 20, interval: 300, filter: "(?=.*(港|HK|(?i)Hong))^((?!(台|日|韩|新|深|美)).)*$"}\n  - {name: 🔯 日本故转, type: fallback, url: 'http://www.gstatic.com/generate_204', include-all: true, tolerance: 20, interval: 300, filter: "(?=.*(日|JP|(?i)Japan))^((?!(港|台|韩|新|美)).)*$" }\n  - {name: 🇭🇰 香港节点, type: select, include-all: true, filter: "(?i)港|hk|hongkong|hong kong"}\n  - {name: 🇯🇵 日本节点, type: select, include-all: true, filter: "(?i)日|jp|japan"}\n  - {name: 🇺🇲 美国节点, type: select, include-all: true, filter: "(?i)美|us|unitedstates|united states"}\n  - {name: 🚀 默认代理, type: select, proxies: [♻️ 自动选择, 🌐 全部节点, ♻️ 香港自动, ♻️ 日本自动, ♻️ 美国自动, 🔯 香港故转, 🔯 日本故转, 🇭🇰 香港节点, 🇯🇵 日本节点, 🇺🇲 美国节点, DIRECT]}\n  - {name: 📹 YouTube, <<: *pr}\n  - {name: 🍀 Google, <<: *pr}\n  - {name: 🤖 ChatGPT, <<: *pr}\n  - {name: 👨🏿‍💻 GitHub, <<: *pr}\n  - {name: 🐬 OneDrive, <<: *pr}\n  - {name: 🪟 Microsoft, <<: *pr}\n  - {name: 🎵 TikTok, <<: *pr}\n  - {name: 📲 Telegram, <<: *pr}\n  - {name: 🎥 NETFLIX, <<: *pr}\n  - {name: ✈️ Speedtest, <<: *pr}\n  - {name: 💶 PayPal, <<: *pr}\n  - {name: 🍎 Apple, type: select, proxies: [DIRECT, 🚀 默认代理]}\n  - {name: 🎯 直连, type: select, proxies: [DIRECT, 🚀 默认代理]}\n  - {name: 🐟 漏网之鱼, <<: *pr}\n\n# 规则匹配\n# 此规则部分没有做防泄露处理，因为弊严重大于利！\nrules:\n  - DOMAIN-SUFFIX,fastly.jsdelivr.net,DIRECT\n  - DOMAIN-SUFFIX,cdn.jsdelivr.net,DIRECT\n  - DOMAIN-SUFFIX,youtube.com,📹 YouTube\n  - DOMAIN-SUFFIX,googlevideo.com,📹 YouTube\n  - DOMAIN-SUFFIX,ytimg.com,📹 YouTube\n  - DOMAIN-SUFFIX,ggpht.com,📹 YouTube\n  - DOMAIN-SUFFIX,google.com,🍀 Google\n  - DOMAIN-SUFFIX,googleapis.com,🍀 Google\n  - DOMAIN-SUFFIX,gstatic.com,🍀 Google\n  - DOMAIN-SUFFIX,qichiyu.com,🚀 默认代理\n  - RULE-SET,private_domain,DIRECT\n  - RULE-SET,apple_domain,🍎 Apple\n  - RULE-SET,ai,🤖 ChatGPT\n  - RULE-SET,github_domain,👨🏿‍💻 GitHub\n  - RULE-SET,youtube_domain,📹 YouTube\n  - RULE-SET,google_domain,🍀 Google\n  - RULE-SET,onedrive_domain,🐬 OneDrive\n  - RULE-SET,microsoft_domain,🪟 Microsoft\n  - RULE-SET,tiktok_domain,🎵 TikTok\n  - RULE-SET,speedtest_domain,✈️ Speedtest\n  - RULE-SET,telegram_domain,📲 Telegram\n  - RULE-SET,netflix_domain,🎥 NETFLIX\n  - RULE-SET,paypal_domain,💶 PayPal\n  - RULE-SET,gfw_domain,🚀 默认代理\n  - RULE-SET,geolocation-!cn,🚀 默认代理\n  - RULE-SET,cn_domain,🎯 直连\n  - RULE-SET,google_ip,🍀 Google,no-resolve\n  - RULE-SET,netflix_ip,🎥 NETFLIX,no-resolve\n  - RULE-SET,telegram_ip,📲 Telegram,no-resolve\n  - RULE-SET,cn_ip,🎯 直连\n  - MATCH,🐟 漏网之鱼\n\n# 规则集\nrule-anchor:\n  ip: &ip {type: http, interval: 86400, behavior: ipcidr, format: mrs}\n  domain: &domain {type: http, interval: 86400, behavior: domain, format: mrs}\nrule-providers: \n  private_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/private.mrs"}\n  ai: {  <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-ai-!cn.mrs" }\n  youtube_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/youtube.mrs"}\n  google_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/google.mrs"}\n  github_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/github.mrs"}\n  telegram_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/telegram.mrs"}\n  netflix_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/netflix.mrs"}\n  paypal_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/paypal.mrs"}\n  onedrive_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/onedrive.mrs"}\n  microsoft_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/microsoft.mrs"}\n  apple_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/apple-cn.mrs"}\n  speedtest_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/ookla-speedtest.mrs"}\n  tiktok_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/tiktok.mrs"}\n  gfw_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/gfw.mrs"}\n  geolocation-!cn: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/geolocation-!cn.mrs"}\n  cn_domain: { <<: *domain, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/cn.mrs"}\n  \n  cn_ip: { <<: *ip, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/cn.mrs"}\n  google_ip: { <<: *ip, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/google.mrs"}\n  telegram_ip: { <<: *ip, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/telegram.mrs"}\n  netflix_ip: { <<: *ip, url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/netflix.mrs"}\n\n`}function pt(t,e){const n=t.host,o="/"+t.path,r=e.map((t,e)=>{const{user:r,srv:a,prt:s,name:i,isTrojan:l,tls:c}=rt(t,e),d=ot(t,"type")||"ws",p=c?{enabled:!0,server_name:n,utls:{enabled:!0,fingerprint:"chrome"}}:{enabled:!1},u="xhttp"===d?{type:"xhttp",mode:"stream-one",path:o}:{type:"ws",path:o,headers:{Host:n}};return l?{type:"trojan",tag:i,server:a,server_port:s,password:r,tls:p,transport:u}:{type:"vless",tag:i,server:a,server_port:s,uuid:r,flow:"",packet_encoding:"xudp",tls:p,transport:u}}),a=r.map(t=>t.tag),s={log:{level:"info"},dns:{servers:[{address:"223.5.5.5"},{address:"119.29.29.29"}]},inbounds:[{type:"mixed",tag:"mixed-in",listen:"127.0.0.1",listen_port:2080}],outbounds:[...r,{type:"direct",tag:"direct"},{type:"block",tag:"block"},{type:"selector",tag:"🚀 节点选择",outbounds:a},{type:"selector",tag:"🌐 全球直连",outbounds:["direct"]},{type:"selector",tag:"🐟 漏网之鱼",outbounds:["🚀 节点选择","🌐 全球直连"]}],route:{rules:[{geoip:["cn"],outbound:"direct"},{outbound:"🐟 漏网之鱼"}]}};return JSON.stringify(s,null,2)}function ut(t,e){const n=t.host,o="/"+t.path,r=e.map((t,e)=>{const{user:r,srv:a,prt:s,name:i,isTrojan:l,tls:c}=rt(t,e),d=c?", tls=true, skip-cert-verify=false, sni="+n:", tls=false";return l?`${i} = trojan, ${a}, ${s}, password=${r}, ws=true, ws-path=${o}, ws-headers=Host:${n}${d}`:`${i} = vless, ${a}, ${s}, username=${r}, ws=true, ws-path=${o}, ws-headers=Host:${n}${d}`});return`#!MANAGED-CONFIG\n[General]\nloglevel = notify\ndns-server = 223.5.5.5, 119.29.29.29\n\n[Proxy]\n${r.join("\n")}\n\n[Proxy Group]\n🚀 节点选择 = select, ${r.map(t=>t.split(" = ")[0]).join(", ")}\n🌐 全球直连 = select, DIRECT\n🐟 漏网之鱼 = select, 🚀 节点选择\n\n[Rule]\nGEOIP,CN,DIRECT\nFINAL,🐟 漏网之鱼\n`}function ft(t,e){const n=t.host,o="/"+t.path,r=e.map((t,e)=>{const{user:r,srv:a,prt:s,name:i,isTrojan:l,tls:c}=rt(t,e),d=c?", tls=true, skip-cert-verify=false, sni="+n:", tls=false";return l?`${i} = trojan, ${a}, ${s}, password=${r}, ws=true, ws-path=${o}, ws-headers=Host:${n}${d}`:`${i} = vless, ${a}, ${s}, username=${r}, ws=true, ws-path=${o}, ws-headers=Host:${n}${d}`}),a=r.map(t=>t.split(" = ")[0]).join(", ");return`[General]\ndns-server = 223.5.5.5, 119.29.29.29\n\n[Proxy]\n${r.join("\n")}\n\n[Proxy Group]\n🚀 节点选择 = select, ${a}\n🌐 全球直连 = select, DIRECT\n🐟 漏网之鱼 = select, ${a}\n\n[Rule]\nGEOIP,CN,DIRECT\nFINAL,🐟 漏网之鱼\n`}function ht(t,e){const n=t.host,o="/"+t.path,r=e.map((t,e)=>{const{user:r,srv:a,prt:s,name:i}=rt(t,e);if(t.startsWith("trojan://"))return`trojan=${a}:${s}, password=${r}, over-tls=true, tls-host=${n}, obfs=wss, obfs-host=${n}, obfs-uri=${o}, tls-verification=true, tag=${i}`;const l="tls"===(ot(t,"security")||"tls");return`vless=${a}:${s}, method=none, password=${r}, obfs=${l?"wss":"ws"}, obfs-host=${n}, obfs-uri=${o}${l?", tls-verification=true, tls13=true":""}, tag=${i}`}),a=e.map((t,e)=>{const n=t.indexOf("#");if(n<0)return`节点${e+1}`;try{return decodeURIComponent(t.slice(n+1))||`节点${e+1}`}catch(t){return`节点${e+1}`}}).join(", ");return`[general]\nnetwork_check_url=http://www.gstatic.com/generate_204\nserver_check_url=http://www.gstatic.com/generate_204\ndns_exclusion_list=*.cmpassport.com, *.qq.com, *.weibo.com, *.icloud.com\n[dns]\nserver=223.5.5.5\nserver=119.29.29.29\n[server_local]\n${r.join("\n")}\n[policy]\nstatic=🚀 节点选择, ${a}, img-url=https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png\nstatic=🌐 全球直连, direct, img-url=https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Direct.png\nstatic=🐟 漏网之鱼, 🚀 节点选择, direct, img-url=https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png\n[filter_local]\ngeoip, cn, 🌐 全球直连\nfinal, 🐟 漏网之鱼\n`}async function mt(t,e,n,r,s){const l=Object.assign({},t,{host:t.host||new URL(e).hostname}),c=t.optimizer&&t.optimizer.subMode||"";let h=[];const m=!(!t.filter||!t.filter.ipType||1!==t.filter.ipType.length||"IPv6"!==t.filter.ipType[0]),g=E(p.join("\n")).map(t=>({ip:t.ip,port:t.port||443,name:t.name||"优选IP-"+String(p.indexOf(t)+1).padStart(2,"0")}));if("custom"===c){const e=!(!t.optimizer||!t.optimizer.subIncludeDefault);if(h=await et(t.preferredDomains||"",100,600,e,e,m),e){const t=await et(u,40,200,!1,!0,m),e=new Set(t.map(t=>t.ip));h=[...t,...h.filter(t=>!e.has(t.ip))],l.optimizer||(l.optimizer={}),l.optimizer.fillCount=Math.max(parseInt(l.optimizer.fillCount)||0,800)}}else if(""===c){h=await et(i,100,600,!0,!0,m);const t=await et(u,40,200,!1,!0,m),e=new Set(h.map(t=>t.ip));h=[...h,...t.filter(t=>!e.has(t.ip))],l.optimizer||(l.optimizer={}),l.optimizer.fillCount=Math.max(parseInt(l.optimizer.fillCount)||0,1e3)}const v=t._skipIssued&&t._skipIssued.size?t._skipIssued:null;if(h.length){let t=h;if(v){t=[...h.filter(t=>!v.has(t.ip)),...h.filter(t=>v.has(t.ip))]}const e=(l.preferredIPs||[]).length;t=t.map((t,n)=>/^[A-Za-z0-9.-]+\.[A-Za-z]{2,}-\d+$/.test(t.name||"")?Object.assign({},t,{name:"优选IP-"+String(e+n+1).padStart(2,"0")}):t),l.preferredIPs=[...l.preferredIPs||[],...t]}("custom"!==c||t.optimizer&&t.optimizer.subIncludeDefault)&&(l.preferredIPs=[...l.preferredIPs||[],...g]),r=(r||"").toLowerCase();const I=(n||"").toLowerCase(),P=["clash","singbox","sing-box","surge","loon","quanx","quantumultx"].includes(I)||/clash|singbox|sing-box|surge|loon|quantumult/.test(r)?300:800;let x=P;if(!1===t.polling&&(x=1e4),t.nodeLimit&&!1!==t.polling){const e=parseInt(t.nodeLimitCount)||0;e>0&&(x=Math.min(e,P))}const w="random"===c?Object.assign({},t.filter,{region:"all"}):t.filter;let k=function(t,e){if(!e||!e.region&&!e.ipType&&!e.isp)return t;const n=e.region||"all",o=e.ipType||lt,r=e.isp||it,a=t.map(t=>{const{host:e}=nt(t);let n="";try{const e=t.indexOf("#");e>=0&&(n=decodeURIComponent(t.slice(e+1)||""))}catch(t){n=""}return{host:e,name:n,up:n.toUpperCase()}}),s=a.some(t=>t.up&&Object.keys(st).some(e=>(st[e]||[e]).some(e=>t.up.includes(e.toUpperCase())))),i=(e,n,o)=>{const r="all"!==e?at[e]||[]:null,i=o.length>0&&o.length<it.length;return t.filter((t,e)=>{const l=a[e],c=l.host.indexOf(":")>=0;if(!l.name)return!1;if(r&&!r.some(t=>l.up.includes(t.toUpperCase()))&&!/^(优选IP|域名)-\d+/.test(l.name))return!1;if(1===n.length){if("IPv4"===n[0]&&c)return!1;if("IPv6"===n[0]&&!c)return!1}return!(i&&s&&!o.some(t=>(st[t]||[t]).some(t=>l.up.includes(t.toUpperCase()))))})};let l=i(n,o,r);return l.length||(l=i(n,o,it)),l.length||(l=i(n,lt,it)),l.length||(l=i("all",lt,it)),l}(function(t,e=800,n=null){const r=[],s=new Set,i=t.optimizer&&t.optimizer.subMode||"",l="custom"===i&&!(t.optimizer&&t.optimizer.subIncludeDefault),c=(n,o,i,c)=>{if(r.length>=e)return;if(y(n)&&!a(n)&&!l&&!c)return;const d=n;if(s.has(d))return;s.add(d);const p=!f.has(Number(o));t.tlsOnly&&!p||(t.enableVless&&r.push(Y(t,n,o,i)),t.enableTrojan&&p&&r.push(Z(t,n,o,i)),t.enableXhttp&&r.push(Y(t,n,o,i,{type:"xhttp"})))};if("random"===i){let a=Math.min(Math.max(parseInt(t.optimizer.subRandomCount)||16,1),Math.min(99,e));if(t.nodeLimit&&!1!==t.polling){const n=parseInt(t.nodeLimitCount)||0;n>0&&(a=Math.min(Math.max(a,n),e))}const s=(t.enableVless?1:0)+(t.enableTrojan?1:0)+(t.enableXhttp?1:0)||1;let i=0;const l=T(o,3*Math.ceil(a/s));let c=l;n&&(c=[...l.filter(t=>!n.has(t)),...l.filter(t=>n.has(t))]);for(const e of c){if(i>=a)break;if(t.enableVless&&(r.push(Y(t,e,443,"优选IP-"+String(i+1).padStart(2,"0"))),i++),i>=a)break;if(t.enableTrojan&&(r.push(Z(t,e,443,"优选IP-"+String(i+1).padStart(2,"0"))),i++),i>=a)break;t.enableXhttp&&(r.push(Y(t,e,443,"优选IP-"+String(i+1).padStart(2,"0"),{type:"xhttp"})),i++)}return r}const u=String(t.preferredDomains||"").split(/[\n,;]+/).map(t=>t.trim()).filter(t=>t&&!t.includes("://"));if(u.forEach((t,e)=>{const n=t.indexOf("#"),o=(n>=0?t.slice(0,n):t).trim(),r=(n>=0?t.slice(n+1):"").trim(),a=b(o,443);a.host.startsWith("*.")||c(a.host,a.port,r||"优选IP-"+String(e+1).padStart(2,"0"))}),(t.preferredIPs||[]).forEach((t,e)=>{c(t.ip,t.port||443,t.name||"优选IP-"+String(e+1).padStart(2,"0"),!0===t.relay)}),!("custom"!==i||t.optimizer&&t.optimizer.subIncludeDefault))return r;u.length||(t.preferredIPs||[]).length||(E(p.join("\n")).forEach(t=>c(t.ip,t.port||443,t.name||"0")),d.forEach((t,e)=>c(t,443,"域名-"+String(e+1).padStart(2,"0"))));const h=Math.min(Math.max(parseInt(t.optimizer&&t.optimizer.fillCount||0)||0,0),5e3),m=Math.min(h,e)-s.size;if(m>0){const a=T(o,3*m),s=n?a.filter(t=>!n.has(t)):a,i=s.length>=m?s:a;let l=0;for(const n of i){if(r.length>=e)break;l++,r.push(Y(t,n,443,"优选IP-"+String(l).padStart(3,"0")))}}return r}(l,x,v),w);if(t.nodeLimit&&!1!==t.polling&&c&&k.length<x){const t=x-k.length,e=T(o,3*t),n=v?e.filter(t=>!v.has(t)):e,r=n.length>=t?n:e;let a=0;for(const t of r){if(k.length>=x)break;a++,k.push(Y(l,t,443,"优选IP-"+String(a).padStart(3,"0")))}}k.length>x&&(k.length=x);const S=[],C=new Set;for(const t of k)try{const{host:e}=nt(t);y(e)&&!C.has(e)&&(C.add(e),S.push(e))}catch(t){}let $,A;return"clash"===I?($="text/yaml",A=dt(l,k)):"singbox"===I||"sing-box"===I?($="application/json",A=pt(l,k)):"surge"===I?($="text/plain",A=ut(l,k)):"loon"===I?($="text/plain",A=ft(l,k)):"quanx"===I||"quantumultx"===I?($="text/plain",A=ht(l,k)):"v2ray"===I||"v2rayn"===I||"shadowrocket"===I||"nekoray"===I||"stash"===I?($="text/plain",A=k.join("\n")):r.includes("clash")||r.includes("stash")?($="text/yaml",A=dt(l,k)):r.includes("sing-box")?($="application/json",A=pt(l,k)):r.includes("surge")?($="text/plain",A=ut(l,k)):r.includes("loon")?($="text/plain",A=ft(l,k)):r.includes("quantumult")?($="text/plain",A=ht(l,k)):($="text/plain",A=k.join("\n")),{type:$,body:A,issued:S}}const gt=String.raw`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CFNext · 管理面板</title>
<script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>
<style>
:root{--bg:#0d1117;--card:#161b22;--card2:#1c2230;--line:#2d333b;--txt:#e6edf3;--dim:#8b949e;--acc:#4f9dff;--ok:#3fb950;--warn:#d29922;--err:#f85149}
[data-theme='light']{--bg:#f6f8fa;--card:#ffffff;--card2:#f0f3f6;--line:#d0d7de;--txt:#1f2328;--dim:#656d76;--acc:#0969da;--ok:#1a7f37;--warn:#9a6700;--err:#cf222e}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--txt);font-family:"PingFang SC","Microsoft YaHei",system-ui,sans-serif;font-size:14px;line-height:1.6}
a{color:var(--acc);text-decoration:none}
.wrap{max-width:1080px;margin:0 auto;padding:16px}
header{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid var(--line);margin-bottom:16px}
.logo{width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#4f9dff,#6f5bff);display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:13px;letter-spacing:-0.5px}
.logo span{transform:rotate(-12deg)}
header h1{font-size:18px;font-weight:700}
header .sub{color:var(--dim);font-size:12px}
nav{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px}
nav button{background:var(--card);color:var(--dim);border:1px solid var(--line);padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;transition:.15s}
nav button:hover{color:var(--txt);border-color:var(--acc)}
nav button.on{background:var(--acc);color:#fff;border-color:var(--acc);font-weight:600}
.tab{display:none}
.tab.on{display:block}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:18px;margin-bottom:14px}
.card h2{font-size:15px;margin-bottom:14px;display:flex;align-items:center;gap:8px}
.card h2 .tag{font-size:11px;color:var(--dim);font-weight:400}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.proto-row{display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--card2);border:1px solid var(--line);border-radius:10px;margin-bottom:8px}
.proto-row span{font-size:13px}
.proto-row .switch{margin:0}
.chk-row{display:flex;flex-wrap:wrap;gap:10px}
.chk-groups{display:flex;align-items:center;gap:8px 16px;flex-wrap:wrap}
.chk-group{display:inline-flex;align-items:center;gap:7px}
.chk-group .chk-gt{font-size:13px;color:var(--dim);white-space:nowrap}
.chk-group .chk{display:inline-flex;align-items:center;gap:4px;font-size:14px;color:var(--txt);cursor:pointer;white-space:nowrap}
.chk-group .chk input{width:auto;height:auto;accent-color:var(--acc);margin:0;padding:0}
.chk-group .chk:has(input:checked){color:var(--acc);font-weight:600}
@media(max-width:760px){.grid,.grid3{grid-template-columns:1fr}}
.field{margin-bottom:12px}
.field label{display:block;font-size:12px;color:var(--dim);margin-bottom:5px}
.field input,.field select,.field textarea{width:100%;background:var(--card2);border:1px solid var(--line);color:var(--txt);border-radius:8px;padding:9px 11px;font-size:13px;outline:none}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--acc)}
.field textarea{resize:vertical;font-family:ui-monospace,Consolas,monospace;font-size:12px}
.field .hint{font-size:11px;color:var(--dim);margin-top:4px}
.row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.switch{position:relative;width:44px;height:24px;display:inline-block;flex:none}
.switch input{opacity:0;width:0;height:0}
.switch .sl{position:absolute;inset:0;background:var(--card2);border:1px solid var(--line);border-radius:12px;transition:.15s;cursor:pointer}
.switch .sl:before{content:"";position:absolute;width:16px;height:16px;left:3px;top:3px;background:var(--dim);border-radius:50%;transition:.15s}
.switch input:checked + .sl{background:var(--acc);border-color:var(--acc)}
.switch input:checked + .sl:before{transform:translateX(20px);background:#fff}
.btn{background:var(--card2);border:1px solid var(--line);color:var(--txt);padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;transition:.15s}
.btn:hover{border-color:var(--acc);color:var(--acc)}
.btn.primary{background:var(--acc);border-color:var(--acc);color:#fff;font-weight:600}
.btn.danger{background:var(--err);border-color:var(--err);color:#fff;font-weight:600}
.btn.danger:hover{background:#c62828;border-color:#c62828;color:#fff}
.btn.sm{padding:5px 10px;font-size:12px}
.btn.dirty{outline:2px solid var(--warn)}
.msg{padding:10px 14px;border-radius:8px;margin:10px 0;font-size:13px;display:none}
.msg.show{display:block}
.msg.info{background:rgba(79,157,255,.12);color:var(--acc);border:1px solid rgba(79,157,255,.35)}
.msg.ok{background:rgba(63,185,80,.12);color:var(--ok);border:1px solid rgba(63,185,80,.35)}
.msg.err{background:rgba(248,81,73,.12);color:var(--err);border:1px solid rgba(248,81,73,.35)}
table{width:100%;border-collapse:collapse;font-size:13px}
th,td{padding:9px 10px;text-align:left;border-bottom:1px solid var(--line)}
th{color:var(--dim);font-weight:500;font-size:12px}
td .ip{font-family:ui-monospace,Consolas,monospace}
.badge{display:inline-block;padding:2px 9px;border-radius:20px;font-size:11px;background:var(--card2);border:1px solid var(--line)}
.badge.g{color:var(--ok);border-color:var(--ok)}
.badge.r{color:var(--err);border-color:var(--err)}
.kv{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed var(--line);font-size:13px}
.kv:last-child{border-bottom:none}
.kv .k{color:var(--dim)}
.kv .v{font-family:ui-monospace,Consolas,monospace;word-break:break-all;text-align:right;max-width:70%}
.toast{position:fixed;top:16px;right:16px;z-index:99;background:var(--card2);border:1px solid var(--line);border-left:4px solid var(--acc);padding:11px 18px;border-radius:8px;font-size:13px;box-shadow:0 6px 24px rgba(0,0,0,.4);transform:translateX(120%);transition:.25s}
.toast.show{transform:translateX(0)}
.toast.ok{border-left-color:var(--ok)}
.toast.err{border-left-color:var(--err)}
.fbar{position:fixed;bottom:18px;right:18px;display:flex;flex-direction:column;gap:8px;z-index:50}
.fbar .btn{box-shadow:0 6px 20px rgba(0,0,0,.45)}
.loading{text-align:center;color:var(--dim);padding:40px}
pre.code{background:#0b0e14;border:1px solid var(--line);border-radius:8px;padding:12px;overflow:auto;font-size:11.5px;line-height:1.5;max-height:340px;font-family:ui-monospace,Consolas,monospace}
.center{text-align:center}
.mt{margin-top:14px}
#qrWrap{display:none;text-align:center;margin-top:10px}
#qrWrap canvas,#qrWrap img{margin:0 auto}
.qrbox{background:#fff;display:inline-block;padding:10px;border-radius:8px;margin-top:8px}
code.hl{background:var(--card2);padding:2px 6px;border-radius:5px;font-family:ui-monospace,Consolas,monospace;font-size:12px}
</style>
</head>
<body>
<div class="wrap">
<header>
  <div class="logo"><span>CF</span></div>
  <div>
    <h1>CFNext</h1>
    <div class="sub">Cloudflare 代理管理面板 · 全新编写</div>
  </div>
  <div style="margin-left:auto;font-size:12px;color:var(--dim);display:flex;align-items:center;gap:8px"><button id='themeBtn' class='btn sm' onclick='toggleTheme()' style='font-size:14px;padding:2px 8px'>🌙</button><span id="hdrInfo">加载中…</span></div>
</header>

<nav id="nav">
  <button data-tab="overview" class="on">总览</button>
  <button data-tab="nodes">节点配置</button>
  <button data-tab="pick">优选器</button>
  <button data-tab="help">关于项目</button>
</nav>

<!-- 总览 -->
<div class="tab on" id="tab-overview">
  <div class="card">
    <h2>快速开始</h2>
    <div id="wdwarn" style="display:none;background:rgba(242,85,73,.12);border:1px solid rgba(242,85,73,.4);color:#ff9c98;border-radius:8px;padding:8px 12px;font-size:12px;margin-bottom:10px">检测到当前通过 *.workers.dev 访问。该域名大陆直连常被阻断，下发的节点 SNI 取自访问域名，会导致客户端真连接延时全部 -1。请到 Cloudflare Workers 绑定自定义域名后，用自定义域名访问面板与订阅。</div>
    <div class="grid3">
      <div class="card" style="margin:0">
        <h2>1. 免配置使用（小白专属）</h2>
        <p style="color:var(--dim);font-size:13px">部署即可用，直接点击下方复制订阅链接导入客户端。</p>
      </div>
      <div class="card" style="margin:0">
        <h2>2. 配置协议使用</h2>
        <p style="color:var(--dim);font-size:13px">根据需要在节点配置选项中配置 VLESS / Trojan / XHTTP 协议、节点数量控制、TLS、ECH，保存后生效。</p>
      </div>
      <div class="card" style="margin:0">
        <h2>3. 优选方式使用</h2>
        <p style="color:var(--dim);font-size:13px">在优选器选项中将订阅模式改为【自定义订阅（支持汇聚）】或【随机优选模式（官方接口）】进行使用，【自定义订阅（支持汇聚）】模式内置 6 个在线源（可根据需求增删），在线优选需开启【自定义订阅（支持汇聚）】选项后方可使用。</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h2>地区与筛选</h2>
    <div class="grid">
      <div class="field" style="display:flex;flex-direction:column">
        <label>地区选择</label>
        <select id="fl-region" style="max-width:280px" onchange="markDirty();makeSub(false)">
          <option value="all">全部节点</option>
          <option value="HK">HK 香港</option>
          <option value="TW">TW 台湾</option>
          <option value="US">US 美国</option>
          <option value="SG">SG 新加坡</option>
          <option value="JP">JP 日本</option>
          <option value="KR">KR 韩国</option>
          <option value="DE">DE 德国</option>
        </select>
        <p class="hint" style="color:var(--dim);font-size:12px;margin-top:auto;padding-top:5px">节点名称含地区标记（HK/香港、TW/台湾、US/美国…）即仅下发该地区</p>
      </div>
      <div class="field" style="display:flex;flex-direction:column">
        <label>筛选设置</label>
        <div class="chk-groups">
          <div class="chk-group">
            <span class="chk-gt">IP类型</span>
            <label class="chk"><input type="checkbox" id="fl-ipv4" checked onchange="markDirty()"> IPv4</label>
            <label class="chk"><input type="checkbox" id="fl-ipv6" checked onchange="markDirty()"> IPv6</label>
          </div>
          <div class="chk-group">
            <span class="chk-gt">运营商</span>
            <label class="chk"><input type="checkbox" id="fl-isp-mobile" checked onchange="markDirty()"> 移动</label>
            <label class="chk"><input type="checkbox" id="fl-isp-unicom" checked onchange="markDirty()"> 联通</label>
            <label class="chk"><input type="checkbox" id="fl-isp-telecom" checked onchange="markDirty()"> 电信</label>
          </div>
        </div>
        <p class="hint" style="color:var(--dim);font-size:12px;margin-top:auto;padding-top:5px">取消勾选即过滤；IP 类型按地址、运营商按名称匹配</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h2>订阅地址</h2>
    <div class="field">
      <label>客户端格式</label>
      <select id="subFmt" onchange="makeSub(false)">
        <option value="auto">自动识别（UA）</option>
        <option value="clash">Clash YAML</option>
        <option value="singbox">Sing-box JSON</option>
        <option value="surge">Surge</option>
        <option value="loon">Loon</option>
        <option value="quanx">Quantumult X</option>
        <option value="v2ray">v2ray / 通用链接</option>
      </select>
    </div>
    <div class="field">
      <label>订阅链接</label>
      <div class="row">
        <input id="subUrl" readonly style="flex:1">
        <button class="btn" onclick="copySub()">复制</button>
        <button class="btn" onclick="showQRCode()">二维码</button>
        <button class="btn primary" onclick="downloadSub()">下载</button>
      </div>
      <div id="qrWrap"></div>
    </div>
  </div>

  <div class="card">
    <h2>运行状态</h2>
    <div id="statusBox"><div class="loading">加载中…</div></div>
  </div>
</div>

<!-- 节点配置 -->
<div class="tab" id="tab-nodes">
  <div class="card">
    <h2>基础配置</h2>
    <div class="grid">
      <div class="field"><label>面板路径</label><input id="f-path" placeholder="留空使用 UUID"></div>
      <div class="field"><label>管理密码（留空无需登录）</label><input id="f-admin" type="password" placeholder="可选"></div>
    </div>
    <div class="grid">
      <div class="field"><label>VLESS UUID</label><input id="f-uuid" placeholder="留空自动生成"></div>
      <div class="field"><label>自定义 SNI / Host（留空用 Worker 域名）</label><input id="f-host" placeholder="your.domain.com"></div>
    </div>
    <div class="hint" style="margin:0;font-size:11px;color:var(--dim)">UUID 为 VLESS 用户认证 ID；面板路径为访问面板的 URL 路径，留空时与 UUID 相同。</div>
  </div>

  <div class="card">
    <h2>节点配置</h2>
    <div class="grid">
      <div class="field"><label>ALPN（留空由客户端协商）</label><select id="f-alpn">
        <option value="">自动</option>
        <option value="h3">h3</option>
        <option value="h2">h2</option>
        <option value="http/1.1">http/1.1</option>
        <option value="h3,h2">h3,h2</option>
        <option value="h2,http/1.1">h2,http/1.1</option>
        <option value="h3,h2,http/1.1">h3,h2,http/1.1</option>
      </select></div>
      <div class="field"><label>TLS 控制（开启仅下发 TLS 端口节点）</label>
        <select id="f-tlsOnly">
          <option value="false">关闭</option>
          <option value="true">开启</option>
        </select>
      </div>
    </div>
    <div class="grid" style="margin-bottom:0">
      <div class="field" style="margin-bottom:0"><label>节点数量控制（开启后限制下发节点总数）</label>
        <select id="f-nodeLimit" onchange="onNodeLimit()">
          <option value="false">关闭</option>
          <option value="true">开启</option>
        </select>
      </div>
      <div class="field" id="f-nodeLimitWrap" style="margin-bottom:0;display:none"><label>下发节点数量</label>
        <input id="f-nodeLimitCount" type="number" min="1" max="800" value="100">
        <p class="hint">开启后最多下发该数量的节点；免费版 10ms CPU 硬限内，结构化格式（Clash/Singbox/Surge 等）上限 300、行格式（v2ray）上限 800，超出部分自动钳制</p>
      </div>
      <div class="field" style="margin-bottom:0"><label>轮询机制（开启后每次更新订阅下发不同节点）</label>
        <select id="f-polling" onchange="markDirty()">
          <option value="true">开启</option>
          <option value="false">关闭</option>
        </select>
        <p class="hint">开启：Clash节点上限：300/V2rayN节点上限：800，更新订阅覆盖原有下发节点；关闭：忽略轮询与数量限制，一次性下发全部节点</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h2>ECH 配置</h2>
    <div class="grid">
      <div class="field" style="margin-bottom:0"><label>ECH 加密</label>
        <select id="f-ech">
          <option value="false">关闭</option>
          <option value="true">开启</option>
        </select>
        <p class="hint">关闭使用默认 ECH 配置，开启 ECH 加密 TLS 握手隐藏 SNI</p>
      </div>
      <div class="field" style="margin-bottom:0"><label>自定义 ECH 域名</label>
        <input id="f-echHost" placeholder="cloudflare-ech.com">
        <p class="hint">ECH 域名留空用默认</p>
      </div>
    </div>
    <div class="grid">
      <div class="field" style="margin-bottom:0"><label>自定义 ECH DNS</label>
        <input id="f-echDns" placeholder="https://223.5.5.5/dns-query">
        <p class="hint">关闭用客户端默认 DNS，开启自定义 DoH 获取 ECH 配置；地址留空用默认</p>
      </div>
      <div class="field" style="margin-bottom:0"></div>
    </div>
  </div>

  <div class="card">
    <h2>协议开关</h2>
    <div class="proto-row"><label class="switch"><input type="checkbox" id="f-enableVless"><span class="sl"></span></label><span>启用 VLESS 协议（默认开启）</span></div>
    <div class="proto-row"><label class="switch"><input type="checkbox" id="f-enableTrojan"><span class="sl"></span></label><span>启用 Trojan 协议（不支持Mihomo客户端）</span></div>
    <div class="proto-row"><label class="switch"><input type="checkbox" id="f-enableXhttp"><span class="sl"></span></label><span>启用 xhttp 协议（需勾选本项并绑定自定义域名）</span></div>
    <div class="field" style="margin-top:10px"><label>Trojan 密码（留空用 UUID）</label><input id="f-trojanPassword" placeholder="Trojan 密码"></div>
  </div>

  <div class="card">
    <h2>落地与出站</h2>
    <div class="grid">
      <div class="field"><label>反代/落地 IP（留空使用内置地区反代，填写后优先，格式 host 或 host:port）</label><input id="f-proxyIP" placeholder="留空使用内置中继"></div>
      <div class="field"><label>出站代理（可选，socks5:// / http:// 或 host:port）</label><input id="f-outboundProxy" placeholder="socks5://user:pass@1.2.3.4:1080"></div>
    </div>
    <div class="field"><label>出站方式</label><select id="f-outboundMode">
      <option value="">默认（优先代理，失败直连）</option>
      <option value="no">直连优先（no）</option>
      <option value="only">仅走代理（only）</option>
    </select></div>
  </div>
</div>

<!-- 优选器 -->
<div class="tab" id="tab-pick">
  <div class="card">
    <h2>在线优选</h2>
    <div class="field">
      <label>数据源</label>
      <select id="o-source">
        <option value="wetest_v4">微测网 IPv4</option>
        <option value="wetest_v6">微测网 IPv6</option>
        <option value="bestcf">优选 IP 列表</option>
        <option value="hostmonit">HostMonit 优选</option>
        <option value="cidr">内置 CF 地址段</option>
        <option value="custom">自定义 URL</option>
      </select>
    </div>
    <div class="field" id="o-customWrap" style="display:none"><label>自定义数据源 URL</label><input id="o-sourceURL" placeholder="https://.../ip.txt"></div>
    <div class="grid3">
      <div class="field" style="grid-column:span 3"><label>测速端口（本地→目标测速）</label>
        <select id="o-portSel" onchange="onPortSel()">
          <optgroup label="HTTPS">
            <option value="443">443</option>
            <option value="2053">2053</option>
            <option value="2083">2083</option>
            <option value="2087">2087</option>
            <option value="2096">2096</option>
            <option value="8443">8443</option>
          </optgroup>
          <optgroup label="HTTP">
            <option value="80">80</option>
            <option value="8080">8080</option>
            <option value="8880">8880</option>
            <option value="2052">2052</option>
            <option value="2082">2082</option>
            <option value="2086">2086</option>
            <option value="2095">2095</option>
          </optgroup>
          <option value="custom">自定义…</option>
        </select>
        <input id="o-portCustom" style="display:none;margin-top:8px" placeholder="输入端口号">
      </div>
      <div class="field"><label>并发线程（1-50）</label><input id="o-threads" value="5"></div>
      <div class="field"><label>候选数量</label><input id="o-count" value="20"></div>
      <div class="field"><label>随机补足数量（0 关闭）</label><input id="o-fillCount" value="0"></div>
    </div>
    <div class="row">
      <label class="switch"><input type="checkbox" id="o-useCidr" checked><span class="sl"></span></label>
      <span style="font-size:13px">不足时补充随机 Cloudflare IP</span>
      <button class="btn primary" onclick="runPick()">开始优选</button>
      <button class="btn" onclick="addAllBest()">全部加入最优</button>
    </div>
    <div class="msg" id="oMsg"></div>
  </div>

  <div class="card">
    <h2>测速结果</h2>
    <table><thead><tr><th>IP:端口</th><th>延迟</th><th>状态</th><th>操作</th></tr></thead>
    <tbody id="oTableBody"></tbody></table>
  </div>

  <div class="card">
    <h2>优选节点</h2>
    <div class="field">
      <label>订阅模式</label>
      <div class="row">
        <select id="o-subMode" onchange="onSubMode()" style="flex:1">
          <option value="">关闭（使用面板默认）</option>
          <option value="custom">自定义订阅（支持汇聚）</option>
          <option value="random">随机优选模式（官方接口）</option>
        </select>
        <select id="o-subIncludeDefault" style="flex:1">
          <option value="0">关闭（仅自定义节点）</option>
          <option value="1">开启（追加内置及默认节点）</option>
        </select>
      </div>
      <div class="hint">订阅模式：选择生成优选节点的方式；选择「自定义订阅（支持汇聚）」时，右侧开关控制是否同时下发内置优选池及默认 6 条地区源节点——关闭仅下发自定义节点，开启则默认地区与自定义节点合并下发</div>
    </div>
    <div class="field" id="sm-custom">
      <label>优选节点（域名 / 优选API / IP，每行一个，IP 格式 IP:端口#名称）</label>
      <textarea id="f-preferred" rows="5" placeholder="*.cloudflare.182682.xyz&#10;104.25.246.53:443#香港&#10;https://bestcf.pages.dev/random-region/HK/100.txt"></textarea>
      <div class="hint">开启「自定义订阅」后生效；域名与优选 API 保存后自动解析下发；点击上方测速结果「加入优选」自动填入 IP；保存用右上「保存全部」按钮</div>
      <button class="btn sm" style="margin-top:6px" onclick="fetchDomains()">拉取微测网优选域名</button>
    </div>
    <div class="field" id="sm-random" style="display:none">
      <label>随机优选数量（1-99）</label>
      <input id="o-subRandomCount" value="16" type="number" min="1" max="99">
      <div class="hint">从 Cloudflare 地址段随机生成指定数量的优选节点下发（不经域名解析）</div>
    </div>
  </div>
</div>

<!-- 关于项目 -->
<div class="tab" id="tab-help">
  <div class="card">
    <h2>特别鸣谢</h2>
    <p style="color:var(--dim);font-size:13px">本面板为全新独立编写，功能与接口参考以下开源项目：</p>
    <table>
      <tr><th>参考仓库</th><th>地址</th></tr>
      <tr><td>cmliu/edgetunnel</td><td><a href="https://github.com/cmliu/edgetunnel" target="_blank" rel="noopener">https://github.com/cmliu/edgetunnel</a></td></tr>
      <tr><td>zizifn/edgetunnel</td><td><a href="https://github.com/zizifn/edgetunnel" target="_blank" rel="noopener">https://github.com/zizifn/edgetunnel</a></td></tr>
      <tr><td>6Kmfi6HP/EDtunnel</td><td><a href="https://github.com/6Kmfi6HP/EDtunnel" target="_blank" rel="noopener">https://github.com/6Kmfi6HP/EDtunnel</a></td></tr>
      <tr><td>IonRh/Cloudflare-BestIP</td><td><a href="https://github.com/IonRh/Cloudflare-BestIP" target="_blank" rel="noopener">https://github.com/IonRh/Cloudflare-BestIP</a></td></tr>
    </table>
  </div>
  <div class="card">
    <h2>调用 API 接口</h2>
    <table>
      <tr><th>用途</th><th>接口</th></tr>
      <tr><td>微测网 IPv4 优选</td><td>https://www.wetest.vip/page/cloudflare/address_v4.html</td></tr>
      <tr><td>微测网 IPv6 优选</td><td>https://www.wetest.vip/page/cloudflare/address_v6.html</td></tr>
      <tr><td>微测网 优选域名</td><td>https://www.wetest.vip/page/cloudflare/cname.html</td></tr>
      <tr><td>优选 IP 列表</td><td>https://cf.090227.xyz/ip.164746.xyz</td></tr>
      <tr><td>HostMonit 优选</td><td>https://stock.hostmonit.com/CloudFlareYes</td></tr>
      <tr><td>优选 API（bestcf 随机地区）</td><td>https://bestcf.pages.dev/random-region/{HK|TW|JP|SG|US|KR}/100.txt</td></tr>
      <tr><td>DoH 解析（Cloudflare）</td><td>https://cloudflare-dns.com/dns-query</td></tr>
      <tr><td>DoH 解析（阿里）</td><td>https://dns.alidns.com/resolve</td></tr>
      <tr><td>DoH 解析（腾讯）</td><td>https://doh.pub/dns-query</td></tr>
    </table>
  </div>
  <div class="card">
    <h2>相关链接</h2>
    <p style="color:var(--dim);font-size:13px">YouTube @数字派：<a href="https://www.youtube.com/@PAI_CN" target="_blank" rel="noopener">https://www.youtube.com/@PAI_CN</a></p>
    <p style="color:var(--dim);font-size:13px">Telegram 交流群：<a href="https://t.me/SZ_PAI" target="_blank" rel="noopener">https://t.me/SZ_PAI</a></p>
  </div>
</div>

</div>
<div class="fbar"><button class="btn danger" id="resetBtn" onclick="resetAll()">重置</button>
<button class="btn primary" id="saveBtn" onclick="saveAll()">保存全部</button></div>
<div class="toast" id="toast"></div>

<script>
var APIPATH = location.pathname;
var CFG = null;
function $(id){ return document.getElementById(id); }
function api(p, opts){
  return fetch(APIPATH + '/api/' + p, opts).then(function(r){ return r.json(); });
}
var toastTimer = null;
function toast(t, ty){
  var el = $('toast');
  el.textContent = t;
  el.className = 'toast show ' + (ty || '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ el.className = 'toast'; }, 2600);
}
function showMsg(id, t, ty){
  var el = $(id);
  el.textContent = t;
  el.className = 'msg show ' + (ty || 'info');
}
function copyText(t){
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(function(){ toast('已复制', 'ok'); }, function(){ fallbackCopy(t); });
  } else fallbackCopy(t);
}
function fallbackCopy(t){
  var ta = document.createElement('textarea');
  ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); toast('已复制', 'ok'); } catch(e) { toast('复制失败，请手动复制', 'err'); }
  document.body.removeChild(ta);
}
function copySub(){ copyText($('subUrl').value); }
function markDirty(){ $('saveBtn').classList.add('dirty'); }
function switchTab(t){
  document.querySelectorAll('#nav button').forEach(function(b){
    b.classList.toggle('on', b.getAttribute('data-tab') === t);
  });
  document.querySelectorAll('.tab').forEach(function(x){
    x.classList.toggle('on', x.id === ('tab-' + t));
  });
  if(t === 'overview') makeSub(false);
}
document.querySelectorAll('#nav button').forEach(function(b){
  b.addEventListener('click', function(){ switchTab(b.getAttribute('data-tab')); });
});
document.querySelectorAll('input,select,textarea').forEach(function(el){
  if(el.id && el.id.length >= 2 && el.id.charAt(1) === '-' && (el.id.charAt(0) === 'f' || el.id.charAt(0) === 'o')){
    el.addEventListener('change', markDirty);
  }
});
$('saveBtn').addEventListener('click', saveAll);
$('o-source').addEventListener('change', function(){
  var v = $('o-source').value;
  $('o-customWrap').style.display = v === 'custom' ? '' : 'none';
  markDirty();
});
function onPortSel(){
  $('o-portCustom').style.display = $('o-portSel').value === 'custom' ? '' : 'none';
  markDirty();
}

function loadAll(){
  if (/\.workers\.dev$/i.test(location.hostname)) { var w = $('wdwarn'); if (w) w.style.display = ''; }
  api('status').then(function(r){
    if(r && r.ok) renderStatus(r.data);
  }).catch(function(){});
  api('config').then(function(r){
    if(r && r.ok){ CFG = r.data; fillForm(); renderPreferred(); renderHeader(); makeSub(false); }
    else if(r && r.status === 403){ location.href = '/login?next=' + encodeURIComponent(APIPATH); }
    else { toast('无法连接服务器', 'err'); }
  }).catch(function(){ toast('无法连接服务器', 'err'); });
}
function renderHeader(){
  if(!CFG) return;
  $('hdrInfo').textContent = '当前版本：' + (CFG.version || '');
}
function renderStatus(d){
  var h = '';
  h += '<div class="kv"><span class="k">Worker 地址</span><span class="v">' + (d.host || '') + '</span></div>';
  h += '<div class="kv"><span class="k">面板路径</span><span class="v">' + (d.path || '') + '</span></div>';
  h += '<div class="kv"><span class="k">面板入口</span><span class="v">' + location.origin + '/' + (d.path || '') + '</span></div>';
  h += '<div class="kv"><span class="k">接入节点</span><span class="v">' + (d.host ? '正常' : '未知') + '</span></div>';
  $('statusBox').innerHTML = h;
}
function onNodeLimit(){
  var on = $('f-nodeLimit') && $('f-nodeLimit').value === 'true';
  if($('f-nodeLimitWrap')) $('f-nodeLimitWrap').style.display = on ? '' : 'none';
}
function fillForm(){
  if(!CFG) return;
  $('f-uuid').value = CFG.uuid || '';
  $('f-path').value = CFG.path || '';
  $('f-admin').value = CFG.admin || '';
  $('f-host').value = CFG.host || '';
  $('f-alpn').value = CFG.alpn || '';
  $('f-ech').value = CFG.ech ? 'true' : 'false';
  $('f-echHost').value = CFG.echHost || '';
  $('f-echDns').value = CFG.echDns || '';
  $('f-tlsOnly').value = CFG.tlsOnly ? 'true' : 'false';
  $('f-nodeLimit').value = CFG.nodeLimit ? 'true' : 'false';
  $('f-nodeLimitCount').value = CFG.nodeLimitCount || 100;
  $('f-polling').value = CFG.polling === false ? 'false' : 'true';
  onNodeLimit();
  $('f-enableVless').checked = CFG.enableVless !== false;
  $('f-enableTrojan').checked = !!CFG.enableTrojan;
  $('f-trojanPassword').value = CFG.trojanPassword || '';
  $('f-enableXhttp').checked = !!CFG.enableXhttp;
  $('f-proxyIP').value = CFG.proxyIP || '';
  $('f-outboundProxy').value = CFG.outboundProxy || '';
  $('f-outboundMode').value = CFG.outboundMode || '';
  var o = CFG.optimizer || {};
  $('o-source').value = o.source || 'wetest_v4';
  $('o-sourceURL').value = o.sourceURL || '';
  fillPort(String(o.port || 443));
  $('o-threads').value = o.threads || 5;
  $('o-count').value = o.count || 20;
  $('o-fillCount').value = (o.fillCount == null ? 0 : o.fillCount);
  $('o-useCidr').checked = o.useCidr !== false;
  $('o-subMode').value = o.subMode || '';
  $('o-subIncludeDefault').value = (o.subIncludeDefault ? '1' : '0');
  $('o-subRandomCount').value = o.subRandomCount == null ? 16 : o.subRandomCount;
  onSubMode();
  $('o-customWrap').style.display = ($('o-source').value === 'custom') ? '' : 'none';
  var fl = CFG.filter || {};
  $('fl-region').value = fl.region || 'all';
  var ipType = fl.ipType || ['IPv4', 'IPv6'];
  $('fl-ipv4').checked = ipType.indexOf('IPv4') >= 0;
  $('fl-ipv6').checked = ipType.indexOf('IPv6') >= 0;
  var isp = fl.isp || ['移动', '联通', '电信'];
  $('fl-isp-mobile').checked = isp.indexOf('移动') >= 0;
  $('fl-isp-unicom').checked = isp.indexOf('联通') >= 0;
  $('fl-isp-telecom').checked = isp.indexOf('电信') >= 0;
}
function onSubMode(){
  var m = $('o-subMode') ? $('o-subMode').value : '';
  $('sm-custom').style.display = (m === 'custom') ? '' : 'none';
  $('sm-random').style.display = (m === 'random') ? '' : 'none';
}
function fillPort(pv){
  pv = String(pv == null ? 443 : pv);
  var sel = $('o-portSel');
  var found = Array.prototype.some.call(sel.options, function(o){ return o.value === pv; });
  if (found) {
    sel.value = pv;
    $('o-portCustom').style.display = 'none';
  } else {
    sel.value = 'custom';
    $('o-portCustom').value = pv;
    $('o-portCustom').style.display = '';
  }
}
function parseIps(t){
  var out = [];
  String(t || '').split(/[\n,;]+/).map(function(s){ return s.trim(); }).filter(Boolean).forEach(function(s){
    var name = '';
    if(s.indexOf('#') >= 0){ var a = s.split('#'); s = a[0]; name = a[1]; }
    var m;
    if((m = s.match(/^\[([0-9a-fA-F:]+)\](?::(\d+))?$/))){ out.push({ ip: m[1], port: parseInt(m[2]) || 443, name: name }); return; }
    if((m = s.match(/^(\d+\.\d+\.\d+\.\d+)(?::(\d+))?$/))){ out.push({ ip: m[1], port: parseInt(m[2]) || 443, name: name }); }
  });
  return out;
}
function collectForm(){
  if(!CFG) return null;
  return {
    uuid: $('f-uuid').value.trim(),
    path: $('f-path').value.trim() || $('f-uuid').value.trim(),
    admin: $('f-admin').value,
    host: $('f-host').value.trim(),
    alpn: $('f-alpn').value,
    ech: $('f-ech').value === 'true',
    echHost: $('f-echHost').value.trim() || 'cloudflare-ech.com',
    echDns: $('f-echDns').value.trim(),
    tlsOnly: $('f-tlsOnly').value === 'true',
    nodeLimit: $('f-nodeLimit').value === 'true',
    nodeLimitCount: parseInt($('f-nodeLimitCount').value) || 100,
    polling: $('f-polling').value !== 'false',
    enableVless: $('f-enableVless').checked,
    enableTrojan: $('f-enableTrojan').checked,
    trojanPassword: $('f-trojanPassword').value,
    enableXhttp: $('f-enableXhttp').checked,
    proxyIP: $('f-proxyIP').value.trim(),
    outboundProxy: $('f-outboundProxy').value.trim(),
    outboundMode: $('f-outboundMode').value,
    preferredDomains: (function(){
      var d = [];
      String($('f-preferred').value).split(/[\n,;]+/).map(function(s){ return s.trim(); }).filter(Boolean).forEach(function(s){ if (!parseIps(s).length) d.push(s); });
      return d.join('\n');
    })(),
    preferredIPs: (function(){
      var a = [], seen = {};
      String($('f-preferred').value).split(/[\n,;]+/).map(function(s){ return s.trim(); }).filter(Boolean).forEach(function(s){ var p = parseIps(s); if (p.length) { var k = p[0].ip + ':' + (p[0].port || 443); if (seen[k]) return; seen[k] = 1; a.push(p[0]); } });
      return a;
    })(),
    optimizer: {
      source: $('o-source').value,
      sourceURL: $('o-sourceURL').value.trim(),
      port: (function(){
        var p = $('o-portSel').value;
        if (p === 'custom') p = $('o-portCustom').value;
        return parseInt(p) || 443;
      })(),
      threads: parseInt($('o-threads').value) || 5,
      count: parseInt($('o-count').value) || 20,
      fillCount: parseInt($('o-fillCount').value) || 0,
      useCidr: $('o-useCidr').checked,
      subMode: $('o-subMode').value,
      subRandomCount: parseInt($('o-subRandomCount').value) || 16,
      subIncludeDefault: $('o-subIncludeDefault').value === '1'
    },
    filter: {
      region: $('fl-region').value,
      ipType: (function(){ var a = []; if ($('fl-ipv4').checked) a.push('IPv4'); if ($('fl-ipv6').checked) a.push('IPv6'); return a; })(),
      isp: (function(){ var a = []; if ($('fl-isp-mobile').checked) a.push('移动'); if ($('fl-isp-unicom').checked) a.push('联通'); if ($('fl-isp-telecom').checked) a.push('电信'); return a; })()
    }
  };
}
function saveAll(){
  if(!CFG){ toast('配置尚未加载', 'err'); return; }
  var body = collectForm();
  $('saveBtn').disabled = true;
  api('config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    .then(function(r){
      if(r && r.ok){ CFG = r.data; renderPreferred(); renderHeader(); $('saveBtn').classList.remove('dirty'); toast('已保存并生效', 'ok'); }
      else toast((r && r.msg) || '保存失败', 'err');
    })
    .catch(function(){ toast('保存失败：无法连接服务器', 'err'); })
    .then(function(){ $('saveBtn').disabled = false; });
}
// 重置：清空 KV 中全部数据（面板配置 + 已下发节点记录），面板还原为最开始的部署状态
function resetAll(){
  if(!confirm('确定重置？将清空 KV 中全部面板配置与节点记录，面板还原为最开始的部署状态。此操作不可恢复！')) return;
  var btn = $('resetBtn');
  btn.disabled = true;
  api('reset', { method: 'POST' })
    .then(function(r){
      if(r && r.ok){ toast(r.msg || '已重置', 'ok'); setTimeout(function(){ location.reload(); }, 900); }
      else toast((r && r.msg) || '重置失败', 'err');
    })
    .catch(function(){ toast('重置失败：无法连接服务器', 'err'); })
    .then(function(){ btn.disabled = false; });
}
function renderPreferred(){
  if(!CFG) return;
  var lines = [];
  var dom = String(CFG.preferredDomains || '').split(/[\n,;]+/).map(function(s){ return s.trim(); }).filter(Boolean);
  lines = lines.concat(dom);
  (CFG.preferredIPs || []).forEach(function(x){
    lines.push((String(x.ip).indexOf(':') >= 0 ? '[' + x.ip + ']' : x.ip) + ':' + (x.port || 443) + (x.name ? ('#' + x.name) : ''));
  });
  $('f-preferred').value = lines.join('\n');
}

// ---- 优选器 ----
var LAST = [];
// 本地（浏览器）→ 目标 IP 的延迟探测：HTTPS 端口用 https，HTTP 端口用 http（被混合内容阻止时回退 https）
function pingIp(ip, port, timeout){
  var t0 = Date.now();
  var addr = ip.indexOf(':') >= 0 ? '[' + ip + ']' : ip;
  var proto = (port === 80 || port === 8080 || port === 8880 || port === 2052 || port === 2082 || port === 2086 || port === 2095) ? 'http' : 'https';
  var ctrl = new AbortController();
  var timer = setTimeout(function(){ ctrl.abort(); }, timeout);
  return fetch(proto + '://' + addr + ':' + port + '/', { mode: 'no-cors', cache: 'no-store', redirect: 'manual', signal: ctrl.signal })
    .then(function(){ clearTimeout(timer); return { ok: true, latency: Date.now() - t0 }; })
    .catch(function(){
      clearTimeout(timer);
      var ms = Date.now() - t0;
      if (proto === 'http' && ms < 100) return pingHttps(ip, port, timeout);   // https 面板下 http 被混合内容阻止，回退 https 探测
      return { ok: ms < timeout, latency: ms };
    });
}
function pingHttps(ip, port, timeout){
  var t0 = Date.now();
  var addr = ip.indexOf(':') >= 0 ? '[' + ip + ']' : ip;
  var ctrl = new AbortController();
  var timer = setTimeout(function(){ ctrl.abort(); }, timeout);
  return fetch('https://' + addr + ':' + port + '/', { mode: 'no-cors', cache: 'no-store', redirect: 'manual', signal: ctrl.signal })
    .then(function(){ clearTimeout(timer); return { ok: true, latency: Date.now() - t0 }; })
    .catch(function(){ clearTimeout(timer); var ms = Date.now() - t0; return { ok: ms < timeout, latency: ms }; });
}
function localTest(cands, threads, timeout){
  var results = [], idx = 0, pending = 0;
  return new Promise(function(resolve){
    function next(){
      while (pending < threads && idx < cands.length) {
        var c = cands[idx++]; pending++;
        pingIp(c.ip, c.port, timeout).then(function(r){
          pending--; results.push({ ip: c.ip, port: c.port, ok: r.ok, latency: r.latency });
          if (results.length === cands.length) resolve(results);
          else next();
        });
      }
    }
    next();
  });
}
function runPick(){
  var o = collectForm().optimizer;
  showMsg('oMsg', '正在拉取候选 IP…', 'info');
  api('candidates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(o) })
    .then(function(r){
      if(!r || !r.ok){ showMsg('oMsg', (r && r.msg) || '拉取失败', 'err'); return; }
      var cands = r.data || [];
      if(!cands.length){ showMsg('oMsg', (r && r.msg) || '没有可测的 IP，请换一个数据源', 'err'); return; }
      var st = r.stats || {};
      var parts = [];
      if (st.preset) parts.push('预设源 ' + st.preset + ' 条');
      if (st.presetErr) parts.push('预设源失败(' + st.presetErr + ')');
      if (st.custom) parts.push('自定义源 ' + st.custom + ' 条');
      if (st.customErr) parts.push('自定义源失败(' + st.customErr + ')');
      if (st.cidr) parts.push('CF补足 ' + st.cidr + ' 条');
      showMsg('oMsg', '拉取 ' + cands.length + ' 条（' + (parts.join('，') || '无') + '），本地测速中…', 'info');
      localTest(cands, o.threads || 5, 3000).then(function(results){
        results.sort(function(a,b){ return (a.latency < 0 ? 1e9 : a.latency) - (b.latency < 0 ? 1e9 : b.latency); });
        renderResults(results);
        var okc = results.filter(function(x){ return x.ok; }).length;
        showMsg('oMsg', '测速完成：' + okc + '/' + results.length + ' 可用（本地→目标）', okc ? 'ok' : 'err');
      });
    })
    .catch(function(){ showMsg('oMsg', '拉取失败：无法连接服务器', 'err'); });
}
function renderResults(list){
  // 显示层兜底：同一 IP 只显示一条（列表已按延迟排序，保留最先=最优的一条）
  var seen = {};
  var dedup = [];
  (list || []).forEach(function(r){
    if (seen[r.ip]) return;
    seen[r.ip] = 1;
    dedup.push(r);
  });
  LAST = dedup;
  var tb = $('oTableBody');
  tb.innerHTML = '';
  LAST.forEach(function(r, i){
    var tr = document.createElement('tr');
    var ok = r.ok;
    var lag = ok ? (r.latency + 'ms') : '超时';
    var badge = '<span class="badge ' + (ok ? 'g' : 'r') + '">' + (ok ? '可用' : '超时') + '</span>';
    var btn = ok ? '<button class="btn sm primary" onclick="useIp(' + i + ')">加入优选</button>' : '';
    tr.innerHTML = '<td class="ip">' + r.ip + ':' + r.port + '</td><td>' + lag + '</td><td>' + badge + '</td><td>' + btn + '</td>';
    tb.appendChild(tr);
  });
}
function useIp(i){
  var r = LAST[i];
  if(!r) return;
  var ta = $('f-preferred');
  var line = r.ip + ':' + r.port + (r.name ? ('#' + r.name) : '');
  // 同一 IP 已在优选列表中则不再重复加入
  var exists = false;
  String(ta.value || '').split(/[\n,;]+/).forEach(function(s){
    var p = parseIps(s);
    if (p.length && p[0].ip === r.ip) exists = true;
  });
  if (exists) { toast('该 IP 已在优选列表中', 'warn'); return; }
  var s = ta.value.trim();
  ta.value = s ? (s + '\n' + line) : line;
  markDirty();
  toast('已加入优选列表，点击「保存全部」下发', 'ok');
}
function addAllBest(){
  var n = parseInt($('o-count').value) || 20;
  var seen = {};
  var list = [];
  LAST.filter(function(r){ return r.ok; }).forEach(function(r){
    if (seen[r.ip] || list.length >= n) return;
    seen[r.ip] = 1;
    list.push(r);
  });
  if(!list.length){ toast('没有可用结果', 'err'); return; }
  var arr = [];
  list.forEach(function(r, i){ arr.push(r.ip + ':' + r.port + '#优选' + (i + 1)); });
  $('f-preferred').value = arr.join('\n');
  markDirty();
  toast('已加入最快的 ' + list.length + ' 个优选 IP，点击「保存全部」下发', 'ok');
}
function fetchDomains(){
  api('domains').then(function(r){
    if(r && r.ok && r.data && r.data.length){ $('f-preferred').value = r.data.join('\n'); markDirty(); toast('已拉取优选域名', 'ok'); }
    else toast((r && r.msg) || '拉取失败', 'err');
  }).catch(function(){ toast('拉取失败：无法连接服务器', 'err'); });
}

// ---- 订阅 ----
function subUrlOf(fmt){
  var u = location.origin + APIPATH + '/sub';
  return fmt ? (u + '/' + fmt) : u;
}
function makeSub(showQR){
  var fmt = $('subFmt').value;
  var url = subUrlOf(fmt === 'auto' ? '' : fmt);
  $('subUrl').value = url;
  if(showQR) showQRCode(url);
}
function showQRCode(){
  var url = $('subUrl').value || subUrlOf('');
  var w = $('qrWrap');
  w.style.display = 'block';
  if(typeof qrcode === 'undefined'){ w.innerHTML = '<div class="hint">二维码库加载失败，请直接复制链接</div>'; return; }
  var q = qrcode(0, 'M');
  q.addData(url);
  q.make();
  w.innerHTML = '<div class="qrbox">' + q.createImgTag(4, 10) + '</div>';
}
function downloadSub(){
  var fmt = $('subFmt').value;
  var a = document.createElement('a');
  a.href = subUrlOf(fmt === 'auto' ? '' : fmt);
  a.download = 'cfnext-sub.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// 日间/夜间模式切换
function toggleTheme() {
  var cur = document.documentElement.getAttribute('data-theme') || 'dark';
  var next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('cfnext_theme', next); } catch(e) {}
  document.getElementById('themeBtn').textContent = next === 'dark' ? '🌙' : '☀';
}
(function() {
  var t = 'dark';
  try { t = localStorage.getItem('cfnext_theme') || 'dark'; } catch(e) {}
  if (t === 'light') { document.documentElement.setAttribute('data-theme', 'light'); }
  setTimeout(function() { var b = document.getElementById('themeBtn'); if(b) b.textContent = t === 'dark' ? '🌙' : '☀'; }, 0);
})();

loadAll();
</script>
</body>
</html>`;function vt(t){return(t||"").toLowerCase().includes("mozilla")}let bt="";async function yt(t,e){if(!e.admin)return!0;const n=function(t,e){const n=(t.headers.get("Cookie")||"").match(new RegExp("(?:^|;\\s*)"+e+"=([^;]+)"));return n?decodeURIComponent(n[1]):""}(t,"luma_auth");if(!n)return!1;const o=await async function(t){if(!t.K||"function"!=typeof t.K.get)return"";try{return await t.K.get("luma_token")||""}catch(t){return""}}(e.__env)||bt;if(!o)return!1;let r=0;const a=n,s=o,i=Math.max(a.length,s.length);for(let t=0;t<i;t++)r|=(a.charCodeAt(t)||0)^(s.charCodeAt(t)||0);return 0===r&&a.length===s.length}async function It(t,n){const o=new URL(t.url),r=t.headers.get("User-Agent")||"",a=(t.headers.get("Upgrade")||"").toLowerCase();if("http:"===o.protocol)return Response.redirect(o.href.replace("http://","https://"),301);const s=await U(n),i=s.path||s.uuid,l=o.pathname.replace(/^\/+|\/+$/g,"").split("/");if("version"===l[0])return A({version:e});if("login"===l[0]){if("POST"===t.method){const e=await t.text(),o=new URLSearchParams(e);if(o.get("password")===s.admin){const t=v()+v();return await async function(t,e){if(t.K&&"function"==typeof t.K.put)try{await t.K.put("luma_token",e)}catch(t){}}(n,t),bt=t,new Response(JSON.stringify({ok:!0,next:o.get("next")||"/"}),{status:200,headers:{"Content-Type":"application/json; charset=utf-8","Set-Cookie":`luma_auth=${encodeURIComponent(t)}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`}})}return A({ok:!1,msg:"密码错误"},403)}return s.admin?new Response("<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>CFNext · 登录</title>\n<style>\nbody{background:#0d1117;color:#e6edf3;font-family:\"PingFang SC\",\"Microsoft YaHei\",system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}\n.box{background:#161b22;border:1px solid #2d333b;border-radius:12px;padding:28px;width:320px}\nh1{font-size:18px;margin-bottom:6px}\np{color:#8b949e;font-size:13px;margin:0 0 18px}\ninput{width:100%;background:#1c2230;border:1px solid #2d333b;color:#e6edf3;border-radius:8px;padding:10px 12px;font-size:14px;outline:none;box-sizing:border-box;margin-bottom:12px}\ninput:focus{border-color:#4f9dff}\nbutton{width:100%;background:#4f9dff;border:none;color:#fff;border-radius:8px;padding:10px;font-size:14px;font-weight:600;cursor:pointer}\n.msg{color:#f85149;font-size:13px;margin-bottom:10px;display:none}\n</style>\n</head>\n<body>\n<div class=\"box\">\n  <h1>CFNext</h1>\n  <p>请输入管理密码</p>\n  <div class=\"msg\" id=\"msg\">密码错误</div>\n  <form id=\"form\">\n    <input type=\"password\" id=\"pwd\" placeholder=\"管理密码\" autofocus>\n    <button type=\"submit\">登录</button>\n  </form>\n</div>\n<script>\nvar next = new URLSearchParams(location.search).get('next') || '/';\ndocument.getElementById('form').addEventListener('submit', function(e){\n  e.preventDefault();\n  var pwd = document.getElementById('pwd').value;\n  fetch('/login', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'password=' + encodeURIComponent(pwd) + '&next=' + encodeURIComponent(next) })\n    .then(function(r){ return r.json(); })\n    .then(function(r){\n      if(r && r.ok){ location.href = r.next || '/'; }\n      else { document.getElementById('msg').style.display = 'block'; }\n    })\n    .catch(function(){ document.getElementById('msg').textContent = '网络错误'; document.getElementById('msg').style.display = 'block'; });\n});\n<\/script>\n</body>\n</html>",{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}}):Response.redirect(new URL("/"+i,t.url).href,302)}const c=l[0]===i;if(""===l[0]&&vt(r))return Response.redirect(new URL("/"+i,t.url).href,302);if(c&&1===l.length){if("websocket"===a)return B(t,s);if("POST"===t.method&&s.enableXhttp)try{return await async function(t,e){const n=t.body.getReader(),o=await n.read();if(o.done)return new Response("empty",{status:400});const r=O(o.value),a=await X(r,e,t.cf&&t.cf.colo,!0),s=a.writable.getWriter();await s.write(o.value.subarray(r.headerLength)),(async()=>{try{for(;;){const{done:t,value:e}=await n.read();if(t)break;await s.write(e)}}catch(t){}try{await s.close()}catch(t){}})();const i=new ReadableStream({async start(t){t.enqueue(new Uint8Array([0,0]));const e=a.readable.getReader();try{for(;;){const{done:n,value:o}=await e.read();if(n)break;t.enqueue(o)}}catch(t){}try{t.close()}catch(t){}try{a.close()}catch(t){}},cancel(){try{a.close()}catch(t){}}});return new Response(i,{status:200,headers:{"content-type":"application/octet-stream","x-accel-buffering":"no","cache-control":"no-store"}})}(t,s)}catch(t){return A({ok:!1,msg:"xhttp 代理错误: "+(t.message||t)},500)}}if(c&&("sub"===l[1]||1===l.length&&!vt(r)&&!r.startsWith("luma"))){const e=l.length>=3?l[2]:"";try{let o=null;if(!1!==s.polling&&n.K&&"function"==typeof n.K.get)try{const t=await n.K.get("issued");if(t){const e=JSON.parse(t);Array.isArray(e.ips)&&e.ips.length&&(o=new Set(e.ips))}}catch(t){}const a=await mt(o?Object.assign({},s,{_skipIssued:o}):s,t.url,e,r,t.cf&&t.cf.colo);if(!1!==s.polling&&n.K&&"function"==typeof n.K.put&&a.issued&&a.issued.length){const t=o?Array.from(o):[],e=[...new Set([...a.issued,...t])].slice(0,200),r=JSON.stringify({t:Date.now(),ips:e});n._ctx&&"function"==typeof n._ctx.waitUntil?n._ctx.waitUntil(n.K.put("issued",r).catch(()=>{})):await n.K.put("issued",r).catch(()=>{})}return new Response(a.body,{status:200,headers:{"Content-Type":a.type+"; charset=utf-8","Cache-Control":"no-store","Content-Disposition":"attachment; filename*=utf-8''CFNext"}})}catch(t){return new Response("订阅生成失败: "+(t&&t.message||t),{status:500,headers:{"Content-Type":"text/plain; charset=utf-8"}})}}if(c&&1===l.length&&vt(r))return await yt(t,s)?new Response(gt,{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}}):Response.redirect(new URL("/login?next="+encodeURIComponent("/"+i),t.url).href,302);if(c&&"api"===l[1]){const a=l[2]||"";if(!await yt(t,s))return A({ok:!1,status:403,msg:"未授权（需要管理密码）"},403);if("config"===a){if("GET"===t.method)return A({ok:!0,data:Object.assign(R(s),{version:e})});if("POST"===t.method)try{const o=await t.json(),r=Object.assign(JSON.parse(JSON.stringify(s)),o);o.optimizer&&"object"==typeof o.optimizer&&(r.optimizer=Object.assign(r.optimizer,o.optimizer)),o.preferredIPs&&Array.isArray(o.preferredIPs)&&(r.preferredIPs=o.preferredIPs),delete r.hasAdmin,"***"===r.admin&&(r.admin=s.admin),"***"===r.trojanPassword&&(r.trojanPassword=s.trojanPassword),r.outboundProxy&&/\/\/\*{3}@/.test(r.outboundProxy)&&(r.outboundProxy=s.outboundProxy),await L(n,r);const a=await U(n,t.url);return A({ok:!0,data:Object.assign(R(a),{version:e}),msg:"已保存并生效"})}catch(t){return A({ok:!1,msg:"保存失败: "+(t.message||t)},500)}}if("reset"===a){if("POST"!==t.method)return A({ok:!1,msg:"仅支持 POST"},405);try{if(!n.K||"function"!=typeof n.K.delete)return A({ok:!1,msg:"未绑定 KV 命名空间，无需重置"},400);await n.K.delete("config"),await n.K.delete("issued");try{await n.K.delete("luma_token")}catch(t){}return bt="",A({ok:!0,msg:"已重置：KV 已清空，面板还原为初始部署状态"})}catch(t){return A({ok:!1,msg:"重置失败: "+(t.message||t)},500)}}if("status"===a)return A({ok:!0,data:{version:e,host:o.hostname,path:i,region:t.cf&&t.cf.colo||"unknown"}});if("sub"===a){const e=o.searchParams.get("fmt")||"";try{const n=await mt(s,t.url,e,r,t.cf&&t.cf.colo);return A({ok:!0,type:n.type,body:n.body})}catch(t){return A({ok:!1,msg:"订阅生成失败: "+(t.message||t)},500)}}if("candidates"===a){if("POST"!==t.method)return A({ok:!1,msg:"仅支持 POST"},405);try{const e=await t.json().catch(()=>({})),n=await q(Object.assign({},s.optimizer,e));if(!n.candidates.length){const t=n.stats||{},e=[t.presetErr&&"预设源: "+t.presetErr,t.customErr&&"自定义源: "+t.customErr].filter(Boolean).join("；");return A({ok:!1,msg:"没有可测的 IP"+(e?"（"+e+"）":"，请换一个数据源")},400)}return A({ok:!0,data:n.candidates,stats:n.stats})}catch(t){return A({ok:!1,msg:"拉取失败: "+(t.message||t)},500)}}if("domains"===a)try{const t=h[o.searchParams.get("source")||"wetest_cname"]||h.wetest_cname,e=await fetch(t.url,{headers:{"User-Agent":"Mozilla/5.0"}});if(!e.ok)return A({ok:!1,msg:"拉取失败 HTTP "+e.status});return A({ok:!0,data:function(t){const e=new Set,n=[],o=/(?:\*\.)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}/gi;let r;for(;r=o.exec(t);){const t=r[0].toLowerCase();!e.has(t)&&(t.includes("cloudflare")||t.includes("bestcf")||t.includes("182682")||t.includes("090227")||t.endsWith(".xyz")||t.endsWith(".top"))&&(e.add(t),n.push(t))}return n.slice(0,10)}(await e.text())})}catch(t){return A({ok:!1,msg:"拉取失败: "+(t.message||t)},500)}return A({ok:!1,msg:"未知 API: "+a},404)}return new Response("Not Found",{status:404})}async function Pt(t,e,n){const o=String(e.BESTIP_AUTO||"").toLowerCase();if("1"===o||"true"===o)try{const t=await U(e),n=(await q(t.optimizer)).candidates||[];if(!n.length)return;const o=await async function(t,e,n){e=Math.max(1,Math.min(50,Number(e)||5)),n=Math.max(500,Number(n)||5e3);const o=[];let r=0;return await Promise.all(Array.from({length:e},async function(){for(;r<t.length;){const e=t[r++],a=await V(e.ip,e.port,n);o.push(a)}})),o.sort((t,e)=>(t.latency<0?1e9:t.latency)-(e.latency<0?1e9:e.latency)),o}(n,t.optimizer.threads||5,5e3),r=o.filter(t=>t.ok).slice(0,t.optimizer.count||20);if(!r.length)return;t.preferredIPs=r.map(t=>({ip:t.ip,port:t.port||443,name:""})),await L(e,t)}catch(t){}}export default{fetch:async(t,e,n)=>It(t,Object.assign({},e,{_ctx:n})),scheduled:async(t,e,n)=>Pt(0,e)};
import{_ as s,o as n,c as e,a2 as p}from"./chunks/framework.vLhlLNVn.js";const u=JSON.parse('{"title":"⚡ 私有协议智能逆向解析","description":"","frontmatter":{},"headers":[],"relativePath":"ai/protocol-reverse.md","filePath":"ai/protocol-reverse.md"}'),l={name:"ai/protocol-reverse.md"};function t(i,a,o,c,r,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="⚡-私有协议智能逆向解析" tabindex="-1">⚡ 私有协议智能逆向解析 <a class="header-anchor" href="#⚡-私有协议智能逆向解析" aria-label="Permalink to &quot;⚡ 私有协议智能逆向解析&quot;">​</a></h1><p>中小企业进行老旧设备接入时，最痛苦的莫过于面对非标协议。手动编写 Netty 编解码器不仅耗时长，而且 CRC 校验算法稍有差错便会导致整帧解析失败。</p><hr><h2 id="智能逆向工作流" tabindex="-1">智能逆向工作流 <a class="header-anchor" href="#智能逆向工作流" aria-label="Permalink to &quot;智能逆向工作流&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │ 1. 输入阶段                                            │</span></span>
<span class="line"><span> │    工程师粘贴抓包报文 (十六进制) 或上传 PDF/MD 通信协议手册 │</span></span>
<span class="line"><span> └───────────────────────────┬────────────────────────────┘</span></span>
<span class="line"><span>                             │</span></span>
<span class="line"><span>                             ▼</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │ 2. AI 推理阶段                                         │</span></span>
<span class="line"><span> │    · 识别帧头 (Header) 与帧尾 (Tail)                    │</span></span>
<span class="line"><span> │    · 识别从站地址域、功能码、长度域                     │</span></span>
<span class="line"><span> │    · 逆向推导校验和算法 (CRC16-Modbus, LRC, CheckSum8)  │</span></span>
<span class="line"><span> │    · 映射物理属性点位 (温度、电压、开关状态)            │</span></span>
<span class="line"><span> └───────────────────────────┬────────────────────────────┘</span></span>
<span class="line"><span>                             │</span></span>
<span class="line"><span>                             ▼</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │ 3. 代码生成阶段                                        │</span></span>
<span class="line"><span> │    · 生成符合 yudao-module-iot-gateway 标准的 Java 类   │</span></span>
<span class="line"><span> │    · 继承自 AbstractProtocolDecoder / AbstractEncoder   │</span></span>
<span class="line"><span> │    · 自动生成完整的 JUnit 5 单元测试用例                │</span></span>
<span class="line"><span> └────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="样例-从原始报文到生产代码" tabindex="-1">样例：从原始报文到生产代码 <a class="header-anchor" href="#样例-从原始报文到生产代码" aria-label="Permalink to &quot;样例：从原始报文到生产代码&quot;">​</a></h2><p><strong>输入原始抓包</strong>：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>AA 55 01 03 04 01 2C 00 FA D2 4B</span></span></code></pre></div><p><strong>AI 逆向分析结果</strong>：</p><ul><li><code>AA 55</code>：双字节定长帧头；</li><li><code>01</code>：设备站号 (Device ID = 1)；</li><li><code>03</code>：查询保持寄存器命令；</li><li><code>04</code>：后续数据载荷长度为 4 字节；</li><li><code>01 2C</code>：寄存器 1 数值（十进制 300，对应温度 30.0℃，缩放系数 0.1）；</li><li><code>00 FA</code>：寄存器 2 数值（十进制 250，对应压力 2.50 MPa，缩放系数 0.01）；</li><li><code>D2 4B</code>：CRC16/MODBUS 循环冗余校验码。</li></ul><p>系统直接输出可直接编译执行的 Netty Decoder Java 代码，并附带通过断言验证的单元测试，将设备调试接入周期从两周压缩至半小时以内。</p>`,12)])])}const _=s(l,[["render",t]]);export{u as __pageData,_ as default};

import{_ as n,o as a,c as p,a4 as e}from"./chunks/framework.BAT2SzCK.js";const u=JSON.parse('{"title":"📋 PMS 物联网工程项目交付","description":"","frontmatter":{},"headers":[],"relativePath":"synergy/pms.md","filePath":"synergy/pms.md","lastUpdated":1794271174000}'),l={name:"synergy/pms.md"};function r(i,s,c,t,b,o){return a(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="📋-pms-物联网工程项目交付" tabindex="-1">📋 PMS 物联网工程项目交付 <a class="header-anchor" href="#📋-pms-物联网工程项目交付" aria-label="Permalink to &quot;📋 PMS 物联网工程项目交付&quot;">​</a></h1><p><code>yudao-module-pms</code> 是 MzMedia 面向中小企业工程交付与施工团队打造的项目全生命周期管理系统。</p><hr><h2 id="_1-工程项目交付五步法" tabindex="-1">1. 工程项目交付五步法 <a class="header-anchor" href="#_1-工程项目交付五步法" aria-label="Permalink to &quot;1. 工程项目交付五步法&quot;">​</a></h2><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │ 1. 立项与交付节点规划                                  │</span></span>
<span class="line"><span> │    建立工程项目、配置勘测、布线、通网、终验等关键里程碑│</span></span>
<span class="line"><span> └───────────────────────────┬────────────────────────────┘</span></span>
<span class="line"><span>                             │</span></span>
<span class="line"><span>                             ▼</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │ 2. 物料预占与设备出库 (联动 WMS)                       │</span></span>
<span class="line"><span> │    项目 BOM 物料清单审核通过后，自动锁定仓库传感器库存  │</span></span>
<span class="line"><span> └───────────────────────────┬────────────────────────────┘</span></span>
<span class="line"><span>                             │</span></span>
<span class="line"><span>                             ▼</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │ 3. 设备通电入网与绑定 (联动 IoT)                       │</span></span>
<span class="line"><span> │    施工人员上电，网关通过激活密钥自动注册并归属到项目树 │</span></span>
<span class="line"><span> └───────────────────────────┬────────────────────────────┘</span></span>
<span class="line"><span>                             │</span></span>
<span class="line"><span>                             ▼</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │ 4. 敏捷工作项协同与缺陷排查                           │</span></span>
<span class="line"><span> │    现场布线任务看板、施工拍照打卡、设备通信掉线 Bug 追踪 │</span></span>
<span class="line"><span> └───────────────────────────┬────────────────────────────┘</span></span>
<span class="line"><span>                             │</span></span>
<span class="line"><span>                             ▼</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │ 5. 竣工验收与知识资产归档 (沉淀至 KB)                  │</span></span>
<span class="line"><span> │    CAD 图纸、接线端子拓扑、验收单据在线归档，转为运维期 │</span></span>
<span class="line"><span> └────────────────────────────────────────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><hr><h2 id="_2-敏捷任务看板与企业知识库-kb" tabindex="-1">2. 敏捷任务看板与企业知识库 (KB) <a class="header-anchor" href="#_2-敏捷任务看板与企业知识库-kb" aria-label="Permalink to &quot;2. 敏捷任务看板与企业知识库 (KB)&quot;">​</a></h2><ul><li><strong>工作项三级分类</strong>：支持<strong>需求 (Requirement)</strong>、<strong>任务 (Task)</strong> 与 <strong>缺陷 (Bug)</strong> 独立状态流转；</li><li><strong>交付进度大屏</strong>：直观展示每个工程站点的设备入网率、在线率、施工工时消耗与人员饱和度；</li><li><strong>工程知识库 (KB)</strong>：多层级目录归档施工布线规范、PLC 点位对照表与设备现场勘测照片，支持权限隔离与外部分享。</li></ul>`,8)])])}const d=n(l,[["render",r]]);export{u as __pageData,d as default};

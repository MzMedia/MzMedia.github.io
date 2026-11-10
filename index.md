---
layout: home

hero:
  name: "MzMedia"
  text: "企业级 AI 驱动物联网与视频融合平台"
  tagline: "专为中小企业量身打造：抹平工控与音视频协议差异，打破系统烟囱，AI 赋能低成本全生命周期智能运维"
  image:
    src: /img/logo.png
    alt: MzMedia Logo
  actions:
    - theme: brand
      text: 快速上手 →
      link: /guide/quick-start
    - theme: alt
      text: 💼 落地案例
      link: /cases/overview
    - theme: alt
      text: 系统总体架构
      link: /guide/architecture
    - theme: alt
      text: 视频中心
      link: /media/overview
    - theme: alt
      text: Gitee 仓库
      link: https://gitee.com/mzmedia/mz-media.git

features:
  - icon: 📹
    title: GB/T 28181 安防流媒体中枢
    details: 深度整合 ZLMediaKit 与 JAIN SIP 栈，提供 WebRTC / FLV 低延迟直播点播、云台 PTZ 控制、0x81 预置位联动、双向语音对讲与云端录像。
  - icon: 📡
    title: 13+ 种工业物联网协议
    details: 内置 MQTT (EMQX 5.0)、Modbus TCP/RTU、CoAP、自定义 TCP/UDP 及 WebSocket 网关，支持统一 TSL 物模型与双核心规则引擎。
  - icon: 🤖
    title: Spring AI 与 MCP 智能体
    details: 集成 Spring AI 1.1+ 与 Anthropic MCP 协议，支持时序数据运维 RAG 智能诊断、自然语言控制下发与非标私有协议逆向 Netty 解码器生成。
  - icon: 🏭
    title: 工业产供销与工程协同
    details: PMS 物联网交付全流程、MES 车间运维与告警工单闭环、WMS 备品备件库存预占与先进先出、GoView 拖拽式大屏与积木报表。
  - icon: 📊
    title: TDengine 海量时序存储
    details: 针对物联网遥测与传感器高频数据设计超级表结构，列式超高压缩节约 80% 存储成本，毫秒级响应海量历史聚合查询。
  - icon: 🛡️
    title: 成熟企业级安全底座
    details: 基于 RuoYi-Vue-Pro 深度孵化，适配 Java 21 / Spring Boot 3.5 & 4.1，提供 SaaS 多租户隔离、RBAC 细粒度权限与 Flowable 流程引擎。
---

<div style="margin-top: 56px; text-align: center;">
  <h2 style="font-size: 28px; font-weight: 700; border: none; margin-bottom: 8px;">💼 典型 AIoT 落地场景与实战案例</h2>
  <p style="color: var(--vp-c-text-2); max-width: 680px; margin: 0 auto 32px; font-size: 15px;">
    经过中小企业实际工业生产与安防现场严苛验证，实现“声光电像智”全面协同
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; max-width: 1152px; margin: 0 auto 56px; padding: 0 24px;">

<div style="border: 1px solid var(--vp-c-border); border-radius: 12px; padding: 24px; background: var(--vp-c-bg-soft); display: flex; flex-direction: column; justify-content: space-between;">
  <div>
    <div style="font-size: 28px; margin-bottom: 12px;">📹</div>
    <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 8px;"><a href="/cases/video-linkage" style="text-decoration: none; color: inherit;">视频与传感器深度联动</a></h3>
    <p style="font-size: 14px; color: var(--vp-c-text-2); line-height: 1.6; margin: 0;">
      母排温度或烟雾超限瞬间，毫秒级驱动 4K 球机转向故障预置位（0x81），自动云端切片录像与多模态 AI 视觉复核，实况秒显大屏。
    </p>
  </div>
  <div style="margin-top: 16px;">
    <a href="/cases/video-linkage" style="font-size: 13px; font-weight: 600; color: var(--vp-c-brand-1); text-decoration: none;">查看完整方案与代码 →</a>
  </div>
</div>

<div style="border: 1px solid var(--vp-c-border); border-radius: 12px; padding: 24px; background: var(--vp-c-bg-soft); display: flex; flex-direction: column; justify-content: space-between;">
  <div>
    <div style="font-size: 28px; margin-bottom: 12px;">🏭</div>
    <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 8px;"><a href="/cases/industrial" style="text-decoration: none; color: inherit;">工业应用与预测性维护</a></h3>
    <p style="font-size: 14px; color: var(--vp-c-text-2); line-height: 1.6; margin: 0;">
      机床与电机 Modbus 振动峭度与温升采集，TDengine 高频列存，Spring AI RAG 诊断磨损，自动锁定 WMS 备件并派发 MES 工单。
    </p>
  </div>
  <div style="margin-top: 16px;">
    <a href="/cases/industrial" style="font-size: 13px; font-weight: 600; color: var(--vp-c-brand-1); text-decoration: none;">查看完整方案与代码 →</a>
  </div>
</div>

<div style="border: 1px solid var(--vp-c-border); border-radius: 12px; padding: 24px; background: var(--vp-c-bg-soft); display: flex; flex-direction: column; justify-content: space-between;">
  <div>
    <div style="font-size: 28px; margin-bottom: 12px;">🛡️</div>
    <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 8px;"><a href="/cases/security" style="text-decoration: none; color: inherit;">智能安防与园区周界防范</a></h3>
    <p style="font-size: 14px; color: var(--vp-c-text-2); line-height: 1.6; margin: 0;">
      脉冲电子围栏触碰秒级调度球机追踪，YOLO 边缘视觉识别攀爬并过滤小动物误报，下发 Modbus 继电器驱动高音爆闪现场驱离。
    </p>
  </div>
  <div style="margin-top: 16px;">
    <a href="/cases/security" style="font-size: 13px; font-weight: 600; color: var(--vp-c-brand-1); text-decoration: none;">查看完整方案与代码 →</a>
  </div>
</div>

<div style="border: 1px solid var(--vp-c-border); border-radius: 12px; padding: 24px; background: var(--vp-c-bg-soft); display: flex; flex-direction: column; justify-content: space-between;">
  <div>
    <div style="font-size: 28px; margin-bottom: 12px;">🌱</div>
    <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 8px;"><a href="/cases/agriculture" style="text-decoration: none; color: inherit;">现代设施农业与智能微气候</a></h3>
    <p style="font-size: 14px; color: var(--vp-c-text-2); line-height: 1.6; margin: 0;">
      温室土壤水肥 EC 与空气温湿度多参组网，自动闭环启闭天窗湿帘；云台巡航抓拍，大模型早期识别草莓与番茄叶片微小病斑。
    </p>
  </div>
  <div style="margin-top: 16px;">
    <a href="/cases/agriculture" style="font-size: 13px; font-weight: 600; color: var(--vp-c-brand-1); text-decoration: none;">查看完整方案与代码 →</a>
  </div>
</div>

<div style="border: 1px solid var(--vp-c-border); border-radius: 12px; padding: 24px; background: var(--vp-c-bg-soft); display: flex; flex-direction: column; justify-content: space-between;">
  <div>
    <div style="font-size: 28px; margin-bottom: 12px;">🎓</div>
    <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 8px;"><a href="/cases/education" style="text-decoration: none; color: inherit;">数字化教育与实验室安全</a></h3>
    <p style="font-size: 14px; color: var(--vp-c-text-2); line-height: 1.6; margin: 0;">
      化学实训危化品柜 VOC 气体超限 500ms 强排风；门禁联动视觉识别白大褂与护目镜；对接教务排课下课定时切断动力电杜绝火险。
    </p>
  </div>
  <div style="margin-top: 16px;">
    <a href="/cases/education" style="font-size: 13px; font-weight: 600; color: var(--vp-c-brand-1); text-decoration: none;">查看完整方案与代码 →</a>
  </div>
</div>

<div style="border: 1px solid var(--vp-c-border); border-radius: 12px; padding: 24px; background: var(--vp-c-bg-soft); display: flex; flex-direction: column; justify-content: space-between;">
  <div>
    <div style="font-size: 28px; margin-bottom: 12px;">⚡</div>
    <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 8px;"><a href="/cases/energy-carbon" style="text-decoration: none; color: inherit;">智慧能源与微电网调度</a></h3>
    <p style="font-size: 14px; color: var(--vp-c-text-2); line-height: 1.6; margin: 0;">
      工商业储能结合分时电价与天气大模型动态削峰填谷，变压器需量越限预测与空调柔性升温，彻底规避超需量巨额罚款。
    </p>
  </div>
  <div style="margin-top: 16px;">
    <a href="/cases/energy-carbon" style="font-size: 13px; font-weight: 600; color: var(--vp-c-brand-1); text-decoration: none;">查看完整方案与代码 →</a>
  </div>
</div>

</div>

<div style="margin-top: 64px; text-align: center;">
  <h2 style="font-size: 28px; font-weight: 700; border: none; margin-bottom: 8px;">💡 平台核心对比与差异化优势</h2>
  <p style="color: var(--vp-c-text-2); max-width: 720px; margin: 0 auto 32px; font-size: 15px;">
    为什么企业数字化转型需要“物联传感器 + 安防视频 + AI Agent”的深度融合？
  </p>
</div>

| 评估维度 | 传统纯 IoT 平台 (如 ThingsBoard) | 传统视频监控平台 (如 WVP / LiteCVR) | MzMedia AIoT 融合平台 |
| :--- | :--- | :--- | :--- |
| **视频流媒体集成** | 需二次开发外挂流媒体服务 | 专注视频流，无工控数据采集 | **原生深度融合 GB/T 28181 + ZLMediaKit** |
| **工业工控协议** | 偏通用 MQTT，工业现场协议需付费扩展 | 仅支持安防协议 | **内置 13+ 工业协议（Modbus/MQTT/TSL物模型）** |
| **联动响应时效** | 无法做到跨视频预置位秒级调度 | 仅能手工查看录像回放 | **毫秒级联动（传感器告警瞬间驱动球机 0x81 转向）** |
| **AI 智能运维** | 仅传统阈值告警，无专家诊断 | 需安保人工盯屏 | **Spring AI 1.1+ & MCP 智能体自动化 RAG 诊断** |
| **时序存储成本** | 传统关系型或 Mongo 存储成本高昂 | 无传感器时序聚合能力 | **TDengine 超级表列存超高压缩（节约 80% 成本）** |
| **企业经营闭环** | 缺乏项目交付与备件协同 | 无法追踪硬件全生命周期 | **打通 PMS工程交付 + MES工单 + WMS备件库存** |

<div style="margin-top: 64px; text-align: center;">
  <h2 style="font-size: 28px; font-weight: 700; border: none; margin-bottom: 8px;">❓ 常见问题与技术问答 (FAQ)</h2>
  <p style="color: var(--vp-c-text-2); max-width: 720px; margin: 0 auto 32px; font-size: 15px;">
    快速了解 MzMedia 的核心架构、适用场景与部署方案
  </p>
</div>

::: details 什么是 MzMedia？它主要解决什么问题？
**MzMedia** 是一款专为中小企业量身打造的企业级开源 AI 驱动物联网与安防视频融合平台。它打破了传统工业控制网络（SCADA/MES）与安防视频监控系统（VMS/NVR）之间的“数据孤岛”，抹平 Modbus、MQTT、GB/T 28181、ZLMediaKit 等多协议差异，并通过 Spring AI 与 MCP（Model Context Protocol）智能体实现低成本全生命周期运维。
:::

::: details 为什么推荐将物联网传感器与 GB28181 视频监控深度融合？
在工业、园区与危化品仓库等现场，单纯看监控无法预知内部温度或压力；单纯看数字仪表又无法直观确认现场烟雾或着火点。MzMedia 实现**“声光电像智”全面协同**：当 Modbus 测温传感器超过预警阈值时，系统在毫秒内发送 GB28181 0x81 信令驱动 4K 球机转向故障预置位，并调用多模态视觉大模型双重确认，秒级将现场视频推送大屏并派发维修工单。
:::

::: details MzMedia 如何利用 Spring AI 与 MCP 协议进行智能运维？
MzMedia 作为标准的 **Anthropic MCP Server**，将云台转向控制、传感器时序指标读取、控制指令下发、MES 工单生成等抽象为标准 Tool 和 Resource。主流 AI 客户端（如 Claude、Cursor、DeepSeek、GPT）可以直接通过自然语言调度硬件与平台；结合 TDengine 时序数据与 Spring AI RAG 知识库，大模型可自动进行故障根因推导与私有协议逆向。
:::

::: details 如何快速私有化部署体验 MzMedia？
MzMedia 提供开箱即用的 Docker Compose 编排套件，只需一条命令即可快速拉起 MySQL、Redis、TDengine、EMQX、ZLMediaKit 和前后端服务。详细步骤请参考 [Docker 编排快速部署指南](/deploy/docker-compose)。
:::

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #10b981 30%, #3b82f6);
}
</style>

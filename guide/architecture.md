# 🏗️ 系统总体架构

MzMedia 采用清晰的层次化设计，覆盖感知层、边缘计算、协议接入、消息总线、业务中台到数字驾驶舱的完整端到端链路：

---

## 架构拓扑分层

```text
 ┌────────────────────────────────────────────────────────────────────────┐
 │                    应用层 (Application / Presentation)                  │
 │  · 领导全景驾驶舱    · 工业物联网大屏   · 智慧园区/农业套件   · 移动端APP/H5  │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
 ┌───────────────────────────────────▼────────────────────────────────────┐
 │                    业务中台层 (Business Service Layer)                  │
 │  · yudao-module-media: GB28181 视频监控 / PTZ 云台 / ZLMediaKit 流媒体   │
 │  · yudao-module-iot: 物联网设备全生命周期 / TSL 物模型 / 告警与 OTA      │
 │  · yudao-module-ai1-springai: Spring AI 1.1+ / MCP Agent / 时序 RAG 诊断 │
 │  · yudao-module-pms: 物联网工程交付看板 / 项目里程碑 / 敏捷任务 / 知识库 │
 │  · yudao-module-mes: 车间工单排产 / 设备保养 / 告警联动维修 / Andon 安灯 │
 │  · yudao-module-wms: 仓储库位建模 / 备品备件库存预占 / SN 扫码出入库   │
 │  · yudao-module-report: GoView 拖拽大屏设计器 / 积木报表复杂套打       │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
 ┌───────────────────────────────────▼────────────────────────────────────┐
 │                    接入与规则层 (Access & Rule Engine)                  │
 │  · 多协议网关: MQTT (EMQX) / Modbus TCP/RTU / CoAP / TCP / UDP / WS     │
 │  · 数据分发引擎: SpEL 表达式过滤 -> 9 种 Sink 输出 (TDengine / MQ / Webhook)│
 │  · 场景联动引擎: TCA 架构 (Trigger-Condition-Action) 联动安防与工单     │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
 ┌───────────────────────────────────▼────────────────────────────────────┐
 │                    存储与中间件层 (Storage & Middleware)                │
 │  · 关系型数据库: MySQL 8.0+ (业务实体, RBAC 权限, 多租户配置)          │
 │  · 高性能时序库: TDengine 3.0+ (遥测数据超级表, 列式高压缩时序存储)    │
 │  · 缓存与流式队列: Redis 7.x / Redisson (分布式锁, 会话, 内存总线)     │
 │  · 分布式消息队列: Kafka / RocketMQ / RabbitMQ (可选高吞吐通道)        │
 │  · 对象与文件存储: MinIO / 阿里云 OSS / 本地磁盘 (视频切片, 抓拍快照)   │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## 模块清单与职责全景

| 模块名称 | 源码工程目录 | 核心定位与关键职责 |
| :--- | :--- | :--- |
| **`yudao-dependencies`** | `yudao-dependencies` | 全局依赖 BOM 统一锁定版本（Spring Boot 4.1.2、JDK 21、Netty、MapStruct、JAIN-SIP 等）。 |
| **`yudao-framework`** | `yudao-framework` | 通用 Starter 基础设施：多租户自动 SQL 拦截、Redis 缓存与限流、全局异常拦截、WebSocket。 |
| **`yudao-module-media`** | `yudao-module-media` | 国标 GB/T 28181（2016/2022）SIP 协议栈、ZLMediaKit 集群对接、WebRTC 低延迟播放、云台 PTZ 控制。 |
| **`yudao-module-iot`** | `yudao-module-iot` | 13+ 种协议网关、TSL 物模型、Modbus 点位轮询调度、双核心规则引擎与 TDengine 存储驱动。 |
| **`yudao-module-ai1-springai`** | `yudao-module-ai1-springai` | Spring AI 1.1+ 框架集成、官方 Java MCP 客户端管理、时序数据 RAG 诊断排查、私有协议逆向解析。 |
| **`yudao-module-pms`** | `yudao-module-pms` | 物联网工程交付管理：勘测、安装、通电、入网、验收节点看板、工作项协同与工程图纸知识库。 |
| **`yudao-module-mes`** | `yudao-module-mes` | 智能制造执行：生产日历排程、工位 SOP 指导、设备资产台账、IoT 报警联动维修单、Andon 安灯呼叫。 |
| **`yudao-module-wms`** | `yudao-module-wms` | 智能仓储管理：多仓库/库区/库位三级结构、备品备件库存预占、传感器单品条码追踪、先进先出 FIFO。 |
| **`yudao-module-report`** | `yudao-module-report` | 开箱集成 GoView 拖拽式大屏设计器与积木报表（JimuReport），支持嵌入 WebRTC 视频与 TDengine 曲线。 |
| **`yudao-module-system`** | `yudao-module-system` | 基础权限与系统底座：SaaS 多租户数据强隔离、RBAC 细粒度权限控制、OAuth2.0 与统一认证。 |
| **`yudao-module-infra`** | `yudao-module-infra` | 基础设施支持：低代码生成器（Codegen）、分布式任务调度（Quartz/XXL）、文件对象存储。 |
| **`yudao-server`** | `yudao-server` | Spring Boot 主启动入口，包含全量配置及启动类 `YudaoServerApplication`。 |
| **`ui`** | `ui` | 专有 Vue 3.4 + TypeScript + Vite 5 前端工程，集成 Jessibuca 视频播放器与物模型可视化设计器。 |

---

## 跨模块解耦机制

MzMedia 严禁模块间的强代码硬编码引用。系统通过两大机制实现解耦：
1. **Spring ApplicationEvent 进程内解耦**：例如 `yudao-module-iot` 触发场景规则后，发布 `IotMediaLinkageEvent` 事件，由 `yudao-module-media` 中的监听器消费，完成摄像头预置位转动。
2. **IotMessageBus 跨服务解耦**：基于 Redis Stream（默认）或 Kafka/RocketMQ 传输遥测报文与命令。

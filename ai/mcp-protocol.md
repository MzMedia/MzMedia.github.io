# 🔌 Model Context Protocol (MCP) 深度集成

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) 是由 Anthropic 发起并被全球主流 AI 开发框架采纳的开放通信标准，用于安全地向大模型暴露工具、资源与上下文。

---

## 1. MzMedia 中的 MCP 架构设计

平台采用官方 Java MCP SDK (`io.modelcontextprotocol.client.McpSyncClient`) 构建客户端管理器，提供双通道连接模式：

```text
 ┌────────────────────────────────────────────────────────┐
 │            Spring AI 智能中枢 (Ai1AgentService)        │
 └───────────────────────────┬────────────────────────────┘
                             │ Tool Call 调度
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │            MCP 客户端管理器 (Ai1McpClientManager)      │
 ├────────────────────────────┬───────────────────────────┤
 │ 1. stdio Transport         │ 2. http Transport         │
 │ (本地子进程: Python/Node)  │ (远程 Streamable HTTP/SSE)│
 └────────────────────────────┴───────────────────────────┘
```

### 传输通道一：`stdio` Transport
- 适用于运行在本地操作系统中的独立脚本或工具包；
- 平台通过 Java ProcessBuilder 唤起本地子进程（如 Python 数据分析脚本、Node.js 爬虫工具），通过标准输入/输出流（stdin/stdout）进行 JSON-RPC 交互。

### 传输通道二：`http` Transport (Streamable HTTP)
- 适用于部署在独立服务器、云端或容器集群中的远程 MCP 服务端；
- 基于 HTTP/SSE 长连接保持双向事件流通信，支持高并发与微服务解耦。

---

## 2. 内置暴露的 MCP 工业工具集

MzMedia 将底座核心能力封装为标准 MCP Tools：
- `iot_query_device_telemetry`：根据设备 ID 和时间范围查询 TDengine 中的电流、温度时序遥测数据；
- `iot_get_alert_records`：获取设备近期触发的未解除告警记录；
- `media_call_preset_and_snapshot`：调用指定国标摄像机预置位并抓取实时高清画面快照；
- `mes_create_maintenance_order`：根据排查结论自动在 MES 系统中创建维修工单并派发给工程师。

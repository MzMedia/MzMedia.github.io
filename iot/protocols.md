# 🔌 13+ 通信协议接入指南

MzMedia 内置了广泛的工业与物联通信协议栈，覆盖工业制造、环境监测、园区物联与智慧水务等全品类末端设备：

---

## 1. 协议选型检索矩阵 {#protocol-matrix}

您可以通过下方多维协议矩阵，根据网络环境、传输载荷与时延要求快速筛选最适合的接入通道：

<ProtocolMatrixTable />

---

## 2. 重点协议技术参数详解

### 1. MQTT 协议 (EMQX 5.0 集成)
- **标准规格**：支持 MQTT 3.1、3.1.1、5.0 规范，支持 QoS 0、QoS 1、QoS 2；
- **Topic 拓扑设计**：
  - 属性上报：`/sys/{productKey}/{deviceSecret}/thing/event/property/post`
  - 属性设置：`/sys/{productKey}/{deviceSecret}/thing/service/property/set`
  - 服务调用：`/sys/{productKey}/{deviceSecret}/thing/service/{serviceIdentifier}`
  - 事件上报：`/sys/{productKey}/{deviceSecret}/thing/event/{eventIdentifier}/post`

### 2. Modbus TCP / RTU 协议
- 专为工业自动化场景设计，支持读取线圈状态（`01`）、离散输入（`02`）、保持寄存器（`03`）与输入寄存器（`04`）；
- 支持 Master 轮询模式（由网关定时向从站设备轮询数据）与 Slave 被动监听模式；
- 支持多种字节序（Big-Endian, Little-Endian, CDAB 等）。

### 3. CoAP 协议 (基于 Californium)
- 面向窄带物联网（NB-IoT）或电池供电的低功耗传感器；
- 采用紧凑型二进制报文与 UDP 传输，报文头仅 4 字节，大幅降低硬件耗电量与通信流量。

### 4. TCP / UDP 自定义协议
- 专门应对中小企业老旧设备的非标报文；
- 支持定长帧、特殊分隔符帧（如 `\r\n` 或 `0x7E`）、长度字段前缀帧；
- 可配合平台内置的 **AI 协议逆向解析器** 一键生成 Netty 解码器。

### 5. HTTP REST / Webhook
- 适用于第三方中继系统、车载 GPS 网关的主动 HTTP POST JSON 数据上报；
- 支持 Token 鉴权与时间戳签名校验。

### 6. WebSocket 协议
- 用于前端数字驾驶舱、移动端双向指令下发与设备实时状态全双工同步。

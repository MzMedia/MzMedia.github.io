# 🎯 云台控制与预置位联动

GB/T 28181 定义了标准的前端设备控制信令（PTZ 控制指令码格式），MzMedia 对其进行了封装，支持通过 REST API 和系统内部事件快速调用。

---

## 1. PTZ 控制指令规范

信令通过 SIP `MESSAGE` 方法发送，载荷为 XML 格式，关键字段为 `<PTZCmd>`（8 字节十六进制字节流）：

```text
字节序号:  [0]    [1]    [2]    [3]        [4]        [5]        [6]        [7]
内容:      A5H    组合码1 组合码2 指令码     水平速度   垂直速度   变倍速度   校验码
```

### 常用控制指令码速查

| 控制动作 | 指令码 (Hex) | 对应十进制 | 说明 |
| :--- | :--- | :--- | :--- |
| **云台停止** | `00` | 0 | 停止所有正在进行的转动与变倍 |
| **向右旋转** | `01` | 1 | 按水平速度向右平移 |
| **向左旋转** | `02` | 2 | 按水平速度向左平移 |
| **向下俯视** | `04` | 4 | 按垂直速度向下俯仰 |
| **向上仰视** | `08` | 8 | 按垂直速度向上仰视 |
| **镜头拉近 (Zoom In)** | `10` | 16 | 变倍焦距放大 |
| **镜头拉远 (Zoom Out)**| `20` | 32 | 变倍焦距缩小 |
| **★ 调用预置位 (Goto Preset)** | **`81`** | **129** | **驱动球机镜头快速转向指定预置位** |
| **设置预置位 (Set Preset)** | `82` | 130 | 将当前摄像机朝向保存为预置位编号 |
| **删除预置位 (Del Preset)** | `83` | 131 | 清除指定预置位参数 |

---

## 2. 物联网（IoT）超限联动摄像机实现

当温度传感器超标或烟雾探测器触发时，MzMedia 无缝通过 Spring 事件实现毫秒级联动：

```java
// 1. 在 yudao-module-iot 规则引擎中命中联动动作：
IotMediaLinkageEvent event = new IotMediaLinkageEvent(this)
    .setDeviceId("34020000001320000001") // 关联的国标摄像机 ID
    .setChannelId("34020000001310000001")// 关联的通道 ID
    .setActionType("ptz_preset")          // 动作类型: 预置位调用
    .setPresetIndex(1)                    // 预置位编号: 1 (事故关键点位)
    .setTriggerSnapshot(true);            // 同步触发抓拍

// 2. 通过系统事件总线发布
applicationEventPublisher.publishEvent(event);

// 3. 在 yudao-module-media 中监听到事件并执行信令下发：
@EventListener
public void onMediaLinkage(IotMediaLinkageEvent event) {
    // 自动向球机发送 0x81 指令码并调用 ZLMediaKit 抓取实时快照
}
```

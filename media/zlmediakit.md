# 🔄 ZLMediaKit 流媒体集群对接

[ZLMediaKit](https://github.com/ZLMediaKit/ZLMediaKit) 是一款基于 C++ 开发的高性能开源流媒体服务器，MzMedia 将其作为核心流媒体转码与分发节点。

---

## 1. 节点纳管架构

- 平台支持单机挂载或多流媒体节点集群纳管（通过 `wvp_media_server` 表管理）；
- 每个流媒体节点配置固定的 HTTP 端口、REST API 访问密钥（Secret）、Hook 回调地址以及动态 RTP 端口接收范围（推荐 `30000-30500`）。

---

## 2. 实时点播推流时序 (INVITE 协商)

```text
前端播放器          MzMedia 后端           ZLMediaKit           GB28181 摄像机
    │                    │                    │                      │
    │── 1. 点播请求 ────>│                    │                      │
    │                    │── 2. openRtpServer>│                      │
    │                    │<──返回动态端口30002│                      │
    │                    │                                           │
    │                    │── 3. SIP INVITE (携带 ZLM 端口 SDP) ──────>│
    │                    │<── 4. 200 OK (携带摄像机 RTP 发送 SDP) ───│
    │                    │── 5. SIP ACK ────────────────────────────>│
    │                    │                                           │
    │                    │                    │<── 6. 推送 RTP 流 ───│
    │                    │<── 7. Hook 通知 ───│                      │
    │<── 8. 返回播放地址 ─│                    │                      │
    │ (WebRTC/FLV/HLS)   │                    │                      │
    │                    │                    │                      │
    │────────────────────┼── 9. 拉流播放 ────>│                      │
```

---

## 3. Webhook 回调钩子体系

| Hook 名称 | 触发时机 | MzMedia 业务处理逻辑 |
| :--- | :--- | :--- |
| `on_server_started` | ZLMediaKit 进程启动/重启 | 重置流媒体节点在线状态，同步当前正在推流的任务。 |
| `on_publish` | 设备开始向 ZLM 推送音视频流 | 校验流鉴权密钥，若通过则更新推流状态为活跃。 |
| `on_play` | 前端播放器开始连接播放 | 记录播放会话，更新在线观看人数。 |
| `on_stream_none_reader` | 某个视频流所有客户端均已断开 | **无人观看自动停流机制**：超时后自动向摄像机下发 SIP `BYE` 指令，释放带宽与 RTP 端口。 |
| `on_stream_not_found` | 前端请求播放不存在的流 | 触发自动按需拉流或提示流离线。 |

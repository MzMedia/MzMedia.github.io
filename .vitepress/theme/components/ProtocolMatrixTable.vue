<template>
  <div class="mz-tool-card protocol-matrix">
    <div class="mz-tool-header">
      <div class="mz-tool-title">
        <span>🔌 MzMedia 13+ 种工业物联网与音视频协议矩阵检索</span>
        <span class="mz-tool-badge">选型指南</span>
      </div>
      <div class="filter-controls">
        <input
          v-model="keyword"
          type="text"
          placeholder="快速搜索协议或应用设备..."
          class="search-input"
        />
      </div>
    </div>

    <div class="mz-tool-body">
      <!-- 类别标签过滤 -->
      <div class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="cat-chip"
          :class="{ active: currentCategory === cat.key }"
          @click="currentCategory = cat.key"
        >
          {{ cat.label }} ({{ countByCategory(cat.key) }})
        </button>
      </div>

      <!-- 协议列表表格 -->
      <div class="table-wrapper">
        <table class="matrix-table">
          <thead>
            <tr>
              <th style="width: 130px">协议名称</th>
              <th style="width: 100px">传输层</th>
              <th style="width: 120px">报文载荷格式</th>
              <th style="width: 110px">典型时延</th>
              <th>适用场景与支持设备</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredProtocols" :key="item.name">
              <td class="name-cell">
                <span class="proto-name">{{ item.name }}</span>
                <span class="category-tag">{{ item.categoryName }}</span>
              </td>
              <td><code class="tech-code">{{ item.transport }}</code></td>
              <td><span class="format-badge">{{ item.payload }}</span></td>
              <td>
                <span class="latency-tag" :class="item.latencyClass">{{ item.latency }}</span>
              </td>
              <td class="desc-cell">{{ item.desc }}</td>
            </tr>
            <tr v-if="filteredProtocols.length === 0">
              <td colspan="5" class="empty-cell">未找到匹配的协议，请尝试其他关键词</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const keyword = ref('')
const currentCategory = ref('ALL')

const categories = [
  { key: 'ALL', label: '全部协议' },
  { key: 'MEDIA', label: '视频与安防' },
  { key: 'PLC', label: '工控与现场总线' },
  { key: 'IOT', label: '低功耗与网关' },
  { key: 'CUSTOM', label: '通用/定制透传' }
]

interface ProtocolItem {
  name: string
  category: 'MEDIA' | 'PLC' | 'IOT' | 'CUSTOM'
  categoryName: string
  transport: string
  payload: string
  latency: string
  latencyClass: 'ultra' | 'low' | 'normal'
  desc: string
}

const protocols: ProtocolItem[] = [
  {
    name: 'GB/T 28181',
    category: 'MEDIA',
    categoryName: '视频安防',
    transport: 'SIP + RTP (UDP/TCP)',
    payload: 'XML 信令 + PS 流',
    latency: '< 500ms',
    latencyClass: 'ultra',
    desc: '公安部国标安防视频平台级互联，支持海康、大华等安防球机注册、云台 PTZ 控制、语音对讲与录像检索。'
  },
  {
    name: 'WebRTC (ZLMediaKit)',
    category: 'MEDIA',
    categoryName: '视频安防',
    transport: 'UDP / DTLS / SRTP',
    payload: 'H.264 / H.265 / OPUS',
    latency: '< 300ms',
    latencyClass: 'ultra',
    desc: '浏览器原生免插件超低延时点播，适用于云台极速微操、视频巡检与工业无人机图传。'
  },
  {
    name: 'WS-FLV / HTTP-FLV',
    category: 'MEDIA',
    categoryName: '视频安防',
    transport: 'WebSocket / HTTP',
    payload: 'FLV Tag 二进制封装',
    latency: '500ms ~ 1.5s',
    latencyClass: 'low',
    desc: '防火墙严格或局域网环境下的主流播放方案，兼容传统浏览器与大屏集成。'
  },
  {
    name: 'HLS (m3u8)',
    category: 'MEDIA',
    categoryName: '视频安防',
    transport: 'HTTP Chunked',
    payload: 'm3u8 索引 + TS 切片',
    latency: '3s ~ 8s',
    latencyClass: 'normal',
    desc: '公网大并发与历史监控录像回放首选，全平台通用且无穿透阻碍。'
  },
  {
    name: 'Modbus TCP',
    category: 'PLC',
    categoryName: '工控总线',
    transport: 'TCP (Port 502)',
    payload: 'MBAP 报文头 + PDU 二进制',
    latency: '< 50ms',
    latencyClass: 'ultra',
    desc: '西门子 S7-1200/1500、施耐德 PLC、工业网关直连，支持保持寄存器与线圈批量轮询。'
  },
  {
    name: 'Modbus RTU (透传)',
    category: 'PLC',
    categoryName: '工控总线',
    transport: '串口 RS485 / DTU 透传',
    payload: '地址 + 功能码 + CRC16',
    latency: '100ms ~ 500ms',
    latencyClass: 'low',
    desc: '数显表、温湿度变送器、电量计、流量计等各类工业传感器总线级数据采集。'
  },
  {
    name: 'MQTT (EMQX 5.0)',
    category: 'IOT',
    categoryName: '低功耗物联',
    transport: 'TCP / TLS / WSS',
    payload: 'JSON / TSL / 自定义',
    latency: '< 80ms',
    latencyClass: 'ultra',
    desc: '百万级物联网设备连接中枢，支持 QoS 0/1/2、遗嘱消息、共享订阅与设备影子差量同步。'
  },
  {
    name: 'CoAP',
    category: 'IOT',
    categoryName: '低功耗物联',
    transport: 'UDP / DTLS',
    payload: '紧凑二进制 (RESTful 语义)',
    latency: '< 100ms',
    latencyClass: 'ultra',
    desc: '专为受限低功耗设备（NB-IoT 井盖、智能水表、烟感传感器）设计。'
  },
  {
    name: 'JT/T 808 (部标车联网)',
    category: 'IOT',
    categoryName: '低功耗物联',
    transport: 'TCP',
    payload: '0x7E 标志位 + 转义二进制',
    latency: '< 200ms',
    latencyClass: 'low',
    desc: '商用货车、叉车定位终标、新能源车载 T-Box 行程位置轨迹与传感器采集。'
  },
  {
    name: 'DL/T 645 (电能表)',
    category: 'PLC',
    categoryName: '工控总线',
    transport: 'RS485 / 载波 / TCP',
    payload: '0x68 引导 + BCD 偏移加 0x33',
    latency: '200ms ~ 1s',
    latencyClass: 'normal',
    desc: '国家电网智能电表标准抄表规约，自动化采集有功无功电量与峰平谷冻结值。'
  },
  {
    name: 'Netty 自定义 TCP/UDP',
    category: 'CUSTOM',
    categoryName: '定制透传',
    transport: 'TCP / UDP 长连接',
    payload: '定长 / 特殊分隔符 / 变长包头',
    latency: '< 20ms',
    latencyClass: 'ultra',
    desc: '非标私有协议动态适配，结合 Spring AI 智能中枢可实现私有报文格式的秒级逆向与代码生成。'
  },
  {
    name: 'WebSocket 长连接',
    category: 'CUSTOM',
    categoryName: '定制透传',
    transport: 'TCP / WSS',
    payload: 'JSON 物模型格式',
    latency: '< 30ms',
    latencyClass: 'ultra',
    desc: 'GoView 数字驾驶舱大屏、前端实时设备遥测推送与双向控制反控。'
  },
  {
    name: 'RTSP / RTMP 原生推拉流',
    category: 'MEDIA',
    categoryName: '视频安防',
    transport: 'TCP / UDP',
    payload: 'NALU (H.264/H.265/AAC)',
    latency: '1s ~ 3s',
    latencyClass: 'normal',
    desc: '对接第三方 NVR (海康/宇视)、OBS 推流直播与无人机移动图传中继。'
  }
]

function countByCategory(catKey: string): number {
  if (catKey === 'ALL') return protocols.length
  return protocols.filter(p => p.category === catKey).length
}

const filteredProtocols = computed(() => {
  return protocols.filter(p => {
    const matchCat = currentCategory.value === 'ALL' || p.category === currentCategory.value
    const kw = keyword.value.trim().toLowerCase()
    const matchKw = !kw ||
      p.name.toLowerCase().includes(kw) ||
      p.desc.toLowerCase().includes(kw) ||
      p.payload.toLowerCase().includes(kw) ||
      p.transport.toLowerCase().includes(kw)
    return matchCat && matchKw
  })
})
</script>

<style scoped>
.protocol-matrix {
  font-family: inherit;
}

.search-input {
  font-size: 12px;
  padding: 5px 10px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  width: 220px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: var(--vp-c-brand-1);
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.cat-chip {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 14px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.cat-chip.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  font-weight: 600;
}

.table-wrapper {
  overflow-x: auto;
}

.matrix-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin: 0 !important;
}

.matrix-table th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  text-align: left;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-border);
}

.matrix-table td {
  padding: 10px 12px;
  border: 1px solid var(--vp-c-border);
  vertical-align: middle;
}

.name-cell {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.proto-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.category-tag {
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.tech-code {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  background: var(--vp-c-bg-alt);
  padding: 2px 6px;
  border-radius: 4px;
}

.format-badge {
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.latency-tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.latency-tag.ultra {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.latency-tag.low {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.latency-tag.normal {
  background: rgba(148, 163, 184, 0.15);
  color: #94a3b8;
}

.desc-cell {
  color: var(--vp-c-text-2);
  line-height: 1.5;
  font-size: 12px;
}

.empty-cell {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 24px;
}
</style>

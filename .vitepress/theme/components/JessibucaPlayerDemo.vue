<template>
  <div class="mz-tool-card jessibuca-demo">
    <div class="mz-tool-header">
      <div class="mz-tool-title">
        <span>📹 Jessibuca 高性能前端播放引擎与云台交互演示</span>
        <span class="mz-tool-badge">交互演示</span>
      </div>
      <div class="mz-tool-controls">
        <button
          v-for="split in [1, 4]"
          :key="split"
          class="split-btn"
          :class="{ active: currentSplit === split }"
          @click="currentSplit = split"
        >
          {{ split }}分屏
        </button>
      </div>
    </div>

    <div class="mz-tool-body">
      <div class="player-workspace">
        <!-- 播放器视窗区域 -->
        <div class="screen-container" :class="`split-${currentSplit}`">
          <div
            v-for="(ch, idx) in visibleChannels"
            :key="ch.id"
            class="video-cell"
            :class="{ selected: selectedChannel === idx }"
            @click="selectedChannel = idx"
          >
            <!-- 模拟画面顶部 OSD -->
            <div class="osd-top">
              <span class="osd-item live-indicator">● LIVE</span>
              <span class="osd-item">{{ ch.name }}</span>
              <span class="osd-item time">{{ currentTimeStr }}</span>
            </div>

            <!-- 模拟视频画面主体 -->
            <div class="screen-canvas">
              <div class="mock-scene">
                <div class="grid-backdrop"></div>
                <div class="camera-target" :style="targetStyle">
                  <div class="crosshair"></div>
                  <div class="box-label">{{ ch.type }} - 实时监控中</div>
                </div>
              </div>
            </div>

            <!-- 画面底部状态 OSD -->
            <div class="osd-bottom">
              <span class="osd-tag">{{ ch.protocol }}</span>
              <span class="osd-tag">{{ ch.codec }}</span>
              <span class="osd-tag">{{ ch.fps }} FPS</span>
              <span class="osd-tag">{{ ch.bitrate }}</span>
              <span class="osd-tag delay">延迟: {{ ch.delay }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧 / 底部控制台 -->
        <div class="control-console">
          <!-- 播放协议切换 -->
          <div class="console-section">
            <span class="section-title">流传输协议选择:</span>
            <div class="protocol-chips">
              <span
                v-for="proto in ['WebRTC (超低延迟)', 'WS-FLV', 'HTTP-FLV', 'HLS (录像)']"
                :key="proto"
                class="chip"
                :class="{ active: currentChannel.protocol.includes(proto.split(' ')[0]) }"
                @click="switchProtocol(proto.split(' ')[0])"
              >
                {{ proto }}
              </span>
            </div>
          </div>

          <!-- PTZ 八向十字方向盘与变焦 -->
          <div class="console-section ptz-box">
            <span class="section-title">PTZ 云台控制 (按下移动 / 释放停止):</span>
            <div class="ptz-layout">
              <div class="d-pad">
                <button class="ptz-btn dir up-left" @mousedown="sendPtz('UP_LEFT')" @mouseup="stopPtz">↖</button>
                <button class="ptz-btn dir up" @mousedown="sendPtz('UP')" @mouseup="stopPtz">▲</button>
                <button class="ptz-btn dir up-right" @mousedown="sendPtz('UP_RIGHT')" @mouseup="stopPtz">↗</button>
                <button class="ptz-btn dir left" @mousedown="sendPtz('LEFT')" @mouseup="stopPtz">◀</button>
                <button class="ptz-btn center" @click="resetPtz">●</button>
                <button class="ptz-btn dir right" @mousedown="sendPtz('RIGHT')" @mouseup="stopPtz">▶</button>
                <button class="ptz-btn dir down-left" @mousedown="sendPtz('DOWN_LEFT')" @mouseup="stopPtz">↙</button>
                <button class="ptz-btn dir down" @mousedown="sendPtz('DOWN')" @mouseup="stopPtz">▼</button>
                <button class="ptz-btn dir down-right" @mousedown="sendPtz('DOWN_RIGHT')" @mouseup="stopPtz">↘</button>
              </div>

              <div class="ptz-actions">
                <div class="zoom-group">
                  <button class="action-btn" @mousedown="sendPtz('ZOOM_IN')" @mouseup="stopPtz">🔍 变倍 +</button>
                  <button class="action-btn" @mousedown="sendPtz('ZOOM_OUT')" @mouseup="stopPtz">🔍 变倍 -</button>
                </div>
                <div class="preset-group">
                  <span class="preset-label">预置位联动:</span>
                  <button class="action-btn sm" @click="callPreset(1, '大门守望位 (0x81)')">预置位 1</button>
                  <button class="action-btn sm" @click="callPreset(2, '流水线全景 (0x82)')">预置位 2</button>
                </div>
              </div>
            </div>
          </div>

          <!-- GB/T 28181 实时信令交互终端日志 -->
          <div class="console-section">
            <div class="log-header">
              <span class="section-title">GB/T 28181 信令交互日志:</span>
              <button class="clear-log" @click="logs = []">清空</button>
            </div>
            <div class="log-window">
              <div v-for="(log, idx) in logs" :key="idx" class="log-line" :class="log.type">
                <span class="time">[{{ log.time }}]</span>
                <span class="msg">{{ log.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentSplit = ref<number>(1)
const selectedChannel = ref<number>(0)
const currentTimeStr = ref('')
let timer: any = null

const offsetX = ref(0)
const offsetY = ref(0)
const zoomLevel = ref(1)

const targetStyle = computed(() => {
  return {
    transform: `translate(${offsetX.value}px, ${offsetY.value}px) scale(${zoomLevel.value})`
  }
})

interface Channel {
  id: string
  name: string
  type: string
  protocol: string
  codec: string
  fps: number
  bitrate: string
  delay: string
}

const channels = ref<Channel[]>([
  { id: '1', name: 'CH-01: 车间主装配线东', type: '工业AI防爆球机', protocol: 'WebRTC', codec: 'H.265 硬解', fps: 25, bitrate: '2150 Kbps', delay: '< 260ms' },
  { id: '2', name: 'CH-02: 园区主大门出入口', type: '4K车牌超高清枪机', protocol: 'WebRTC', codec: 'H.264', fps: 30, bitrate: '4096 Kbps', delay: '< 320ms' },
  { id: '3', name: 'CH-03: 危险品仓库防火监控', type: '双光谱热成像球机', protocol: 'WS-FLV', codec: 'H.265', fps: 25, bitrate: '1800 Kbps', delay: '< 580ms' },
  { id: '4', name: 'CH-04: 配电室巡检机器人', type: '全向云台微型镜头', protocol: 'WebRTC', codec: 'H.264', fps: 25, bitrate: '1200 Kbps', delay: '< 290ms' }
])

const visibleChannels = computed(() => {
  return channels.value.slice(0, currentSplit.value)
})

const currentChannel = computed(() => {
  return channels.value[selectedChannel.value] || channels.value[0]
})

function switchProtocol(p: string) {
  currentChannel.value.protocol = p
  if (p === 'WebRTC') currentChannel.value.delay = '< 260ms'
  else if (p === 'WS-FLV') currentChannel.value.delay = '< 580ms'
  else if (p === 'HTTP-FLV') currentChannel.value.delay = '1.2s'
  else if (p === 'HLS') currentChannel.value.delay = '4.5s'

  addLog('INFO', `切换传输层协议为 ${p}，重连 ZLMediaKit 流媒体会话 ID: ssrc_0x${Math.floor(Math.random()*100000).toString(16)}`)
}

interface LogEntry {
  time: string
  text: string
  type: 'INFO' | 'CMD' | 'ACK'
}

const logs = ref<LogEntry[]>([
  { time: '11:00:01', text: 'Jessibuca 核心 WASM 解码引擎初始化完成 (WebAssembly SIMD 加速: ON)', type: 'INFO' },
  { time: '11:00:02', text: 'ZLMediaKit RTSP 转 WebRTC 会话建立，媒体协商 SDP Offer/Answer 交互成功', type: 'ACK' }
])

function addLog(type: 'INFO' | 'CMD' | 'ACK', text: string) {
  const now = new Date()
  const time = now.toTimeString().split(' ')[0]
  logs.value.unshift({ time, text, type })
  if (logs.value.length > 20) logs.value.pop()
}

function sendPtz(dir: string) {
  let hexCmd = 'A5 0F 01 00 00 00 00 B5'
  if (dir === 'UP') {
    offsetY.value = Math.max(-40, offsetY.value - 8)
    hexCmd = 'A5 0F 01 08 00 80 00 3D'
  } else if (dir === 'DOWN') {
    offsetY.value = Math.min(40, offsetY.value + 8)
    hexCmd = 'A5 0F 01 04 00 80 00 39'
  } else if (dir === 'LEFT') {
    offsetX.value = Math.max(-60, offsetX.value - 12)
    hexCmd = 'A5 0F 01 02 80 00 00 37'
  } else if (dir === 'RIGHT') {
    offsetX.value = Math.min(60, offsetX.value + 12)
    hexCmd = 'A5 0F 01 01 80 00 00 36'
  } else if (dir === 'ZOOM_IN') {
    zoomLevel.value = Math.min(1.8, zoomLevel.value + 0.15)
    hexCmd = 'A5 0F 01 10 00 00 10 CB'
  } else if (dir === 'ZOOM_OUT') {
    zoomLevel.value = Math.max(0.7, zoomLevel.value - 0.15)
    hexCmd = 'A5 0F 01 20 00 00 10 DB'
  }

  addLog('CMD', `GB28181 PTZ 指令下发 [${dir}] -> 设备: 34020000001320000001 码流帧: [${hexCmd}]`)
}

function stopPtz() {
  addLog('CMD', `GB28181 PTZ 停止指令下发 [STOP] -> 码流帧: [A5 0F 01 00 00 00 00 B5]`)
}

function resetPtz() {
  offsetX.value = 0
  offsetY.value = 0
  zoomLevel.value = 1
  addLog('INFO', `云台复位至中心坐标原点 (0, 0)`)
}

function callPreset(id: number, desc: string) {
  if (id === 1) {
    offsetX.value = -30
    offsetY.value = -15
    zoomLevel.value = 1.3
  } else {
    offsetX.value = 40
    offsetY.value = 20
    zoomLevel.value = 0.9
  }
  addLog('CMD', `GB28181 预置位调用 [编号: ${id}] (${desc}) -> 指令下发 0x81/0x82 联动`)
}

onMounted(() => {
  const updateTime = () => {
    const d = new Date()
    currentTimeStr.value = d.toLocaleDateString() + ' ' + d.toTimeString().split(' ')[0]
  }
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.jessibuca-demo {
  font-family: inherit;
}

.split-btn {
  font-size: 12px;
  padding: 4px 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  cursor: pointer;
  margin-left: 6px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.split-btn.active, .split-btn:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.player-workspace {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 860px) {
  .player-workspace {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
  }
}

.screen-container {
  background: #0f172a;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #1e293b;
  min-height: 280px;
  display: grid;
}

.screen-container.split-1 {
  grid-template-columns: 1fr;
}

.screen-container.split-4 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.video-cell {
  position: relative;
  background: #090d16;
  border: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 140px;
  cursor: pointer;
  overflow: hidden;
}

.video-cell.selected {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.osd-top {
  position: absolute;
  top: 6px;
  left: 8px;
  right: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #f8fafc;
  font-family: var(--vp-font-family-mono);
  text-shadow: 0 1px 3px rgba(0,0,0,0.8);
  z-index: 2;
}

.live-indicator {
  color: #ef4444;
  font-weight: bold;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.screen-canvas {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 180px;
}

.grid-backdrop {
  position: absolute;
  inset: 0;
  background: radial-gradient(#1e293b 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.6;
}

.camera-target {
  transition: transform 0.15s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.crosshair {
  width: 44px;
  height: 44px;
  border: 2px solid #10b981;
  border-radius: 50%;
  position: relative;
}

.crosshair::before, .crosshair::after {
  content: '';
  position: absolute;
  background: #10b981;
}

.crosshair::before {
  top: 50%;
  left: -8px;
  right: -8px;
  height: 1px;
  transform: translateY(-50%);
}

.crosshair::after {
  left: 50%;
  top: -8px;
  bottom: -8px;
  width: 1px;
  transform: translateX(-50%);
}

.box-label {
  font-size: 11px;
  color: #34d399;
  background: rgba(0,0,0,0.6);
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 6px;
}

.osd-bottom {
  position: absolute;
  bottom: 6px;
  left: 8px;
  right: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 10px;
  color: #94a3b8;
  z-index: 2;
}

.osd-tag {
  background: rgba(0, 0, 0, 0.65);
  padding: 1px 5px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.osd-tag.delay {
  color: #34d399;
}

.control-console {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.console-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 10px;
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  display: block;
  margin-bottom: 8px;
}

.protocol-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.chip.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  font-weight: 600;
}

.ptz-layout {
  display: flex;
  gap: 16px;
  align-items: center;
}

.d-pad {
  display: grid;
  grid-template-columns: repeat(3, 34px);
  grid-template-rows: repeat(3, 34px);
  gap: 4px;
}

.ptz-btn {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  user-select: none;
  transition: background 0.1s;
}

.ptz-btn:active {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.ptz-btn.center {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.ptz-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.zoom-group {
  display: flex;
  gap: 6px;
}

.action-btn {
  font-size: 11px;
  padding: 4px 8px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  cursor: pointer;
  color: var(--vp-c-text-1);
  transition: all 0.2s;
}

.action-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.action-btn.sm {
  margin-right: 4px;
}

.preset-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.preset-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-log {
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: none;
  border: none;
  cursor: pointer;
}

.clear-log:hover {
  color: var(--vp-c-brand-1);
}

.log-window {
  height: 90px;
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 6px 8px;
  overflow-y: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
}

.log-line {
  line-height: 1.4;
  margin-bottom: 3px;
}

.log-line .time {
  color: #64748b;
  margin-right: 6px;
}

.log-line.CMD .msg {
  color: #38bdf8;
}

.log-line.INFO .msg {
  color: #94a3b8;
}

.log-line.ACK .msg {
  color: #34d399;
}
</style>

<template>
  <div class="mz-tool-card modbus-calc">
    <div class="mz-tool-header">
      <div class="mz-tool-title">
        <span>⚡ Modbus 工业字节序换算与 CRC16 校验小工具</span>
        <span class="mz-tool-badge">实操工具箱</span>
      </div>
      <div class="mz-tool-actions">
        <button class="preset-btn" @click="setPreset('20.0')">示例: 20.0</button>
        <button class="preset-btn" @click="setPreset('123.456')">示例: 123.456</button>
        <button class="preset-btn" @click="setPreset('1000')">示例: 1000</button>
      </div>
    </div>

    <div class="mz-tool-body">
      <!-- 32位字节序换算区 -->
      <div class="calc-section">
        <div class="section-label">
          <strong>1. 输入 32 位 Hex 原始字节 (4 字节 / 8 个十六进制字符):</strong>
        </div>
        <div class="input-row">
          <input
            v-model="rawHex"
            type="text"
            maxlength="20"
            placeholder="如: 41 A0 00 00"
            class="hex-input"
            @input="formatInput"
          />
          <span class="byte-count-tip" :class="{ valid: validBytes.length === 4 }">
            {{ validBytes.length === 4 ? '✓ 4 字节有效' : `需 4 字节 (当前 ${validBytes.length})` }}
          </span>
        </div>

        <div v-if="validBytes.length === 4" class="endian-results-grid">
          <!-- ABCD -->
          <div class="endian-card" :class="{ highlight: activeEndian === 'ABCD' }" @click="activeEndian = 'ABCD'">
            <div class="endian-title">
              <span class="name">大端模式 (ABCD)</span>
              <span class="tag">标准 / 西门子</span>
            </div>
            <div class="byte-sequence">{{ formatBytes(getPermutation('ABCD')) }}</div>
            <div class="value-item">
              <span class="val-label">Float32:</span>
              <span class="val-num">{{ results.ABCD.float }}</span>
            </div>
            <div class="value-item">
              <span class="val-label">UInt32:</span>
              <span class="val-num">{{ results.ABCD.uint }}</span>
            </div>
            <div class="value-item">
              <span class="val-label">Int32:</span>
              <span class="val-num">{{ results.ABCD.int }}</span>
            </div>
          </div>

          <!-- BADC -->
          <div class="endian-card" :class="{ highlight: activeEndian === 'BADC' }" @click="activeEndian = 'BADC'">
            <div class="endian-title">
              <span class="name">字节交换 (BADC)</span>
              <span class="tag">部分国产仪表</span>
            </div>
            <div class="byte-sequence">{{ formatBytes(getPermutation('BADC')) }}</div>
            <div class="value-item">
              <span class="val-label">Float32:</span>
              <span class="val-num">{{ results.BADC.float }}</span>
            </div>
            <div class="value-item">
              <span class="val-label">UInt32:</span>
              <span class="val-num">{{ results.BADC.uint }}</span>
            </div>
            <div class="value-item">
              <span class="val-label">Int32:</span>
              <span class="val-num">{{ results.BADC.int }}</span>
            </div>
          </div>

          <!-- CDAB -->
          <div class="endian-card" :class="{ highlight: activeEndian === 'CDAB' }" @click="activeEndian = 'CDAB'">
            <div class="endian-title">
              <span class="name">字交换 (CDAB)</span>
              <span class="tag">施耐德 / 中端模式</span>
            </div>
            <div class="byte-sequence">{{ formatBytes(getPermutation('CDAB')) }}</div>
            <div class="value-item">
              <span class="val-label">Float32:</span>
              <span class="val-num">{{ results.CDAB.float }}</span>
            </div>
            <div class="value-item">
              <span class="val-label">UInt32:</span>
              <span class="val-num">{{ results.CDAB.uint }}</span>
            </div>
            <div class="value-item">
              <span class="val-label">Int32:</span>
              <span class="val-num">{{ results.CDAB.int }}</span>
            </div>
          </div>

          <!-- DCBA -->
          <div class="endian-card" :class="{ highlight: activeEndian === 'DCBA' }" @click="activeEndian = 'DCBA'">
            <div class="endian-title">
              <span class="name">小端模式 (DCBA)</span>
              <span class="tag">x86 / ARM 工控机</span>
            </div>
            <div class="byte-sequence">{{ formatBytes(getPermutation('DCBA')) }}</div>
            <div class="value-item">
              <span class="val-label">Float32:</span>
              <span class="val-num">{{ results.DCBA.float }}</span>
            </div>
            <div class="value-item">
              <span class="val-label">UInt32:</span>
              <span class="val-num">{{ results.DCBA.uint }}</span>
            </div>
            <div class="value-item">
              <span class="val-label">Int32:</span>
              <span class="val-num">{{ results.DCBA.int }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CRC16 校验区 -->
      <div class="crc-section">
        <div class="section-label">
          <strong>2. Modbus RTU CRC16 校验计算:</strong>
        </div>
        <div class="crc-box">
          <input
            v-model="crcInputHex"
            type="text"
            placeholder="输入发送帧 Hex，如: 01 03 00 00 00 02"
            class="crc-input"
          />
          <div class="crc-output">
            <span class="crc-label">CRC16 (低字节在前):</span>
            <code class="crc-code">{{ calculatedCrc.lowHigh }}</code>
            <span class="crc-label" style="margin-left: 12px">完整发送报文:</span>
            <code class="crc-code full">{{ calculatedCrc.fullPacket }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const rawHex = ref('41 A0 00 00')
const activeEndian = ref('ABCD')
const crcInputHex = ref('01 03 00 00 00 02')

function formatInput() {
  rawHex.value = rawHex.value.toUpperCase()
}

const validBytes = computed<number[]>(() => {
  const clean = rawHex.value.replace(/[^0-9A-Fa-f]/g, '')
  const bytes: number[] = []
  for (let i = 0; i < clean.length; i += 2) {
    if (i + 1 < clean.length) {
      bytes.push(parseInt(clean.substr(i, 2), 16))
    }
  }
  return bytes.slice(0, 4)
})

function getPermutation(mode: 'ABCD' | 'BADC' | 'CDAB' | 'DCBA'): number[] {
  const [b0, b1, b2, b3] = validBytes.value
  if (validBytes.value.length < 4) return [0, 0, 0, 0]
  switch (mode) {
    case 'ABCD': return [b0, b1, b2, b3]
    case 'BADC': return [b1, b0, b3, b2]
    case 'CDAB': return [b2, b3, b0, b1]
    case 'DCBA': return [b3, b2, b1, b0]
  }
}

function formatBytes(bytes: number[]): string {
  return bytes.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ')
}

function parseValues(bytes: number[]) {
  const buffer = new ArrayBuffer(4)
  const view = new DataView(buffer)
  bytes.forEach((b, i) => view.setUint8(i, b))

  const fVal = view.getFloat32(0, false)
  const uVal = view.getUint32(0, false)
  const iVal = view.getInt32(0, false)

  let floatStr = fVal.toString()
  if (!Number.isInteger(fVal)) {
    floatStr = fVal.toFixed(4)
  }

  return {
    float: floatStr,
    uint: uVal.toString(),
    int: iVal.toString()
  }
}

const results = computed(() => {
  return {
    ABCD: parseValues(getPermutation('ABCD')),
    BADC: parseValues(getPermutation('BADC')),
    CDAB: parseValues(getPermutation('CDAB')),
    DCBA: parseValues(getPermutation('DCBA'))
  }
})

function setPreset(type: string) {
  if (type === '20.0') rawHex.value = '41 A0 00 00'
  else if (type === '123.456') rawHex.value = '42 F6 E9 79'
  else if (type === '1000') rawHex.value = '00 00 03 E8'
}

// Modbus RTU CRC16 计算
const calculatedCrc = computed(() => {
  const clean = crcInputHex.value.replace(/[^0-9A-Fa-f]/g, '')
  const bytes: number[] = []
  for (let i = 0; i < clean.length; i += 2) {
    if (i + 1 < clean.length) {
      bytes.push(parseInt(clean.substr(i, 2), 16))
    }
  }

  if (bytes.length === 0) {
    return { lowHigh: '-- --', fullPacket: '--' }
  }

  let crc = 0xFFFF
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i]
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x0001) !== 0) {
        crc = (crc >> 1) ^ 0xA001
      } else {
        crc = crc >> 1
      }
    }
  }

  const lowByte = (crc & 0xFF).toString(16).padStart(2, '0').toUpperCase()
  const highByte = ((crc >> 8) & 0xFF).toString(16).padStart(2, '0').toUpperCase()

  const rawFormatted = bytes.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ')
  return {
    lowHigh: `${lowByte} ${highByte}`,
    fullPacket: `${rawFormatted} ${lowByte} ${highByte}`
  }
})
</script>

<style scoped>
.modbus-calc {
  font-family: inherit;
}

.preset-btn {
  font-size: 12px;
  padding: 4px 10px;
  margin-left: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.preset-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.calc-section, .crc-section {
  margin-bottom: 16px;
}

.section-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.hex-input, .crc-input {
  font-family: var(--vp-font-family-mono);
  font-size: 15px;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  letter-spacing: 1px;
  outline: none;
  transition: border-color 0.2s;
}

.hex-input {
  width: 220px;
}

.crc-input {
  flex: 1;
}

.hex-input:focus, .crc-input:focus {
  border-color: var(--vp-c-brand-1);
}

.byte-count-tip {
  font-size: 12px;
  color: #ef4444;
}

.byte-count-tip.valid {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.endian-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
}

.endian-card {
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.endian-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.endian-card.highlight {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.endian-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.endian-title .name {
  font-weight: 600;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.endian-title .tag {
  font-size: 10px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-alt);
  padding: 1px 6px;
  border-radius: 4px;
}

.byte-sequence {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
  padding: 3px 6px;
  border-radius: 4px;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.value-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-top: 4px;
  line-height: 1.4;
}

.val-label {
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

.val-num {
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.crc-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.crc-output {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 13px;
}

.crc-label {
  color: var(--vp-c-text-2);
  margin-right: 6px;
}

.crc-code {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-brand-1);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.crc-code.full {
  color: var(--mz-c-blue);
}
</style>

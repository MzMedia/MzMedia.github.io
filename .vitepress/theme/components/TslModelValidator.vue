<template>
  <div class="mz-tool-card tsl-validator">
    <div class="mz-tool-header">
      <div class="mz-tool-title">
        <span>📐 统一物模型 (TSL) 在线解析与规范校验器</span>
        <span class="mz-tool-badge">物模型引擎</span>
      </div>
      <div class="mz-tool-actions">
        <button
          v-for="tpl in templates"
          :key="tpl.name"
          class="tpl-btn"
          :class="{ active: selectedTpl === tpl.name }"
          @click="loadTemplate(tpl)"
        >
          {{ tpl.name }}
        </button>
      </div>
    </div>

    <div class="mz-tool-body">
      <div class="tsl-layout">
        <!-- 左侧：TSL JSON 编辑区 -->
        <div class="tsl-editor-pane">
          <div class="pane-header">
            <span class="label">TSL 模型 JSON 结构定义:</span>
            <span class="status-pill" :class="{ error: !isValidJson, ok: isValidJson }">
              {{ isValidJson ? '✓ 语法格式正确' : '✗ JSON 语法错误' }}
            </span>
          </div>
          <textarea
            v-model="rawJson"
            class="tsl-textarea"
            rows="16"
            spellcheck="false"
          ></textarea>
        </div>

        <!-- 右侧：物模型可视化要素解析面板 -->
        <div class="tsl-preview-pane">
          <div class="tabs-nav">
            <button
              class="tab-item"
              :class="{ active: activeTab === 'properties' }"
              @click="activeTab = 'properties'"
            >
              📊 属性 ({{ parsedTsl.properties?.length || 0 }})
            </button>
            <button
              class="tab-item"
              :class="{ active: activeTab === 'services' }"
              @click="activeTab = 'services'"
            >
              ⚙️ 服务 ({{ parsedTsl.services?.length || 0 }})
            </button>
            <button
              class="tab-item"
              :class="{ active: activeTab === 'events' }"
              @click="activeTab = 'events'"
            >
              🚨 事件 ({{ parsedTsl.events?.length || 0 }})
            </button>
          </div>

          <div class="elements-list">
            <!-- 属性列表 -->
            <div v-if="activeTab === 'properties'" class="tab-content">
              <div
                v-for="prop in parsedTsl.properties"
                :key="prop.identifier"
                class="element-item"
              >
                <div class="item-head">
                  <span class="item-name">{{ prop.name }}</span>
                  <code class="item-id">{{ prop.identifier }}</code>
                  <span class="item-badge type">{{ prop.dataType?.type }}</span>
                  <span class="item-badge mode">{{ prop.accessMode === 'rw' ? '读写' : '只读' }}</span>
                </div>
                <div class="item-desc">
                  <span v-if="prop.dataType?.specs?.unit">单位: <b>{{ prop.dataType.specs.unit }}</b> | </span>
                  <span v-if="prop.dataType?.specs?.min !== undefined">
                    范围: [{{ prop.dataType.specs.min }} ~ {{ prop.dataType.specs.max }}] |
                  </span>
                  <span>描述: {{ prop.desc || '无补充描述' }}</span>
                </div>
              </div>
            </div>

            <!-- 服务列表 -->
            <div v-if="activeTab === 'services'" class="tab-content">
              <div
                v-for="svc in parsedTsl.services"
                :key="svc.identifier"
                class="element-item"
              >
                <div class="item-head">
                  <span class="item-name">{{ svc.name }}</span>
                  <code class="item-id">{{ svc.identifier }}</code>
                  <span class="item-badge mode">{{ svc.callType === 'async' ? '异步调用' : '同步调用' }}</span>
                </div>
                <div class="item-desc">
                  入参: <b>{{ svc.inputData?.map((p: any) => p.name).join(', ') || '无' }}</b>
                  <br />
                  出参: <b>{{ svc.outputData?.map((p: any) => p.name).join(', ') || '无' }}</b>
                </div>
              </div>
            </div>

            <!-- 事件列表 -->
            <div v-if="activeTab === 'events'" class="tab-content">
              <div
                v-for="evt in parsedTsl.events"
                :key="evt.identifier"
                class="element-item"
              >
                <div class="item-head">
                  <span class="item-name">{{ evt.name }}</span>
                  <code class="item-id">{{ evt.identifier }}</code>
                  <span
                    class="item-badge"
                    :class="evt.type === 'error' ? 'type-error' : evt.type === 'warn' ? 'type-warn' : 'type-info'"
                  >
                    {{ evt.type === 'error' ? '严重故障' : evt.type === 'warn' ? '预警告警' : '常规通知' }}
                  </span>
                </div>
                <div class="item-desc">
                  上报参数: <b>{{ evt.outputData?.map((p: any) => p.name).join(', ') || '无' }}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeTab = ref<'properties' | 'services' | 'events'>('properties')
const selectedTpl = ref('三相多功能电表')

const templates = [
  {
    name: '三相多功能电表',
    data: {
      profile: { version: '2.0.0', productKey: 'pm_meter_001' },
      properties: [
        { identifier: 'voltage_a', name: 'A相电压', accessMode: 'r', desc: '电表A相有效电压', dataType: { type: 'float', specs: { min: 0, max: 500, unit: 'V' } } },
        { identifier: 'current_a', name: 'A相电流', accessMode: 'r', desc: '电表A相电流', dataType: { type: 'float', specs: { min: 0, max: 100, unit: 'A' } } },
        { identifier: 'active_power', name: '总有功功率', accessMode: 'r', desc: '全负荷有功功率', dataType: { type: 'float', specs: { min: 0, max: 50000, unit: 'kW' } } },
        { identifier: 'relay_state', name: '内置继电器分闸', accessMode: 'rw', desc: '远程拉闸与合闸', dataType: { type: 'bool', specs: { '0': '合闸', '1': '分闸' } } }
      ],
      services: [
        { identifier: 'remote_trip', name: '远程分合闸控制', callType: 'async', inputData: [{ identifier: 'action', name: '动作指令', type: 'bool' }], outputData: [{ identifier: 'result', name: '执行状态', type: 'int' }] },
        { identifier: 'reset_energy', name: '电度清零校准', callType: 'sync', inputData: [{ identifier: 'auth_key', name: '操作密钥', type: 'string' }], outputData: [] }
      ],
      events: [
        { identifier: 'voltage_sag', name: '瞬时欠压告警', type: 'warn', outputData: [{ identifier: 'curr_v', name: '当前欠压值' }] },
        { identifier: 'over_load_trip', name: '超负荷短路跳闸', type: 'error', outputData: [{ identifier: 'fault_code', name: '故障代码' }] }
      ]
    }
  },
  {
    name: '工业温湿度变送器',
    data: {
      profile: { version: '2.0.0', productKey: 'th_sensor_s1' },
      properties: [
        { identifier: 'temperature', name: '环境温度', accessMode: 'r', desc: '车间空气温度', dataType: { type: 'float', specs: { min: -40, max: 85, unit: '℃' } } },
        { identifier: 'humidity', name: '相对湿度', accessMode: 'r', desc: '车间空气湿度', dataType: { type: 'float', specs: { min: 0, max: 100, unit: '%RH' } } },
        { identifier: 'sample_rate', name: '采集周期', accessMode: 'rw', desc: '传感器轮询周期', dataType: { type: 'int', specs: { min: 100, max: 60000, unit: 'ms' } } }
      ],
      services: [
        { identifier: 'calibrate_sensor', name: '零点温湿度校准', callType: 'sync', inputData: [{ identifier: 'temp_offset', name: '温度补偿' }], outputData: [] }
      ],
      events: [
        { identifier: 'temp_alarm', name: '超温预警', type: 'warn', outputData: [{ identifier: 'temp_val', name: '超温数值' }] },
        { identifier: 'sensor_fault', name: '探头掉线/损坏', type: 'error', outputData: [{ identifier: 'err_info', name: '探头诊断信息' }] }
      ]
    }
  }
]

const rawJson = ref(JSON.stringify(templates[0].data, null, 2))

function loadTemplate(tpl: any) {
  selectedTpl.value = tpl.name
  rawJson.value = JSON.stringify(tpl.data, null, 2)
}

const isValidJson = computed(() => {
  try {
    JSON.parse(rawJson.value)
    return true
  } catch (e) {
    return false
  }
})

const parsedTsl = computed(() => {
  try {
    return JSON.parse(rawJson.value)
  } catch (e) {
    return {}
  }
})
</script>

<style scoped>
.tsl-validator {
  font-family: inherit;
}

.tpl-btn {
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

.tpl-btn.active, .tpl-btn:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.tsl-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 860px) {
  .tsl-layout {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
  }
}

.tsl-editor-pane, .tsl-preview-pane {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.pane-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-border);
  font-size: 12px;
}

.status-pill {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.status-pill.ok {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.status-pill.error {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.tsl-textarea {
  flex: 1;
  width: 100%;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  line-height: 1.5;
  padding: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: none;
  outline: none;
  resize: vertical;
  min-height: 300px;
}

.tabs-nav {
  display: flex;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-border);
}

.tab-item {
  flex: 1;
  font-size: 12px;
  padding: 8px 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

.tab-item.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  font-weight: 600;
}

.elements-list {
  padding: 12px;
  max-height: 380px;
  overflow-y: auto;
}

.element-item {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 8px;
}

.item-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 4px;
}

.item-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.item-id {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  padding: 1px 6px;
  border-radius: 4px;
}

.item-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
}

.item-badge.type {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.item-badge.mode {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
}

.item-badge.type-error {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.item-badge.type-warn {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
}

.item-badge.type-info {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.item-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}
</style>

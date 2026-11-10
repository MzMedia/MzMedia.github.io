<template>
  <div v-if="shouldShow" class="doc-meta-container">
    <div class="meta-item">
      <span class="icon">📝</span>
      <span>全文字数: <b>{{ wordCount }}</b> 字</span>
    </div>
    <div class="meta-divider">·</div>
    <div class="meta-item">
      <span class="icon">⏱️</span>
      <span>预计阅读: <b>{{ readingTime }}</b> 分钟</span>
    </div>
    <div class="meta-divider">·</div>
    <div class="meta-item">
      <span class="icon">🏷️</span>
      <span>企业级 AIoT 架构核心规约</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const wordCount = ref(0)

const shouldShow = computed(() => {
  // 首页不展示元信息
  return route.path !== '/' && route.path !== '/index.html'
})

const readingTime = computed(() => {
  return Math.max(1, Math.ceil(wordCount.value / 350))
})

function updateCount() {
  if (typeof window === 'undefined') return
  setTimeout(() => {
    const docElement = document.querySelector('.vp-doc')
    if (docElement) {
      const text = docElement.textContent || ''
      const clean = text.replace(/\s+/g, '')
      wordCount.value = clean.length
    }
  }, 100)
}

onMounted(() => {
  updateCount()
})

watch(() => route.path, () => {
  updateCount()
})
</script>

<style scoped>
.doc-meta-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
  margin-bottom: 24px;
  padding: 6px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  width: fit-content;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-item b {
  color: var(--vp-c-brand-1);
}

.meta-divider {
  color: var(--vp-c-border);
}
</style>

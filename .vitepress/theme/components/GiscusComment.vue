<template>
  <div v-if="shouldShow" class="giscus-wrapper">
    <!-- 头部区域 -->
    <div class="giscus-header">
      <div class="header-left">
        <span class="icon">💬</span>
        <div>
          <h3 class="title">开发者互动与技术支持</h3>
          <p class="tip">遇到部署、配置或协议对接问题？欢迎通过以下渠道与官方核心团队及社区开发者交流。</p>
        </div>
      </div>
    </div>

    <!-- 快速社区服务矩阵 -->
    <div class="community-grid">
      <!-- QQ 群 -->
      <div class="community-card" @mouseenter="activeQr = 'qq'" @mouseleave="activeQr = null">
        <div class="card-icon qq">🐧</div>
        <div class="card-info">
          <div class="card-title">官方 QQ 交流群</div>
          <div class="card-desc">技术讨论 · 在线答疑</div>
        </div>
        <div class="qr-trigger">扫码加入</div>
        <!-- 二维码浮层 -->
        <transition name="fade">
          <div v-if="activeQr === 'qq'" class="qr-popover">
            <img src="/img/qrcode/qqq.png" alt="官方 QQ 交流群二维码" class="qr-img" />
            <div class="qr-caption">QQ 扫码加入开发者群</div>
          </div>
        </transition>
      </div>

      <!-- 微信客服/微信群 -->
      <div class="community-card" @mouseenter="activeQr = 'wx'" @mouseleave="activeQr = null">
        <div class="card-icon wx">💬</div>
        <div class="card-info">
          <div class="card-title">技术团队企业微信</div>
          <div class="card-desc">架构咨询 · 商业授权</div>
        </div>
        <div class="qr-trigger">添加客服</div>
        <transition name="fade">
          <div v-if="activeQr === 'wx'" class="qr-popover">
            <img src="/img/qrcode/wx.png" alt="官方技术微信二维码" class="qr-img" />
            <div class="qr-caption">微信扫码添加技术人员</div>
          </div>
        </transition>
      </div>

      <!-- 微信公众号 -->
      <div class="community-card" @mouseenter="activeQr = 'gzh'" @mouseleave="activeQr = null">
        <div class="card-icon gzh">📢</div>
        <div class="card-info">
          <div class="card-title">官方微信公众号</div>
          <div class="card-desc">版本发布 · 深度技术干货</div>
        </div>
        <div class="qr-trigger">关注公众号</div>
        <transition name="fade">
          <div v-if="activeQr === 'gzh'" class="qr-popover">
            <img src="/img/qrcode/gzh.jpg" alt="官方微信公众号二维码" class="qr-img" />
            <div class="qr-caption">关注公众号获取最新动态</div>
          </div>
        </transition>
      </div>

      <!-- GitHub Issues -->
      <a href="https://github.com/MzMedia/MzMedia/issues" target="_blank" rel="noopener noreferrer" class="community-card link-card">
        <div class="card-icon github">🐙</div>
        <div class="card-info">
          <div class="card-title">GitHub Issues</div>
          <div class="card-desc">Bug 报告 · 功能建议 PR</div>
        </div>
        <div class="link-arrow">直达 →</div>
      </a>

      <!-- Gitee Issues -->
      <a href="https://gitee.com/mzmedia/mz-media/issues" target="_blank" rel="noopener noreferrer" class="community-card link-card">
        <div class="card-icon gitee">🦊</div>
        <div class="card-info">
          <div class="card-title">Gitee 缺陷与反馈</div>
          <div class="card-desc">国内镜像 · 极速工单响应</div>
        </div>
        <div class="link-arrow">直达 →</div>
      </a>
    </div>

    <!-- Giscus 页面评论区容器 / 开通指引 -->
    <div class="discussions-section">
      <div class="section-header" @click="toggleDiscussions">
        <div class="section-title">
          <span>🗨️ 页面即时评论 (GitHub Discussions)</span>
          <span v-if="!isConfigured" class="status-badge warning">待开通</span>
          <span v-else class="status-badge success">已启用</span>
        </div>
        <button class="toggle-btn" type="button">
          {{ showDiscussions ? '收起评论区 ▲' : '展开评论区 ▼' }}
        </button>
      </div>

      <div v-show="showDiscussions" class="section-content">
        <!-- 未完成配置时的友好引导，避免直接抛出 red banner 错误 -->
        <div v-if="!isConfigured" class="config-guide">
          <div class="guide-banner">
            <span class="guide-icon">💡</span>
            <div>
              <strong>为什么提示 "giscus is not installed on this repository"？</strong>
              <p>Giscus 是基于 GitHub Discussions 的开源评论组件。因为当前仓库 <code>MzMedia/MzMedia.github.io</code> 尚未在 GitHub 启用 Discussions 功能或未授权 Giscus App，直接加载会提示该错误。</p>
            </div>
          </div>

          <div class="guide-steps">
            <h4>🛠️ 仓库管理员 2 分钟极速开通指引：</h4>
            <ol>
              <li>
                <strong>开启 Discussions</strong>：访问
                <a href="https://github.com/MzMedia/MzMedia.github.io/settings" target="_blank" rel="noopener">
                  GitHub 仓库设置 (Settings)
                </a>
                ，找到 <b>Features</b> 勾选 <b>Discussions</b>。
              </li>
              <li>
                <strong>授权 Giscus App</strong>：打开
                <a href="https://github.com/apps/giscus" target="_blank" rel="noopener">
                  github.com/apps/giscus
                </a>
                ，点击 Install 并授权给仓库 <code>MzMedia/MzMedia.github.io</code>。
              </li>
              <li>
                <strong>获取 Category ID</strong>：在
                <a href="https://giscus.app" target="_blank" rel="noopener">giscus.app</a>
                输入 <code>MzMedia/MzMedia.github.io</code>，选择讨论分类（如 <code>General</code>），将生成的 <code>data-category-id</code> 填入组件配置即可全站点亮！
              </li>
            </ol>
            <div class="guide-repo-info">
              <span>当前仓库 Node ID：<code>R_kgDOKuH6kQ</code></span>
              <button class="copy-btn" @click="copyNodeId">{{ copyTip }}</button>
            </div>
          </div>

          <div class="guide-actions">
            <a href="https://github.com/MzMedia/MzMedia/issues" target="_blank" rel="noopener" class="primary-btn">
              先去 GitHub 提交 Issue 答疑
            </a>
            <button class="secondary-btn" @click="forceLoadGiscus">
              仍然尝试强制加载 Giscus
            </button>
          </div>
        </div>

        <!-- Giscus 实际挂载 DOM -->
        <div ref="commentContainer" class="giscus-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { isDark } = useData()
const commentContainer = ref<HTMLElement | null>(null)
const activeQr = ref<string | null>(null)
const showDiscussions = ref(false)
const copyTip = ref('复制 ID')

// 真实仓库配置项
const GISCUS_CONFIG = {
  repo: 'MzMedia/MzMedia.github.io',
  repoId: 'R_kgDOKuH6kQ', // 真实的 MzMedia.github.io GraphQL Node ID
  category: 'General',
  categoryId: 'DIC_kwDOKuH6kc4DKy7b' // 待管理员在 GitHub 启用 Discussions 后填入生成的 DIC_xxx
}

// 是否已配置完成有效的 Category ID
const isConfigured = computed(() => {
  return GISCUS_CONFIG.categoryId.startsWith('DIC_') && GISCUS_CONFIG.categoryId !== 'DIC_kwDONabcdefg'
})

// 首页不挂载互动组件
const shouldShow = computed(() => {
  return route.path !== '/' && route.path !== '/index.html'
})

function toggleDiscussions() {
  showDiscussions.value = !showDiscussions.value
  if (showDiscussions.value && isConfigured.value) {
    setTimeout(loadGiscus, 100)
  }
}

function forceLoadGiscus() {
  loadGiscus()
}

function copyNodeId() {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(GISCUS_CONFIG.repoId).then(() => {
      copyTip.value = '已复制！'
      setTimeout(() => {
        copyTip.value = '复制 ID'
      }, 2000)
    })
  }
}

function loadGiscus() {
  if (typeof window === 'undefined' || !commentContainer.value) return

  // 清空现有内容
  commentContainer.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', GISCUS_CONFIG.repo)
  script.setAttribute('data-repo-id', GISCUS_CONFIG.repoId)
  script.setAttribute('data-category', GISCUS_CONFIG.category)
  script.setAttribute('data-category-id', GISCUS_CONFIG.categoryId || 'DIC_kwDONabcdefg')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', isDark.value ? 'dark_dimmed' : 'light')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  commentContainer.value.appendChild(script)
}

onMounted(() => {
  // 如果已完成配置，自动展开并加载
  if (isConfigured.value && shouldShow.value) {
    showDiscussions.value = true
    loadGiscus()
  }
})

watch(() => route.path, () => {
  if (isConfigured.value && shouldShow.value && showDiscussions.value) {
    setTimeout(loadGiscus, 200)
  }
})

watch(isDark, (val) => {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: val ? 'dark_dimmed' : 'light'
          }
        }
      },
      'https://giscus.app'
    )
  }
})
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 56px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-border);
}

.giscus-header {
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.header-left .icon {
  font-size: 24px;
  line-height: 1.2;
}

.header-left .title {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
}

.header-left .tip {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* 社区服务矩阵 */
.community-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
  margin-bottom: 28px;
}

.community-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none !important;
}

.community-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
}

.card-info {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 2px;
}

.qr-trigger, .link-arrow {
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

/* 二维码弹出框 */
.qr-popover {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 100;
  text-align: center;
  width: 150px;
}

.qr-img {
  width: 130px;
  height: 130px;
  border-radius: 6px;
  display: block;
  margin: 0 auto;
}

.qr-caption {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-top: 6px;
  font-weight: 500;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 6px);
}

/* 即时讨论与评论区 */
.discussions-section {
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  cursor: pointer;
  user-select: none;
  background: var(--vp-c-bg-mute);
  transition: background 0.2s;
}

.section-header:hover {
  background: var(--vp-c-bg-soft);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.status-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.status-badge.warning {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.status-badge.success {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.toggle-btn {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
}

.section-content {
  padding: 20px;
  border-top: 1px solid var(--vp-c-border);
}

/* 开通指南 */
.config-guide {
  padding: 16px;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-border);
  border-radius: 8px;
}

.guide-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.guide-banner strong {
  color: var(--vp-c-text-1);
  display: block;
  margin-bottom: 4px;
}

.guide-icon {
  font-size: 20px;
}

.guide-steps h4 {
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: var(--vp-c-text-1);
}

.guide-steps ol {
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding-left: 20px;
  line-height: 1.8;
  margin: 0;
}

.guide-steps code {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-mute);
  padding: 2px 6px;
  border-radius: 4px;
}

.guide-repo-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.copy-btn {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-brand-1);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.copy-btn:hover {
  opacity: 0.85;
}

.guide-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.primary-btn {
  font-size: 12px;
  padding: 6px 14px;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  text-decoration: none !important;
  font-weight: 500;
  transition: opacity 0.2s;
}

.primary-btn:hover {
  opacity: 0.9;
}

.secondary-btn {
  font-size: 12px;
  padding: 6px 14px;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border);
  cursor: pointer;
  transition: all 0.2s;
}

.secondary-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.giscus-container {
  min-height: 80px;
}
</style>

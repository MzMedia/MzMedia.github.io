import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'

// 导入交互式工业与流媒体组件
import ModbusEndianCalculator from './components/ModbusEndianCalculator.vue'
import JessibucaPlayerDemo from './components/JessibucaPlayerDemo.vue'
import TslModelValidator from './components/TslModelValidator.vue'
import ProtocolMatrixTable from './components/ProtocolMatrixTable.vue'
import DocMeta from './components/DocMeta.vue'
import GiscusComment from './components/GiscusComment.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(DocMeta),
      'doc-after': () => h(GiscusComment)
    })
  },
  enhanceApp({ app }) {
    // 全局注册交互工具组件
    app.component('ModbusEndianCalculator', ModbusEndianCalculator)
    app.component('JessibucaPlayerDemo', JessibucaPlayerDemo)
    app.component('TslModelValidator', TslModelValidator)
    app.component('ProtocolMatrixTable', ProtocolMatrixTable)
  }
} satisfies Theme

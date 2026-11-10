import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MzMedia',
  description: '专为中小企业量身打造的企业级 AI 驱动物联网与视频融合平台',
  lang: 'zh-CN',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'MzMedia, 物联网, GB28181, ZLMediaKit, Spring AI, MCP, Modbus, MQTT, TDengine, RuoYi-Vue-Pro' }],
    ['meta', { name: 'theme-color', content: '#10b981' }]
  ],
  themeConfig: {
    logo: '/img/logo.png',
    siteTitle: 'MzMedia',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    nav: [
      { text: '💡 指南', link: '/guide/intro' },
      { text: '📹 视频中心', link: '/media/overview' },
      { text: '📡 物联网引擎', link: '/iot/overview' },
      { text: '🤖 Spring AI', link: '/ai/overview' },
      { text: '🏭 工业协同', link: '/synergy/pms' },
      { text: '🚀 部署运维', link: '/deploy/docker-compose' },
      { text: '🛡️ 架构防线', link: '/standards/git-sync' },
      {
        text: '🌐 代码仓库',
        items: [
          { text: 'Gitee 仓库', link: 'https://gitee.com/mzmedia/mz-media.git' },
          { text: 'GitHub 仓库', link: 'https://github.com/MzMedia/MzMedia.git' }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '平台概览',
          items: [
            { text: '📌 平台简介', link: '/guide/intro' },
            { text: '⚡ 破解四大痛点', link: '/guide/pain-points' },
            { text: '🏗️ 系统总体架构', link: '/guide/architecture' },
            { text: '🚀 10分钟快速起步', link: '/guide/quick-start' }
          ]
        }
      ],
      '/media/': [
        {
          text: '视频监控与流媒体中心',
          items: [
            { text: '🎥 视频中心概述', link: '/media/overview' },
            { text: '📡 GB/T 28181 信令交互', link: '/media/gb28181' },
            { text: '🔄 ZLMediaKit 集群对接', link: '/media/zlmediakit' },
            { text: '🎯 云台控制与预置位联动', link: '/media/ptz-and-preset' },
            { text: '💻 Jessibuca 播放引擎集成', link: '/media/player' },
            { text: '💾 云端录像与定时计划', link: '/media/cloud-record' }
          ]
        }
      ],
      '/iot/': [
        {
          text: '物联网引擎与多协议网关',
          items: [
            { text: '🌐 IoT 总体架构', link: '/iot/overview' },
            { text: '🔌 13+ 通信协议接入指南', link: '/iot/protocols' },
            { text: '🏭 Modbus 点位采集与字节序', link: '/iot/modbus' },
            { text: '📐 统一物模型 (TSL) 规范', link: '/iot/tsl' },
            { text: '⚙️ 双核心规则引擎', link: '/iot/rule-engine' },
            { text: '📊 TDengine 海量时序存储', link: '/iot/tdengine' }
          ]
        }
      ],
      '/ai/': [
        {
          text: 'Spring AI 与 MCP 智能中枢',
          items: [
            { text: '🤖 AIoT 智能中枢概述', link: '/ai/overview' },
            { text: '🔌 Model Context Protocol (MCP)', link: '/ai/mcp-protocol' },
            { text: '📈 时序数据运维 RAG 助手', link: '/ai/rag-ops' },
            { text: '⚡ 私有协议智能逆向解析', link: '/ai/protocol-reverse' },
            { text: '📦 Skill 脚本物化沙箱', link: '/ai/skills' }
          ]
        }
      ],
      '/synergy/': [
        {
          text: '企业中枢与协同矩阵',
          items: [
            { text: '📋 PMS 物联网工程项目交付', link: '/synergy/pms' },
            { text: '🏭 MES 制造执行与设备工单', link: '/synergy/mes' },
            { text: '📦 WMS 智能仓储与备件库存', link: '/synergy/wms' },
            { text: '📊 GoView 低代码数字大屏', link: '/synergy/report' }
          ]
        }
      ],
      '/deploy/': [
        {
          text: '安装部署与运维',
          items: [
            { text: '🐳 Docker Compose 快速编排', link: '/deploy/docker-compose' },
            { text: '🏢 生产环境高可用部署', link: '/deploy/production' },
            { text: '❓ 常见排错指南 (FAQ)', link: '/deploy/faq' }
          ]
        }
      ],
      '/standards/': [
        {
          text: '规范与架构红线',
          items: [
            { text: '🔀 Git 协作与上游同步 4 步法', link: '/standards/git-sync' },
            { text: '🛡️ AI Agent 五大架构防线', link: '/standards/agent-rules' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MzMedia/MzMedia' }
    ],
    footer: {
      message: '基于 GNU AGPL-3.0 协议开源',
      copyright: 'Copyright © 2026 MzMedia Team. All rights reserved.'
    }
  }
})

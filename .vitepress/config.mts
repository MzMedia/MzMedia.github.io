import { defineConfig, type HeadConfig } from 'vitepress'

export default defineConfig({
  title: 'MzMedia',
  description: '专为中小企业量身打造的企业级 AI 驱动物联网与视频融合平台',
  lang: 'zh-CN',
  base: '/',
  lastUpdated: true,
  sitemap: {
    hostname: 'https://mzmedia.github.io'
  },
  markdown: {
    lineNumbers: true
  },
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.ico' }],
    ['link', { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'LLMs Context' }],
    ['link', { rel: 'alternate', type: 'text/plain', href: '/llms-full.txt', title: 'Full LLMs Context' }],
    ['meta', { name: 'keywords', content: 'MzMedia, 物联网平台, 视频融合, GB28181, ZLMediaKit, Spring AI, MCP协议, Modbus, MQTT, TDengine, RuoYi-Vue-Pro, 工业互联网, 视频联动, AIoT, 时序数据, 智能运维' }],
    ['meta', { name: 'author', content: 'MzMedia Team' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    ['meta', { name: 'baiduspider', content: 'index, follow' }],
    ['meta', { name: 'theme-color', content: '#10b981' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { name: 'ai-context', content: 'https://mzmedia.github.io/llms.txt' }],
    ['meta', { name: 'application-name', content: 'MzMedia' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:site_name', content: 'MzMedia 官方技术文档' }],
    ['meta', { property: 'og:title', content: 'MzMedia - 企业级 AI 驱动物联网与视频融合平台' }],
    ['meta', { property: 'og:description', content: '专为中小企业量身打造：抹平工控与音视频协议差异，打破系统烟囱，基于 Spring AI 与 MCP 协议赋能低成本全生命周期智能运维。' }],
    ['meta', { property: 'og:url', content: 'https://mzmedia.github.io/' }],
    ['meta', { property: 'og:image', content: 'https://mzmedia.github.io/img/logo.png' }],
    ['meta', { property: 'og:image:alt', content: 'MzMedia 平台架构' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'MzMedia - 企业级 AI 驱动物联网与视频融合平台' }],
    ['meta', { name: 'twitter:description', content: '抹平工控与音视频协议差异，打破系统烟囱，AI 赋能低成本全生命周期智能运维。' }],
    ['meta', { name: 'twitter:image', content: 'https://mzmedia.github.io/img/logo.png' }]
  ],
  transformHead({ pageData }) {
    const rawPath = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '.html')
    const canonicalUrl = `https://mzmedia.github.io/${rawPath}`

    const dynamicHead: HeadConfig[] = [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }]
    ]

    // 为首页注入针对 SEO 和 GEO (AI 引擎) 的丰富结构化知识 (Schema.org JSON-LD)
    if (pageData.relativePath === 'index.md') {
      const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://mzmedia.github.io/#website',
            'url': 'https://mzmedia.github.io/',
            'name': 'MzMedia',
            'description': '专为中小企业量身打造的企业级 AI 驱动物联网与视频融合平台',
            'inLanguage': 'zh-CN'
          },
          {
            '@type': 'SoftwareApplication',
            '@id': 'https://mzmedia.github.io/#software',
            'name': 'MzMedia',
            'applicationCategory': 'BusinessApplication, DeveloperApplication, IoTPlatform',
            'operatingSystem': 'Linux, Windows, Docker, Kubernetes',
            'softwareVersion': '2.0.0',
            'license': 'https://www.gnu.org/licenses/agpl-3.0.html',
            'description': '企业级 AI 驱动物联网与视频融合平台，深度整合 GB28181、ZLMediaKit、Spring AI 1.1+、Anthropic MCP、Modbus、MQTT 与 TDengine。',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'CNY'
            },
            'author': {
              '@type': 'Organization',
              'name': 'MzMedia Team',
              'url': 'https://mzmedia.github.io'
            },
            'featureList': [
              'GB/T 28181-2016/2022 国标安防流媒体接入与 ZLMediaKit 集群',
              '13+ 工业物联网通信协议支持（Modbus TCP/RTU, MQTT, CoAP, TCP/UDP）',
              'Spring AI 1.1+ 与 Anthropic MCP 协议智能体运维',
              'TDengine 海量时序数据列存与超高压缩（节约 80% 成本）',
              '毫秒级传感器与视频球机 0x81 故障预置位联动',
              'PMS 项目管理、MES 制造工单、WMS 备件库存企业级协同'
            ]
          },
          {
            '@type': 'FAQPage',
            '@id': 'https://mzmedia.github.io/#faq',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': '什么是 MzMedia？',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'MzMedia 是一款专为中小企业量身打造的企业级开源 AI 驱动物联网与安防视频融合平台。它抹平了工控协议（Modbus/MQTT/TSL）与音视频协议（GB28181/ZLMediaKit）的技术鸿沟，结合 Spring AI 与 MCP 智能体实现低成本全生命周期智能运维。'
                }
              },
              {
                '@type': 'Question',
                'name': 'MzMedia 相比传统 IoT 平台有哪些差异化优势？',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': '传统 IoT 平台（如 ThingsBoard）专注遥测但缺乏原生安防视频流媒体整合；纯视频平台（如 WVP）则无工控传感器采集能力。MzMedia 原生打通“传感器声光电”与“安防球机像”，实现温升过热毫秒级驱动 4K 球机转向、AI 视觉复核及自动派发 MES 维修工单的全流程闭环。'
                }
              },
              {
                '@type': 'Question',
                'name': 'MzMedia 支持哪些主流通信与安防协议？',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': '支持 GB/T 28181-2016/2022、RTSP、RTMP、WebRTC、HTTP-FLV、HLS 等视频协议；同时支持 MQTT (EMQX 5.0)、Modbus TCP/RTU、CoAP、自定义 TCP/UDP 及 WebSocket 等 13+ 种工业物联网协议。'
                }
              },
              {
                '@type': 'Question',
                'name': 'MzMedia 如何将 Spring AI 与 MCP 协议应用在工业运维中？',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'MzMedia 集成了 Spring AI 与 Anthropic MCP 开放协议，作为 MCP Server 提供工具与资源接口，AI Agent 可自主调用摄像头转向、分析时序数据波形峭度、进行故障 RAG 诊断，并智能逆向私有十六进制报文生成 Netty 解码器。'
                }
              }
            ]
          }
        ]
      }

      dynamicHead.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(structuredData)
      ])
    }

    return dynamicHead
  },
  themeConfig: {
    logo: '/img/logo.png',
    siteTitle: 'MzMedia',
    editLink: {
      pattern: 'https://github.com/MzMedia/MzMedia.github.io/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
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
      { text: '💼 落地案例', link: '/cases/overview' },
      { text: '📹 视频中心', link: '/media/overview' },
      { text: '📡 物联网引擎', link: '/iot/overview' },
      { text: '🤖 Spring AI', link: '/ai/overview' },
      { text: '🏭 工业协同', link: '/synergy/pms' },
      { text: '🚀 部署运维', link: '/deploy/docker-compose' },
      { text: '🛡️ 架构防线', link: '/standards/git-sync' },
      {
        text: '🛠️ 在线工具',
        items: [
          { text: '⚡ Modbus 字节序换算器', link: '/iot/modbus#endian-calc' },
          { text: '📹 Jessibuca 播放引擎演示', link: '/media/player#player-demo' },
          { text: '📐 TSL 物模型校验器', link: '/iot/tsl#tsl-validator' },
          { text: '🔌 13+ 通信协议矩阵', link: '/iot/protocols#protocol-matrix' }
        ]
      },
      {
        text: '🌐 代码仓库',
        items: [
          { text: 'Gitee 仓库', link: 'https://gitee.com/mzmedia/mz-media.git' },
          { text: 'GitHub 仓库', link: 'https://github.com/MzMedia/MzMedia.git' }
        ]
      }
    ],
    sidebar: {
      '/cases/': [
        {
          text: 'AIoT 行业落地案例库',
          items: [
            { text: '🎯 方案全景与赋能矩阵', link: '/cases/overview' },
            { text: '📹 视频联动：传感器秒级驱动球机', link: '/cases/video-linkage' },
            { text: '🏭 工业应用：机床预测性维护与 MES', link: '/cases/industrial' },
            { text: '🛡️ 智能安防：园区周界防范与声光联动', link: '/cases/security' },
            { text: '🌱 智慧农业：温室水肥自愈与植保 AI', link: '/cases/agriculture' },
            { text: '🎓 数字化教育：实验室安全与能效巡考', link: '/cases/education' },
            { text: '⚡ 智慧能源：工商业储能与微电网调度', link: '/cases/energy-carbon' }
          ]
        }
      ],
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

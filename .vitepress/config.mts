import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "青云学研社产品文档",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
    ],

    sidebar: {
      // 当用户位于 `guide` 目录时，会显示此侧边栏
      '/docs/qingyun_oss/': [
        {
          text: '配套控件文档',
          items: [
            { text: '青云对象存储控件文档', link: '/docs/qingyun_oss/控件文档/青云对象存储控件文档.md' }
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

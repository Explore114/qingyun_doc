// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress';
import MNavLinks from './components/MNavLinks.vue'


export default {
  extends: DefaultTheme,
  
    Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(DefaultTheme.Layout, props)
  },
  
  enhanceApp({ app}) {
        app.component('MNavLinks' , MNavLinks)
    // 注册全局组件
  }
} satisfies Theme

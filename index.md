---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "青云学研社"
  text: "产品文档"
  tagline: 一起play！
  actions:
    - theme: brand
      text: 青云对象存储文档
      link: /docs/qingyun_oss/控件文档/青云对象存储控件文档.md

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---


<script setup>
  import { VPTeamMembers } from 'vitepress/theme'
const members = [
  {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1186846272&s=640',
    name: '云碧学者',
    title: '社长、文档编写、项目开发',
    links: [
      { icon: 'qq', link: 'http://1186846272.qzone.qq.com' },
    ]
  },
  {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3660539282&s=640',
    name: 'Explore',
    title: '文档构建管理',
    links: [
      { icon: 'qq', link: 'http://3660539282.qzone.qq.com' },
      { icon: 'github', link: 'https://github.com/Explore114' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/1791848194' },
    ]
  },
  {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2815418818&s=640',
    name: 'Qeeo',
    title: '青云对象储存控件开发',
    links: [
      { icon: 'qq', link: 'http://2815418818.qzone.qq.com' },
    ]
  },
  
]
</script>

## 管理/开发
<VPTeamMembers size="small" :members />
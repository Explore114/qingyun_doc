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
    - theme: brand
      text: 社团公告
      link: /docs/announcement/notice/友链指南.md
    - theme: alt
      text: 青云系列项目集合
      link: /docs/nav/

features:
  - title: 免费🆓
    details: 所有服务免费使用哟
  - title: 快速稳定📍
    details: 怎么可能跑路
  - title: 持续更新🆕
    details: 稳定更新服务更有保障
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
    title: '文档编写、项目开发',
    links: [
      { icon: 'qq', link: 'http://3660539282.qzone.qq.com' },
      { icon: 'github', link: 'https://github.com/Explore114' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/1791848194' },
    ]
  },
  {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2815418818&s=640',
    name: 'Qeeo',
    title: '文档编写、项目开发',
    links: [
      { icon: 'qq', link: 'http://2815418818.qzone.qq.com' },
    ]
  },
  {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2418587005&s=640',
    name: 'alpt 小圳',
    title: '项目开发',
    links: [
      { icon: 'qq', link: 'http://2418587005.qzone.qq.com' },
    ]
  },
  {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=575244421&s=640',
    name: '柠檬桶',
    title: '项目开发',
    links: [
      { icon: 'qq', link: 'http://575244421.qzone.qq.com' },
    ]
  },
  {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2450069268&s=640',
    name: '1614',
    title: '群机器人开发',
    links: [
      { icon: 'qq', link: 'http://2450069268.qzone.qq.com' },
    ]
  },
  
]
</script>

## 管理/开发 （排名不分先后）
<VPTeamMembers size="small" :members />
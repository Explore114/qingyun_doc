import type { NavData } from './types'

export const NAV_DATA: NavData[] = [
  {
    title: '青云系产品',
    items: [
      {
        icon: '',
        title: '青云对象存储',
        badge: {
          text: '青云团队',
          type: 'tip',
        },
        desc: '免费の存储服务，变成猫图床被ban后的替代品',
        link: 'https://cloud.hopex.top/apiv1/upfile/demo.php'
      },
    ]
  },
  {
    title: '友情链接',
    items: [
      {
        icon: 'https://baidu.com/',
        title: 'J的个人博客',
        badge: {
          text: '博客',
          type: 'tip',
        },
        desc: '我的个人博客，分享经验',
        link: 'https://blog.jsoftstudio.top/'
      },
      {
        icon: '',
        title: '虚位以待',
        badge: {
          text: '欢迎加入',
          type: 'info',
        },
        desc: '点击这里进入github仓库添加友链',
        link: 'https://github.com/Explore114/qingyun_doc/pulls'
      },
    ]
  },
]
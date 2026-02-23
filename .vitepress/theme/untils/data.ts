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
        icon: '',
        title: 'Duococo文档',
        badge: {
          text: '友链',
          type: 'tip',
        },
        desc: '一个文档（）',
        link: 'https://duoco.hinincs.top/'
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
// components/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    current:{
      type: String,
      value: "0"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    "tabbar": {
      "list": [
        {
          "id": "0",
          "pagePath": "/pages/index/index",
          "text": "星球基地",
          "iconPath": "https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/icon-index.png",
          "selectedIconPath": "https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/icon-index-selected.png",
        },
        {
          "id": "1",
          "pagePath": "/pages/my/my",
          "text": "我的基地",
          "iconPath": "https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/icon-personal.png",
          "selectedIconPath": "https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/icon-personal-selected.png",
        }
      ]
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

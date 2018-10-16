// pages/inviteFriend/inviteFriend.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pNum:0,
    userId:''
  },
  onShow: function () {
    app.getUserInfo((userInfo) => {
      this.setData({
        userId: userInfo.userId
      })
      wx.request({
        url: app.globalData.domain + '/api/wx/invite/my/' + userInfo.userId,
        dataType:'json',
        success: function (res) {
          if(res.data.code==0){
            this.setData({
              num: res.data.data.myInvitationInfo.inviteNum
            })
          }
        }
      })
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '我已成为车主星系公民，邀请您一起获取星钻，越早加入星钻越多',      imageUrl:'https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/v2/share-prod.png',
      path: 'pages/index/index?sourceId='+this.data.userId
    }
  }
})
// pages/renwu/renwu.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    forceValue: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getList();
  },
  getList() {
    const me = this
    wx.request({
      url: app.globalData.domain + '/api/wx/user/followlist/' + app.globalData.userInfo.userId,
      success: function (res) {
        if (res.data.code === '0') {
          me.setData({
            list: res.data.data.followlist.details
          })
        }
      }
    })
  },
  toPage(evt) {
    const data = evt.currentTarget.dataset;
    const complete = data.complete;
    const name = data.name;
    const code = data.code;

    if(!complete) {
      wx.redirectTo({
        url: '/pages/gongzhonghao/gongzhonghao?name=' + name + '&sourceCode=' + code ,
      })
    }
  },
  // toOther(e) {
  //   wx.request({
  //     url: app.globalData.domain + '/api/wx/ad/report',
  //     method: 'POST',
  //     data: { 
  //       "advertiserName": "测试合作方", 
  //       "moduleName": "测试业务板块", 
  //       "type": "0",
  //       "uId": app.globalData.userInfo.userId
  //     },
  //     success: function (res){
  //       console.log(res)
  //     }
  //   });
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const me = this;
    wx.request({
      url: app.globalData.domain + '/api/force/user/total/' + app.globalData.userInfo.userId,
      success: function (res) {
        if (res.data.code === '0') {
          me.setData({
            forceValue: res.data.data.totalDetail.totalAmount
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
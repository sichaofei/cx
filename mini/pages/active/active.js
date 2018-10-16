// pages/active/active.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: [
      { "time": 1, select: 0 },
      { "time": 2, select: 0 },
      { "time": 3, select: 0 },
      { "time": 4, select: 0 },
      { "time": 5, select: 0 },
      { "time": 6, select: 0 },
      { "time": 7, select: 0 },
    ],
    day:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getUserInfo((userInfo) => {
      wx.request({
        url: app.globalData.domain + '/api/wx/user/getLoginDays/'+userInfo.userId,
        success: (res) => {
          let day = res.data.data.userAwardRecord.signCount
          this.loginDay(day)
        }
      })
    })
    
  },
// 显示 登陆天数
loginDay(date){
  for(var a=0;a<date;a++){
    let time="time["+a+"].select"
      this.setData({
        [time]:1
      })
  }
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
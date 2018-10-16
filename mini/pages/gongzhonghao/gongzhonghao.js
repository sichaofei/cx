// pages/gongzhonghao/gongzhonghao.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    sourceCode: '',
    validateCode: '',
    ensure:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      sourceCode: options.sourceCode
    })
  },
  bindGZH(evt) {
    if(!this.data.ensure){
      return;
    }
    wx.request({
      url: app.globalData.domain + '/api/wx/user/follow',
      method: 'POST',
      data: { 
        "userId": app.globalData.userInfo.userId, 
        "sourceCode": this.data.sourceCode,
        "validateCode": evt.detail.value.validateCode
      },
      success: function (res) {
        if(res.data.code === '0') {
          wx.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 1000,
            complete: function () {
              wx.redirectTo({
                url: '/pages/renwu/renwu'
              })
            }
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
      }
    })
  },
  yzmChange(e){
    if(e.detail.value.trim()){
      this.setData({
        ensure:'ensure'
      })
    }else{
      this.setData({
        ensure: ''
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
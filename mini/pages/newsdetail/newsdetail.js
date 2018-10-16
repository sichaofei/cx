// pages/newsdetail/newsdetail.js
var WxParse = require('../../utils/wxParse/wxParse.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getNewsDetail(options.id);
  },
  getNewsDetail: function (id) {
    wx.request({
      url: app.globalData.domain + '/api/news/detail?id=' + id,
      // url: 'http://192.168.70.55:9011/api/news/detail?id=4028c6b7651868fd0165187723ef0008',
      success: (results) => {
        this.setData({
          detail: results.data.data
        })
        WxParse.wxParse('wxParseDescription', 'html', this.data.detail.content, this, 10);
      }
    })
  },
  toSave: function () {
    wx.navigateTo({
      url: '/pages/save/save?img=' + this.data.detail.qrcodeImage,
    })
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
    const pages = getCurrentPages();
    const prePage = pages[pages.length-2];

    if(prePage) {
      prePage.showPrize(this.data.id)
    }
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
// pages/duihuan/duihuan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageNum: 1,
    pageSize: 4,
    totalPages: 1,
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadProds();
  },
  loadProds() {
    const me = this;
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
    });
    wx.request({
      url: app.globalData.domain + '/api/goods/query',
      // url: 'http://192.168.70.44:9951/api/goods/query',
      method: 'POST',
      data: {
        pageNum: me.data.pageNum,
        pageSize: me.data.pageSize
      },
      success: function (res) {
        if (res.data.code === '0') {
          const list = [...me.data.list, ...res.data.data.pageStarGoods.list];
          me.setData({
            list: list,
            totalPages: res.data.data.pageStarGoods.pages
          });
        }
      },
      complete: (data) => {
        me.setData({
          isLoading: false
        });
        wx.hideLoading();
      }
    })
  },
  reachBottom: function () {
    console.log(1)
    let { pageNum, totalPages, isLoading } = this.data;

    if (pageNum >= totalPages || isLoading) {
      return;
    }

    this.setData({
      isLoading: true,
      pageNum: this.data.pageNum + 1
    });

    this.loadProds();
  },
  toProd(e) {
    wx.navigateTo({
      url: '/pages/prod/prod?id=' + e.currentTarget.id
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
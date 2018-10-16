//app.js
App({
  onLaunch: function () {
  },
  getUserInfo(cb){
    if(this.globalData.userInfo) {
      typeof cb == 'function' && cb(this.globalData.userInfo)
    }else {
      this.login(cb)
    }
  },
  login(cb) {
    let me = this
    wx.login({
      success: (res) => {
        let data = { code: res.code }
        wx.request({
          url: me.globalData.domain + '/api/wx/user/login',
          data: data,
          method: 'post',
          success: (res) => {
            const data = res.data
            console.log(data)
            if (data.code === '0') {
              me.globalData.userInfo = data.data.userinfo
              typeof cb == 'function' && cb(me.globalData.userInfo)
            } else {

            }

          }
        });
      }
    })
  },
  globalData: {
    isIphoneX: false,
     domain: 'https://service.chetuobang.com',
    // domain: 'https://testservice.chetuobang.com',
    // domain: 'http://192.168.70.42',
    userInfo: null
  }
})
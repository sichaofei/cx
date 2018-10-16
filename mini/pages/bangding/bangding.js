// pages/bangding/bangding.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnTxt: '获取验证码',
    timer: null,
    phone: '',
    selected:true,
    name:"",
    shenfen:"",
    yanzheng:"",
    placeholder:["姓名","身份证","请输入手机号","请输入验证码"]
  },
  // 获取焦点清空value
  focus(e){
    let a = e.target.dataset.id
    let nav="placeholder["+a+"]"
    this.setData({
      [nav]:""
    })
  },
  blur(e){
    this.setData({
      placeholder: ["姓名", "身份证", "请输入手机号", "请输入验证码"]
    })
  },
  name(e){
    this.setData({
      name: e.detail.value
    },()=>{
      this.selectedChange()
    })
  },
  shenfen(e) {
    console.log(e)
    this.setData({
      shenfen:e.detail.value
    },()=>{
      this.selectedChange()
    })
  },
  yanzheng(e) {
    this.setData({
      yanzheng: e.detail.value
    },()=>{
      this.selectedChange()
    })
  },
// 验证是否输入
selectedChange(){
  if (this.data.name.length != 0 && this.data.shenfen.length != 0 && this.data.phone != 0 && this.data.yanzheng.length != 0) {
    this.setData({
      selected: false
    })
}else{
    this.setData({
      selected: true
    })
}
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindinput: function (e) {
    this.setData({
      phone: e.detail.value
    },()=>{
      this.selectedChange()
    })
  },
  getCode: function () {
    if (this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }
    var myreg = /^1[3|7|5|8]\d{9}$/;
    if (!myreg.test(this.data.phone) || this.data.phone == '') {
      wx.showToast({
        title: '请输入有效的手机号码！',
        icon: 'none'
      });
      return false;
    }
    this.setData({
      disable: true
    })
    wx.request({
      method: "GET", 
      dataType: "jsonp",
      url: 'https://sms.chetuobang.com/sms.php?sms_type=1', 
      data: {'tel_phone' : this.data.phone},
      jsonP: "callback",
      success: function (data) {
        console.log("请求成功，正在处理响应消息");
      },
      error: function () {
        console.log("输入不正确");
      }
    });
    this.countDown(60);
  },
  countDown: function (i) {
    const me = this;
    me.timer = setTimeout(function () {
      if (i < 1) {
        me.setData({
          btnTxt: '获取验证码',
          disable: false
        })

        clearTimeout(me.timer);
        return;
      }
      me.setData({
        btnTxt: i-- + '秒后再次获取'
      })

      me.countDown(i);
    }, 1000);
  },
  submit: function (e) {
    const me = this;
    if (e.detail.value.username == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return;
    }
    if (e.detail.value.identify == '') {
      wx.showToast({
        title: '请输入身份证',
        icon: 'none'
      });
      return;
    }
    if (e.detail.value.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }
    wx.request({
      method: "GET", 
      dataType: "jsonp",
      url: 'https://sms.chetuobang.com/sms.php?sms_type=2', 
      data: {
        tel_phone: this.data.phone,
        verify_code: e.detail.value.code
      },
      jsonP: "callback",
      success: function (res) {
        let data = res.data.replace('callback(', '').replace(')','');
        data = JSON.parse(data);
        
        if (data.code == 200) {
          me.bind(e);
        } else {
          wx.showToast({
            title: '验证失败',
          })
        }
      }
    });
  },
  bind: function (e) {
    wx.request({
      url: app.globalData.domain + '/api/wx/user/bindId',
      method: "POST", 
      data: { 
        "userId": app.globalData.userInfo.userId, 
        "realName": e.detail.value.username, 
        "idCard": e.detail.value.identify, 
        "mobile": e.detail.value.phone 
      },
      success: function(res) {
        if(res.data.code === '0') {
          wx.showToast({
            title: '绑定成功',
            complete: () => {
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }, 1000)}
          })
         
        }else {
          wx.showToast({
            title: '绑定失败',
          })
        }
      } 
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
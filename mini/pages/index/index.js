//index.js
import bg from '../../animation/bg.js'
import MeteroBg from '../../animation/MeteroBg.js'
import Wave from '../../animation/Wave.js'
import Zuan from '../../animation/Zuan.js'
import Circles from '../../animation/Circles.js'
import util from '../../animation/util.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    bgCtx0: null,
    bgCtx: null,
    waveCtx: null,
    step: 0,
    ratio: 0.6,
    r: 1,
    bg: null,
    array: [],
    leftArray: [],
    isShow: true,
    userInfo: null,
    forceValue: 0.0,
    countDown: '16',
    isTips: true,
    count: 0,
    circles: null,
    hidden1:1,
    hidden2:1,
    model:0,
    zuanPos: [[300, 110], [550, 640], [600, 520], [230, 230],  [400, 300],
             [600, 800],[460, 140], [540, 980], [400, 420], [600, 340],
             [70, 820], [180, 900], [290, 800], [60, 1000], [400, 930],
             [450, 600], [98, 98]]
  },
  onLoad: function () {
    wx.getSystemInfo({
      success: (res)=> {
        if (res.model == "iPhone X"){
         this.setData({
           model:1
         })
        }
      }
    })
    app.getUserInfo((userInfo) => {
      console.log(userInfo)
      if(userInfo.isFirstLogin==0){
        this.setData({
          hidden1:1,
          hidden2:1
        })
      }else{
        this.setData({
          hidden1: 0,
          hidden2: 1
        })
      }
      this.setData({
        userInfo: userInfo,
        forceValue: userInfo.forceValue
      })
    })

    const waveCtx = wx.createCanvasContext('wave');
    const r = wx.getSystemInfoSync().screenWidth / 750;
    const bgCtx0 = wx.createCanvasContext('bg0');
    const circlesCtx = wx.createCanvasContext('circles');
    const circles = new Circles(circlesCtx, r);

    this.setData({
      waveCtx: waveCtx,
      bg: new bg(wx.createCanvasContext('bg')),
      meteroBg: new MeteroBg(wx.createCanvasContext('metero')),
      r: r,
      circles: circles
    })
    // 隐藏引导页
    
    // this.loadZuan();
    this.setData({
      wave: new Wave(waveCtx, r, 0.6)
    });
    this.loop();
    
    util.drawBgBall(bgCtx0);
    
    
    this.countDown();
  },
  countDown() {
    const date1 = new Date();
    const date2 = new Date('2018-09-24');
    const day = parseInt((date2.getTime() - date1.getTime()) / (24 * 60 * 60 * 1000));
    this.setData({
      countDown: day
    })
  },
  showTip() {
    this.setData({
      isTips: false
    })
    setTimeout(()=>{
      this.setData({
        isTips: true
      })
    }, 2500)
  },
  loadZuan() {
    const me = this;
    wx.request({
      url: app.globalData.domain + '/api/token/user/unreceivelist?userId=485891121592012800',
      success: function (res) {
        const detail = res.data.data.unReceiveList.details;
        let array = detail.slice(0, 13);

        if (detail.length) {
          if (detail.length > 17) {
            me.setData({
              array: detail.slice(0, 17),
              leftArray: detail.slice(17)
            });
          }else {
            me.setData({
              array: detail
            })
          }
          me.setData({
            ratio: res.data.data.unReceiveList.unreceiveRate
          })
        }else {
          me.setData({
            isShow: true
          })
        }

        me.data.wave.loop(me.data.ratio);
      }
    })
  },
  receive(e) {
    const index = e.currentTarget.dataset.id;
    let arr = this.data.array;
    arr.splice(index, 1);

    this.setData({
      array: arr
    })

    if(arr.length == 0) {
      if(this.data.leftArray.length) {
        this.setData({
          isShow: true
        })
      }else {
        this.setData({
          array: this.data.leftArray,
          leftArray: []
        })
      }
      
    }
  },
  loop: function () {
    const r = this.data.r;
    this.data.count++;
    this.data.count % 20 == 0 && this.data.circles.drawCircles();
    this.data.wave.fillWave();
    this.data.count % 20 == 0 && this.data.bg.drawStars();
    // this.data.count % 20 == 0 && this.data.meteroBg.drawMeteros();
    setTimeout(this.loop, 34);
  },
  minus: function () {
    ratio = ratio - 0.1;
  },
  toGonggao: function () {
    wx.navigateTo({
      url: '/pages/gonggao/gonggao'
    })
  },
  toRenwu: function () {
    wx.navigateTo({
      url: '/pages/renwu/renwu'
    })
  },
  toDuihuan: function () {
    wx.navigateTo({
      url: '/pages/duihuan/duihuan'
    })
  },
  toMy: function () {
    wx.navigateTo({
      url: '/pages/my/my'
    })
  },
  toYuanli: function () {
    wx.navigateTo({
      url: '/pages/yuanli/yuanli'
    })
  },
  onShareAppMessage() {
    return {
      title: '车主星系',
      path: 'pages/index/index',
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  hiddenF1() {
    this.setData({
      hidden1: 1,
      hidden2:0
    })
  },
  hiddenF2(){
    this.setData({
      hidden2:1
    })
  }
})

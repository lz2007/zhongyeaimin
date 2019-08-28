var wxbarcode = require('../../utils/index.js');
const app = getApp()
var t;
Page({

  data: {
    code: '565848454854',
    setInter: '',
    integral: 0,
    is_show: true
  },

  onLoad: function () {
    var that = this;
    app.request({
      url: 'pay/code',
    }).then(response => {
      that.setData({
        code: response.code,
      })
      wxbarcode.barcode('barcode', response.code, 680, 400);
    })
    
    // setTimeout(that.endSetInter,2000)
    // wxbarcode.qrcode('qrcode', 'http://blog.geekxz.com', 420, 420);
  },
  onShow() {
    //剩余积分
    var that = this;
    app.request({ url: 'user/integral', }).then(res => {
     
      that.setData({
        integral: res.integral,
      })
      wx.hideLoading()
    })
    if(!that.data.is_show){
      that.setData({
        is_show: true,
      })
    }
    that.startSetInter();
  },

  onHide: function () {
    //写在onHide()中，切换页面或者切换底部菜单栏时关闭定时器。
    //离开页面停止计时器
    this.data.is_show = false
  },

  startSetInter: function (e) {
    if (!this.data.is_show) return false;
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        that.endSetInter()
        app.request({ url: 'pay/signature', }).then(res => {
          if (res) {
            if (res !== true) {
              wx.requestPayment(
                {
                  'timeStamp': res.timestamp,
                  'nonceStr': res.nonceStr,
                  'package': res.package,
                  'signType': res.signType,
                  'paySign': res.paySign,
                  'success': function (res) {
                    console.log(res)
                    wx.showToast({
                      title: '支付成功',
                    })
                  },
                  'fail': function (res) {
                    wx.showToast({
                      title: '支付失败',
                    })
                  },
                })
            } else {
              setTimeout(function () {
                that.startSetInter();
              }, 500)
            }

          } else {
            setTimeout(function () {
              that.startSetInter();
            }, 500)
          }


        })
      }
      , 500);
  },
  endSetInter: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
})
const app = getApp()
Page({
  data: {
    navlist:[{name:"我的劵"},{name:"我的积分"}],
    nav1list: [{ name: "所有券" }, { name: "待使用" }, { name: "已使用" }, { name: "已过期" }],
    TabCur: 0,
    TabCur1:0,
    scrollLeft: 0,
    scrollLeft1:0,
    integral: '0',
    Coupon:[],
    integralR:[],
    yy:0

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  tabSelect1(e) {
    this.setData({
      TabCur1: e.currentTarget.dataset.id,
      scrollLeft1: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  onLoad:function(){
    const self = this
    const quan_type = wx.getStorageSync('quan_type');
    if (quan_type == 1) {
        self.setData({
          TabCur:1,
          scrollLeft:-60
        })
    }
    self.setData({
      userinfo: wx.getStorageSync("userInfo"),
    })
    app.request({ url:'user/integral_log?status=2'}).then(res=>{
      console.log(res)
      this.setData({
        integralR:res.data
      })
    })
  },
  onShow() {
    //剩余积分
    app.request({ url: 'user/integral', }).then(res => {
      var that = this;
      that.setData({
        integral: res.integral,
      })
      wx.hideLoading()
    })
    app.request({ url: 'card', }).then(res => {
      var that = this;
      that.setData({
        Coupon: res,
      })
    })
  },
  onReachBottom: function () {
    this.data.yy += 1;
    console.log(this.data.yy)
    const list = this.data.integralR
    app.request({
      url: 'user/integral_log?status=2' +'&page='+ this.data.yy }).then(res => {
      console.log(res.data)
      if (res.data.length == 0) {
        wx.showToast({
          title: '我是有底线的!!!',
          icon: 'none'
        })
      } else {
        list.push(...res.data)
        console.log(list)
        this.setData({
          integralR: list
        })
      }

    })
  },
})
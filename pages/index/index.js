//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    address:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [{
      images: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
    }],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    integral:'0',
    Coupon:'0',
    newsnum:0,
    iconList:[
      {
        icon: '../images/ping.png',
        name: '聚实惠'
        },
      {
        icon: '../images/jiaodian.png',
        name: '集点活动'
      }, {
        icon: '../images/libao.png',
        name: '积分换券'
      }, {
        icon: '../images/prize.png',
        name: '积分抽奖'
      }
    ]
  },
  //事件处理函数
  onLoad: function() {
    const self = this;
    wx.showLoading({
      title: '加载中',
    })
   
    //轮播图 1头部  3底部
    app.request({ url: 'banner/1',}).then(res=>{
      console.log('res===', res);
      self.setData({
        imgUrls: res,
      })
    })
   
    
 
  },
  onShow:function(){
    const self = this;
  

    //剩余积分
    self.initUser()
  

    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
  },
  // 跳转到会员信息
  imageclick:function(){
    wx.navigateTo({
      url: '/pages/vipinformation/vipinformation'
    });
  },
  huodong: function (e) {
   
    if (e.currentTarget.id == 0){
      wx.navigateTo({
        url: '/pages/mainNav/jushihui/jushihui'
      })
    } else if (e.currentTarget.id == 1){
      wx.navigateTo({
        url: '/pages/mainNav/jidian/jidian'
      })
    } else if (e.currentTarget.id == 2){
      wx.navigateTo({
        url: '/pages/mainNav/jifen/jifen'
      })
    } else if (e.currentTarget.id == 3){
      wx.navigateTo({
        url: '/pages/mainNav/choujiang/choujiang'
      })
    }
  },
  //账单
  bill: function (e) {
    wx.navigateTo({
      url: '/pages/bill/bill'
    })
  },
  code:function(){
    wx.navigateTo({
      url: '/pages/code/code'
    })
  },
  //点击轮播图点击量
  submit :function(e){
    console.log(e.currentTarget.dataset.id)
    app.request({ url: 'banner/increment/click/' + e.currentTarget.dataset.id, }).then(res => {
      console.log(res)
    })
  },
//查看更多
check:function(){
  wx.navigateTo({
    url: '/pages/mainNav/jushihui/jushihui'
    
  })
},
initUser: function() {
  const self = this
  if (wx.getStorageSync('token')) {
    app.request({ url: 'user', }).then(res => {
      console.log(res)
      self.setData({
        integral: res.integral,
        Coupon: res.card
      })
      wx.hideLoading()
      self.setData({
        userInfo: wx.getStorageSync("userInfo"),
      })
    })
    //印花活动
    app.request({ url: 'banner/2', }).then(res => {
      console.log(res)
      self.setData({
        hdxq: res,
      })
    }),
    //消息条数
    app.request({ url: 'push/count', }).then(res => {
      console.log(res)
      self.setData({
        newsnum: res.count,
      })
    })
    if (wx.getStorageSync('locationcity')) {
      self.setData({
        address: wx.getStorageSync('locationcity'),
      })
    } else {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          app.request({
            url: 'map/geocoder/location',
            data: { location: res.latitude + ',' + res.longitude }
          }).then(response => {
            wx.setStorageSync("address", response.address_component.city)
            self.setData({
              address: response.address_component.city,
            })
          })
        },
        fail() {
          wx.getLocation({
            success: function (res) {
              consoe.log(res)
            },
          })
        }
      })
    }
  } else {
    setTimeout(function () {
      self.initUser()
    }, 100)
  }
},
  code:function(){
    wx.switchTab({
      url: '../code/code'
    })
  },
  quan:function(e){
    wx.switchTab({
      url: '../Coupon/Coupon'
    })
  },
  hdxq:function(e){
    console.log(e)
    if (e.currentTarget.dataset.id){
      wx.setStorageSync('jd_id', e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '../mainNav/jidianxq/jidianxq',
      })
    }
    
  }
})
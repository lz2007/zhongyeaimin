// pages/mainNav /jifen/jifen.js
 const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jifen:[],
    integral:0,
  },

  submit:function(e){
    app.request({ url: 'card_integral/receive/' + e.currentTarget.dataset.id, method:'post'}).then(res=>{
      if (res){
        wx.showModal({
          title: '换取成功',
          content: '领取成功！到点使用二维码支付即可自动享受优惠',
          showCancel: true,
          cancelText: '积分抽奖',
          cancelColor: '',
          confirmText: '下次再抽',
          confirmColor: '',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
   
  },
  onShow:function(){
    app.request({ url: 'card_integral',}).then(res=>{
      console.log(res)
      this.setData({
        jifen: res,
      })
    })
    app.request({ url: 'user/integral', }).then(res => {
      console.log(res)
      this.setData({
        integral: res.integral,
      })
    })
  }
})
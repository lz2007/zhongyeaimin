// pages/mainNav /jidian/jidian.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  onShow: function(){
    app.request({ url: 'printing', }).then(res => {
      console.log(res)
      this.setData({
        list: res,
      })
    })
  },
  jidianxq: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.setStorageSync('jd_id', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/mainNav/jidianxq/jidianxq'
    })
  },
  
  
})
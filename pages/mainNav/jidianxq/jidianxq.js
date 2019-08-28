// pages/mainNav /jidianxq/jidianxq.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    show:false
  },
 
  onLoad: function () {
    console.log(wx.getStorageSync('jd_id'))
    app.request({ url: 'printing/' + wx.getStorageSync('jd_id'), }).then(res => {
      console.log(res)
      this.setData({
        list: res,
      })
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})
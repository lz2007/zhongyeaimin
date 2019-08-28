// pages/storeactivity/storeactivity.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    list: [{
      name: '景辉花园店',
      distance: '3.65km',
      address: '景辉花园商业街8号'
    }],
    Coupon: [],
    storename:'',
    storenum:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      address: wx.getStorageSync("address"),
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
    const store = wx.getStorageSync("storeid")
    console.log(store)
    app.request({ url: 'store/' + store }).then(res => {
      console.log(res)
      this.setData({
        Coupon: res.data,
        storename: res.name,
        storenum: res.id,
      })
    })
  },
  // 领取优惠券
  Receive(e) {
    console.log(e.currentTarget.dataset.id)
    app.request({ url: 'card/' + e.currentTarget.dataset.id, method: 'post' }).then(res => {
      console.log(res.message)
      if (res) {
        wx.showToast({
          title: '领取成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
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
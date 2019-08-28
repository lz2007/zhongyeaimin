// pages/activity/activity.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const self = this;
    wx.getLocation({
      success: function(res) {
        console.log(res)
        app.request({ url: 'store', data: { location: res.latitude + ',' + res.longitude ,code:wx.getStorageSync('locationcityid')}}).then(res=>{
          console.log(res)
          self.setData({
            list:res
          })
    })
      },
    })
    this.setData({
      address: wx.getStorageSync("locationcity") ? wx.getStorageSync("locationcity") : wx.getStorageSync("address"),
    })
  },
  storeactivity(e){
    wx.setStorageSync("storeid", e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/storeactivity/storeactivity',
    })
  },
  chooselocation(){
    wx.chooseLocation({
      success: function(res) {
        console.log(res)

      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
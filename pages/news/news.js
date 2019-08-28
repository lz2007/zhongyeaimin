// pages/news/news.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    yy:0 
  },
  xq: function (e) {
    wx.setStorageSync('newsid', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/newsdetails/newsdetails'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.request({url:'push'}).then(res=>{
      console.log(res.data)
      this.setData({
        list:res.data
      })
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
    this.data.yy += 1;
    console.log(this.data.yy)
    const list = this.data.list
    app.request({ url: 'push/' + "?page=" + this.data.yy}).then(res=>{
      console.log(res.data)
      if(res.data.length == 0){
        wx.showToast({
          title: '我是有底线的!!!',
          icon:'none'
        })
      }else{
        list.push(...res.data)
        console.log(list)
        this.setData({
          list: list
        })
      }
      
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
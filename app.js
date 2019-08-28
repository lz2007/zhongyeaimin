//app.js

App({
  request: require("/utils/request.js").request,
  globalData: {token:"dsfdsfdsfdsfdsfds"},
  onLaunch: function () {
    // wx.removeStorageSync('locationcity')
    // wx.removeStorageSync('locationcityid')
    wx.removeStorageSync('token')
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.login({
            success:res_login=>{
            if(res_login.code){
              wx.getUserInfo({
                withCredentials: true,
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.request({
                    url: 'user/userinfo',
                    data: { iv: res.iv, encryptData: res.encryptedData, code: res_login.code },
                    method: 'post',
                  }).then(response => {
                    wx.setStorageSync('userInfo', response.user);
                    wx.setStorageSync('token', response.token);
                    // this.globalData.userInfo = response.user
                    // this.globalData.token = response.token
                  })
                  

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
            }
          })
        
        } else {
          // 未授权，跳转到授权页面
          wx.reLaunch({
            url: '/pages/authorize/authorize',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
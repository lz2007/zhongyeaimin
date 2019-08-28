var app = getApp();
// request: require("../../utils/request.js");
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onAuth() {
   wx.showLoading({
     title: '正在授权中',
     mask: true,
   })
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: res_login => {
              console.log(res_login)
              if (res_login.code) {
                wx.getUserInfo({
                  withCredentials: true,
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    console.log(res)
                    app.request({
                      url: 'user/userinfo',
                      data: { iv: res.iv, encryptData: res.encryptedData, code: res_login.code },
                      method: 'post',
                    }).then(response => {
                      console.log(response)
                      if (response){
                        wx.setStorageSync('userInfo', response.user);
                        wx.setStorageSync('token', response.token);
                        wx.reLaunch({
                          url: '/pages/index/index',
                        })
                        wx.hideLoading();
                      }
                     
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
         
        }
      }
    })
  }
})
//对小程序的一个请求进行封装处理

const request = (opt = {}) => {
  return new Promise(function (resolve, reject) {
    var {
      url,
      data,
      method,
      header={},
    } = opt;

    if (!method) method = 'GET';

    if (url.indexOf('http') !== 0) {
      url = 'https://weixin.4006111786.com/wechat/' + url;
    }

    if (Object.keys(header).indexOf('content-type') === -1) {
      header['content-type'] = 'application/json';
    }

    if (Object.keys(header).indexOf('Authorization') === -1) {
      header['Authorization'] = wx.getStorageSync("token");
    }

    wx.request({
      url,
      data,
      method,
      header,
      success(response) {
        if(response.statusCode === 200) {
          if(response.data.code ===1) {
            resolve(response.data.data || true);
          } else {
            // reject(response.data.message);
            wx.showToast({
              title: response.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          // reject(response);
          wx.showToast({
            title: "系统出错",
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail(error) {
        reject(error);
      },
    });
  });
};
module.exports = {
  request
}
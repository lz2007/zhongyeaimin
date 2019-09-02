// pages/mainNav /jushihui/jushihui.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav1list: [{
      name: "全部"
    }, ],
    TabCur1: 0,
    scrollLeft1: 0,
    store: [],
    index: 0,
    Coupon: [
      []
    ]
  },

  tabSelect1(e) {
    this.setData({
      TabCur1: e.currentTarget.dataset.id,
      scrollLeft1: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  PickerChange(e) {
    console.log(e.detail.value)
    console.log(this.data.store[e.detail.value].id)
    this.load(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function () {
    const self = this
    setTimeout(function () {
      self.setData({
        loading: true
      })
    }, 500)
    self.load()
  },
  load(storeindex, goodindex) {
    const self = this
    // console.log(storeindex) 
    if (storeindex) {
      var storeindex = storeindex
    } else {
      var storeindex = 0
    }
    app.request({
      url: 'store/all'
    }).then(res => {
      self.setData({
        store: res
      })
      // console.log(storeindex) 
      app.request({
        url: 'store/catgory/' + self.data.store[storeindex].id
      }).then(res => {
        // console.log(res.catgory.length)
        if (res.catgory.length !== 0) {
          self.data.nav1list.splice(1, self.data.nav1list.length);
          self.data.nav1list.push(...res.catgory)
          self.setData({
            nav1list: self.data.nav1list
          })
          res.catgory.map((item, index) => {
            // + '/?catgory=' + item.id
            app.request({
              url: 'store/' + self.data.store[storeindex].id
            }).then(res => {
              // console.log(res)
              const Coupon1 = self.data.Coupon;
              Coupon1[index + 1] = res.data;
              self.setData({
                Coupon: Coupon1
              });
            });
          });
        } else {
          this.setData({
            nav1list: [{
              name: "全部"
            }]
          })
        }
        if (self.data.TabCur1 != 0) {}
        // console.log(self.data.nav1list[self.data.TabCur1].id)

      })
      app.request({
        url: 'store/' + res[0].id
      }).then(res => {
        console.log(res)
        this.setData({
          ['Coupon[0]']: res.data
        })
      })

    });
  },
  // 领取优惠券
  Receive(e) {
    console.log(e.currentTarget.dataset.id)
    app.request({
      url: 'card/' + e.currentTarget.dataset.id,
      method: 'post'
    }).then(res => {
      if (res) {
        wx.showToast({
          title: '领取成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})
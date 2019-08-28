const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,
    city:[]
  },
  onLoad() {
    let list = [];
    for (let i = 0; i < 26; i++) {
      list[i] = String.fromCharCode(65 + i)
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
    console.log(this.data.listCur)

    app.request({ url:'area/city'}).then(res=>{
      var city = this.data.city;
      city.push(...res);
      console.log(res)
      this.setData({
        city: city
      })
      console.log(res)
    })
    app.request({ url: 'area/hot' }).then(res => {
      console.log(res)

      this.data.city.unshift({
        code: 0,
        name: '热门城市',
        child: res
      })
      this.setData({
        city: this.data.city
      })
      console.log(res)
    })
  },
  onReady() {
    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function (res) {
      that.setData({
        boxTop: res.top
      })
    }).exec();
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function (res) {
      that.setData({
        barTop: res.top
      })
    }).exec()
  },
  //获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id],
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20);
      this.setData({
        listCur: that.data.list[num]
      })
    };
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },

  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },
  indexSelect(e) {
    let that = this;
    let barHeight = this.data.barHeight;
    let list = this.data.list;
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: list[i],
          movableY: i * 20
        })
        return false
      }
    }
  },
  // 点击选中城市
  clickcity:function(e){
    let id = e.currentTarget.dataset.id;
    let address = e.currentTarget.dataset.address
    console.log(id);
    console.log(address);
    app.request({ url: 'area', data: {'id': id}, method: 'POST' }).then(res => {
      wx.setStorageSync('locationcityid', id);
      wx.setStorageSync('locationcity', address);
      wx.navigateBack();
    })
  }
});
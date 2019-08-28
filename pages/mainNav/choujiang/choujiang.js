// pages/mainNav /choujiang/choujiang.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconList: [
      {
        icon: 'https://i.loli.net/2019/04/28/5cc56b07c114a.png',
        name: '聚实惠'
      },
      {
        icon: 'https://i.loli.net/2019/04/28/5cc56b07c114a.png',
        name: '集点活动'
      }, {
        icon: 'https://i.loli.net/2019/04/28/5cc56b07c114a.png',
        name: '积分换券'
      }, {
        icon: 'https://i.loli.net/2019/04/28/5cc56b07c114a.png',
        name: '积分抽奖'
      }, {
        icon: 'https://i.loli.net/2019/04/28/5cc56b07c114a.png',
        name: '聚实惠'
      },
      {
        icon: 'https://i.loli.net/2019/04/28/5cc56b07c114a.png',
        name: '集点活动'
      }
    ],
    activityid:'',
    mfintegral:"",
    integral:'',
    Coupon:[],
    card:false
  },

  guize:function(){
    wx.showModal({
      content: '1.活动时间：2020/1/2-2020/8/5。2.后台编辑活动规则文本，3.后台可以设计抽奖背景，抽奖样式，奖品名称份数及概率，奖品图片活动时间',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  //点击抽奖
  click:function(e){
    var self = this
    console.log(e.currentTarget.dataset)
    app.request({ url: 'draw_lottery/' + e.currentTarget.dataset.id, method:'post'}).then(res=>{
      console.log(res)
      var list = self.data.iconList;
      for(let i = 0; i < list.length; i++) {
        if (i == e.currentTarget.dataset.index) {
          //谢谢惠顾 不中奖
          if(Object.keys(res).indexOf('images') === -1) {
            list[i].icon = 'https://i.loli.net/2019/05/15/5cdbb1552d19d18076.jpg';
          } else {
            list[i].icon = res.images;
          }
          this.setData({
            integral: res.integral
          })
        } else {
          list[i].icon = 'https://i.loli.net/2019/04/28/5cc56b07c114a.png';
        }
      }
      self.setData({
        iconList: list
      })
    })
  },
  jp:function(){
   wx.navigateTo({
     url: '/pages/Prize/Prize',
   })
   
  },
  onShow:function(){
    app.request({ url: 'draw_lottery',}).then(res => {
      wx.setStorageSync("activityid", res.id)
      this.setData({
        activityid:res.id,
        mfintegral: res.integral
      })
    })
    app.request({ url: 'user/integral', }).then(res => {
      console.log(res)
      this.setData({
        integral: res.integral

      })
    })
  }
})
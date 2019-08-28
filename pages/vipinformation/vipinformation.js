// pages/vipinformation/vipinformation.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-12-25',
    nickname:'fdg ',
    tel:'11111',
    sex:'0',
    constellation:'0',
    birthday:'',
    profession:'0',
    picker: ['未知','男性', '女性'],
    xz: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    label: ['男神', '宅男', '美女'],
    zy: ['公务员', '专业技术人员', '办事人员和有关人员', '商业、服务业人员', '农、林、牧、渔、水利业生产人员', '生产、运输设备操作人员及有关人员','军人'],
    hidmodel: false,
    labelname: '',
    index:0,
    index1:0,
    index2:0,
  },
  xzChange(e) {
    console.log(e);
    this.setData({
      index1: e.detail.value
    })
  },
  // 删除标签
  delabel(e) {
    console.log(e.currentTarget.dataset.index)
    this.data.label.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      label: this.data.label
    })
  },
  //增加标签
  addlabel() {
    this.setData({
      hidmodel: true
    });
  },
  cancel() {
    this.setData({
      hidmodel: false
    });
  },
  confirm() {
    console.log('dddd')
    const name = this.data.labelname
    this.data.label.push(name)
    this.setData({
      hidmodel: false,
      label: this.data.label,
    });
  },
  setValue: function(e) {
    var val = e.detail.value;

    this.setData({
      labelname: val
    });
  },
  sub(e){
    let ff = [e.detail.value][0]
    ff['like'] = this.data.label;
    ff['constellation'] =  parseInt(ff['constellation'])  + 1 ;
    ff['profession'] = this.data.zy[ff['profession']];
    console.log(ff)
    app.request({ url: "user", data: ff, method:'post'}).then(res=>{
      console.log(res)
      if(res){
        wx.showToast({
          title: '保存成功',
        })
      }
    })
  },
  PickerChange(e) {
    this.setData({
      sex: e.detail.value
    })

  },
  PickerChange1(e){
    this.setData({
      constellation: e.detail.value
    })

  },
  PickerChange2(e) {
    this.setData({
      profession: e.detail.value
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    app.request({url:'user'}).then(res=>{
      console.log(res)
      this.setData({
        birthday: res.birthday,
        constellation: res.constellation -1 ,
        label: res.like,
        nickname: res.nickname,
        profession: this.data.zy.indexOf(res.profession),
        sex: res.sex,
        tel: res.tel
      })
    })
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
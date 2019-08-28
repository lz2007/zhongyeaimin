var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
  data: {
    series: [{
      name: '消费金额',
      data: 50,
    }, {
      name: '优惠金额',
      data: 50,
    }],
    integral:0,
    index:0,
    datelabel:[],
    list:[]
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  onLoad: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series:this.data.series,
      width: windowWidth,
      height: 300,
      dataLabel: true,
    });
  },
  onShow:function(){
    app.request({ url:'user/bill/date'}).then(res=>{
      console.log(res.list)
      this.setData({
        datelabel: res.list
      })
      console.log(this.data.datelabel)
    })
    this.boll()
  },
  boll:function(date ='',){

    app.request({ url:'user/bill?&page='+'1'+'&date='+date}).then(res=>{
      console.log(res)
        this.setData({
          list:res.data
        })
    })
    app.request({ url:'user/bill/statistics?date='+date}).then(res=>{
      console.log(res)
      this.setData({
        'series[0].data': res.statistics[0],
        'series[1].data': res.statistics[1],
        integral: res.integral
      })
    })
  },
  PickerChange(e) {
    console.log(e.detail.value)
    console.log(this.data.datelabel[e.detail.value].value)
    this.boll(this.data.datelabel[e.detail.value].value)
    this.setData({
      index: e.detail.value
    })
  },
});
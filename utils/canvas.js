export default {
  options: {
    // 绘制圆形进度条方法
    run(c, w, h, ctx2) {
      var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
      ctx2.arc(w, h, w - 3, -0.5 * Math.PI, num); //每个间隔绘制的弧度
      ctx2.setStrokeStyle("#E54D42");
      ctx2.setLineWidth("5");
      ctx2.setLineCap("butt");
      ctx2.stroke();
      ctx2.beginPath();
      ctx2.setFontSize(16); //注意不要加引号
      ctx2.setFillStyle("#E54D42");
      ctx2.setTextAlign("center");
      ctx2.setTextBaseline("middle");
      ctx2.fillText(c + "%", w, h);
      ctx2.draw();
    },
    /**
     * start 起始百分比
     * end 结束百分比
     * w,h 其实就是圆心横纵坐标
     */
    // 动画效果实现
    canvasTap(start, end, time, w, h, ctx2) {
      var that = this;
      start++;
      if (start > end) {
        return false;
      }
      that.run(start, w, h, ctx2);
      setTimeout(function () {
        that.canvasTap(start, end, time, w, h, ctx2);
      }, time);
    },
    /**
     * id----------------canvas画板id
     * percent-----------进度条百分比
     * time--------------画图动画执行的时间  
     */
    draw: function (id, percent, animTime) {
      var that = this;
      const ctx2 = wx.createCanvasContext(id);
      var time = animTime / percent;
      wx.createSelectorQuery().select('#' + id).boundingClientRect(function (rect) { //监听canvas的宽高
        var w = parseInt(rect.width / 2); //获取canvas宽的的一半
        var h = parseInt(rect.height / 2); //获取canvas高的一半，
        that.canvasTap(0, percent, time, w, h, ctx2)
      }).exec();
    },
  }
}
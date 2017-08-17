//clock.js
const util = require('../../utils/util.js')

Page({
  data: {
    hourTenth: 0,
    hourUnit: 0,
    minuteTenth: 0,
    minuteUnit: 0,
    secondTenth: 0,
    secondUnit: 0
  },
  onLoad: function () {
    this.setTime();
    setInterval(() => {
      this.setTime();
    }, 1000);
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Concise Time',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  setTime: function() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    this.setData({
      hourTenth: Math.floor(hour / 10),
      hourUnit: hour % 10,
      minuteTenth: Math.floor(minute / 10),
      minuteUnit: minute % 10,
      secondTenth: Math.floor(second / 10),
      secondUnit: second % 10
    })
  },
  getNowFormatDate: function() {
    let date = new Date();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
    return currentdate;
  }
})
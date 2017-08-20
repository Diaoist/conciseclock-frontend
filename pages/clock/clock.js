//clock.js
const util = require('../../utils/util.js')

Page({
  data: {
    title: '简时钟',
    showType: 1, // 0: 时分 1：时分秒
    hourTenth: {
      beforeUp: 0,
      beforeDown: 0,
      up: 0,
      down: 0,
      play: 1
    },
    hourUnit: {
      beforeUp: 0,
      beforeDown: 0,
      up: 0,
      down: 0,
      play: 1
    },
    minuteTenth: {
      beforeUp: 0,
      beforeDown: 0,
      up: 0,
      down: 0,
      play: 1
    },
    minuteUnit: {
      beforeUp: 0,
      beforeDown: 0,
      up: 0,
      down: 0,
      play: 1
    },
    secondTenth: {
      beforeUp: 0,
      beforeDown: 0,
      up: 0,
      down: 0
    },
    secondUnit: {
      beforeUp: 0,
      beforeDown: 0,
      up: 0,
      down: 0
    }
  },
  onLoad: function () {
    // this.onShake();
    this.setTime();
    setInterval(() => {
      this.setTime();
    }, 1000);
  },
  onShake: function() {
    let nowTime = new Date().getTime();
    let lastTime = new Date().getTime();
    let x = 0, y = 0, z = 0, lastX = 0, lastY = 0, lastZ = 0;
    let shakeSpeed = 3;
    let that = this;
    wx.onAccelerometerChange(function (res) {
      nowTime = new Date().getTime();
      let differTime = nowTime - lastTime;
      if (differTime > 3000) {
        x = res.x; //获取x轴数值，x轴为垂直于北轴，向东为正
        y = res.y; //获取y轴数值，y轴向正北为正
        z = res.z;
        let speed = Math.abs(x + y + z - lastX - lastY - lastZ) / differTime * 10000;
        if (speed > shakeSpeed) {
          console.log(speed);
          that.changeTitle();
        }
        lastX = x;
        lastY = y;
        lastZ = z;
        lastTime = nowTime;
      }
    })
  },
  changeTitle: function() {
    let title = '';
    let showType = this.data.showType === 0 ? 1 : 0;
    switch (this.data.title) {
      case '简时钟':
        title = '';
        break;
      case 'Concise Time':
        title = '简时钟';
        break;
      case '':
        title = 'Concise Time';
        break;
      default:
        title = '';
    }
    this.setData({
      title,
      showType
    });
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

    let hourTenth = this.data.hourTenth;
    hourTenth.beforeUp = this.data.hourTenth.up;
    hourTenth.beforeDown = this.data.hourTenth.down;
    hourTenth.up = Math.floor(hour / 10);
    hourTenth.down = Math.floor(hour / 10);
    if (hourTenth.down !== hourTenth.beforeDown) {
      hourTenth.play = 1;
    }

    let hourUnit = this.data.hourUnit;
    hourUnit.beforeUp = this.data.hourUnit.up;
    hourUnit.beforeDown = this.data.hourUnit.down;
    hourUnit.up = Math.floor(hour % 10);
    hourUnit.down = Math.floor(hour % 10);
    if (hourUnit.down !== hourUnit.beforeDown) {
      hourUnit.play = 1;
    }

    let minuteTenth = this.data.minuteTenth;
    minuteTenth.beforeUp = this.data.minuteTenth.up;
    minuteTenth.beforeDown = this.data.minuteTenth.down;
    minuteTenth.up = Math.floor(minute / 10);
    minuteTenth.down = Math.floor(minute / 10);
    if (minuteTenth.down !== minuteTenth.beforeDown) {
      minuteTenth.play = 1;
    }

    let minuteUnit = this.data.minuteUnit;
    minuteUnit.beforeUp = this.data.minuteUnit.up;
    minuteUnit.beforeDown = this.data.minuteUnit.down;
    minuteUnit.up = Math.floor(minute % 10);
    minuteUnit.down = Math.floor(minute % 10);
    if (minuteUnit.down !== minuteUnit.beforeDown) {
      minuteUnit.play = 1;
    }

    let secondTenth = this.data.secondTenth;
    secondTenth.beforeUp = this.data.secondTenth.up;
    secondTenth.beforeDown = this.data.secondTenth.down;
    secondTenth.up = Math.floor(second / 10);
    secondTenth.down = Math.floor(second / 10);
    if (secondTenth.down !== secondTenth.beforeDown) {
      secondTenth.play = 1;
    }

    let secondUnit = this.data.secondUnit;
    secondUnit.beforeUp = this.data.secondUnit.up;
    secondUnit.beforeDown = this.data.secondUnit.down;
    secondUnit.up = Math.floor(second % 10);
    secondUnit.down = Math.floor(second % 10);
    if (secondUnit.down !== secondUnit.beforeDown) {
      secondUnit.play = 1;
    }

    this.setData({
      hourTenth,
      hourUnit,
      minuteTenth,
      minuteUnit,
      secondTenth,
      secondUnit
    })
    setTimeout(() => {
      minuteUnit.play = 0;
      minuteTenth.play = 0;
      hourUnit.play = 0;
      hourTenth.play = 0;
      secondTenth.play = 0;
      secondUnit.play = 0;
      this.setData({
        hourTenth,
        hourUnit,
        minuteTenth,
        minuteUnit,
        secondTenth,
        secondUnit
      })
    }, 900);
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
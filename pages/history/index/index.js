var sliderWidth = 55; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({
  data: {
    hidden: false,
    month: "",
    day: "",
    tabs: ["全部", "事件", "出生", "逝世"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    var that = this;
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          myhistory: app.globalData.myhistory,
          month: m,
          day: d,
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    that.gethistory(m, d);
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  gethistory: function (m, d) {
    var that = this;
    wx.request({
      url: 'http://www.jiahengfei.cn:33550/port/history?dispose=easy&key=jiahengfei&month=' + m + '&day=' + d,
      data: {

      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success  
        console.log(res.data.data);

        var events = [];
        var born = [];
        var die = [];
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].title.indexOf("出生") != -1 || res.data.data[i].title.indexOf("诞辰") != -1) {
            born.push(res.data.data[i]);
          }
          else if (res.data.data[i].title.indexOf("去世") != -1 || res.data.data[i].title.indexOf("逝世") != -1 || res.data.data[i].title.indexOf("病逝") != -1) {
            die.push(res.data.data[i]);
          } else {
            events.push(res.data.data[i]);
          }
        }
        console.log(born);
        that.setData({
          allhistory: res.data.data,
          born: born,
          die: die,
          events: events,
          hidden: true
        })
      }
    })
  },
  toNew: function (e) {
    wx.navigateTo({
      url: '/pages/history/newHistory/newHistory'
    })
  },
  onShow:function(){
    this.setData({
      myhistory: app.globalData.myhistory
    })
  }
});
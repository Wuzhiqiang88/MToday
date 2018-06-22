const app = getApp()
Page({
  data: {
    remind: '加载中',
    angle: 5,
    year: 2018,
  },

  goToIndex: function () {
    wx.redirectTo({
      url: '/pages/start/editInfo/editInfo',
    })
  },
  onLoad: function () {
  
    if (wx.getStorageSync('birthday')){
      app.globalData.birthday = wx.getStorageSync('birthday')
      wx.switchTab({
        url: '/pages/home/index/index',
      })
    }
    this.setData({
      year: new Date().getFullYear(),
    });
  },
  onShow: function () {
    
  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
  },
});
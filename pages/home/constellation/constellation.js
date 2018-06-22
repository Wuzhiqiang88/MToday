// pages/xz/xz.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOK: false,
    love: 0,
    health: 0,
    work: 0,
    all: 0,
    backgif:"http://image.uc.cn/s/wemedia/s/2017/a60641eebc8d7547fa2dcec288060b12x476x267x385.gif"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      constellationInfo: app.globalData.constellationInfo,
      love: app.globalData.constellationInfo.love.replace('%', ''),
      work: app.globalData.constellationInfo.work.replace('%', ''),
      health: app.globalData.constellationInfo.health.replace('%', ''),
      all: app.globalData.constellationInfo.all.replace('%', ''),
      isOK: true,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
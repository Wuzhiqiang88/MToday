// pages/history/myhistoryInfo/myhistoryInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id:options.id,
      hidden: true,
      myhistory: app.globalData.myhistory[options.id],
      month: that.replace(app.globalData.myhistory[options.id].month)
    })
    console.log(app.globalData.myhistory[options.id])
  },
  preview: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  replace: function (m) {
    var month = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二",];
    return month[m - 1]
  },
  del: function (e) {
    var that =this;
    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: '#000',
      success(res) {
        app.globalData.myhistory.splice(that.data.id, 1)
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1500,
          success: function () {
            setTimeout(function () {
              //要延时执行的代码
              wx.navigateBack({
                delta: 1
              })
            }, 1000) //延迟时间 

          }
        })
      }
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
// pages/my/myhistory/myhistory.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
   
    that.setData({
      myallhistory: app.globalData.myhistory
    })

  },


  del: function (e) {
    var that = this;
    app.globalData.myhistory.splice(that.data.id, 1)
    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: '#000',
      success(res) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1500,
          success: function () {
            setTimeout(function () {
              //要延时执行的代码
              that.onLoad()
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
    var that = this;

    that.setData({
      myallhistory: app.globalData.myhistory
    })
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
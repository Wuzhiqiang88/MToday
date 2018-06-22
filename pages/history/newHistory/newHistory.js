// pages/history/newHistory/newHistory.js
var app = getApp();
var list = [];
var myhistory = {};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgalist: [],
    title: "",
    content: "",
    location: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    list.splice(0, list.length);
    myhistory = {};
  },
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          if (list.length < 9) {
            list.push(res.tempFilePaths[i])
          }
        }
        that.setData({
          imgalist: list,
        })
      }
    })
  },
  delimage: function (e) {
    var that = this;
    list.splice(e.currentTarget.dataset.id, 1)
    that.setData({
      imgalist: list,
    })
  },
  gettitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  getcontent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  sup: function (n) {
    return (n < 10) ? '0' + n : n;
  },
  toDo: function (e) {
    var that = this;
    if (that.data.title == "") {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
      })
    } else {
      myhistory.month = new Date().getMonth() + 1;
      myhistory.year = new Date().getFullYear();
      myhistory.day = that.sup(new Date().getDate());
      myhistory.hours = that.sup(new Date().getHours());
      myhistory.minutes = that.sup(new Date().getMinutes());
      myhistory.seconds = that.sup(new Date().getSeconds());
      myhistory.imgalist = that.data.imgalist;
      myhistory.title = that.data.title;
      myhistory.content = that.data.content;
      myhistory.location = that.data.location;
      app.globalData.myhistory.unshift(myhistory);
      console.log(app.globalData.myhistory);

      wx.showToast({
        title: '创建成功',
        icon: 'success',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            wx.switchTab({
              url: '/pages/history/index/index',
            })
          }, 1000) //延迟时间 
        }
      })
    }
  },
  mylocation: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          location: res.name
        })
      },
    })
  },
  dellocation: function (e) {
    var that = this;
    that.setData({
      location: ""
    })
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
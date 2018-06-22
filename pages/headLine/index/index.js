// pages/headLine/index/index.js
var sliderWidth = 68; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden1: false,
    hidden2: false,
    hidden3: false,
    hidden4: false,
    inputShowed: false,
    inputVal: "",
    tabs: ["实时热点", "今日热点", "娱乐热点", "七日热点"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    })

    wx.request({
      url: 'http://route.showapi.com/313-2',
      data: {
        "showapi_appid": '66900',
        "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',  
        "typeId": "1"
      },
      header: {
        'Content-Type': 'application/json'
      },
      success:function(res){
        console.log(res.data.showapi_res_body.list)
        that.setData({
          hot_1: res.data.showapi_res_body.list,
          hidden1: true
        })
      }
    })
    wx.request({
      url: 'http://route.showapi.com/313-2',
      data: {
        "showapi_appid": '66900',
        "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
        "typeId": "341"
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.showapi_res_body.list)
        that.setData({
          hot_2: res.data.showapi_res_body.list,
          hidden2: true
        })
      }
    })
    wx.request({
      url: 'http://route.showapi.com/313-2',
      data: {
        "showapi_appid": '66900',
        "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
        "typeId": "344"
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.showapi_res_body.list)
        that.setData({
          hot_3: res.data.showapi_res_body.list,
          hidden3: true
        })
      }
    })
    wx.request({
      url: 'http://route.showapi.com/313-2',
      data: {
        "showapi_appid": '66900',
        "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
        "typeId": "42"
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.showapi_res_body.list)
        that.setData({
          hot_4: res.data.showapi_res_body.list,
          hidden4: true
        })
      }
    })
  },
  onPullDownRefresh: function () {
    var that = this;
    that.onLoad();

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})
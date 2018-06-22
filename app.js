App({
  globalData: {
    userInfo: null,
    birthday: null,
    weather: null,
    constellation: null,
    constellationInfo: null,
    myhistory: [
      {
        "content": "天呐！", "day": "05", "hours": 21, "imgalist": [], "location": "天马影城", "minutes": 51, "month": 8, "seconds": 24, "title": "哈哈，我看电影", "year": 2018
      },
      {
        "content": "天呐！", "day": "06", "hours": 21, "imgalist": [], "location": "江西财经大学", "minutes": 51, "month": 5, "seconds": 4, "title": "哈哈，我在写作业", "year": 2018
      },
      {
        "content": "天呐！", "day": "06", "hours": 21, "imgalist": [], "location": "江西艺术中心", "minutes": 51, "month": 6, "seconds": 24, "title": "哈哈，我在睡觉", "year": 2017
      },
      {
        "content": "天呐！", "day": "06", "hours": 21, "imgalist": [], "location": "江西艺术中心", "minutes": 51, "month": 4, "seconds": 24, "title": "哈哈，我在学习", "year": 2016
      },
      {
        "content": "天呐！我来到了这个世界", "day": "06", "hours": 21, "imgalist": [], "location": "江西艺术中心", "minutes": 51, "month": 6, "seconds": 24, "title": "哈哈，我出生了", "year": 1998
      }]
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})

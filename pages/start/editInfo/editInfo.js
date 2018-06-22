const app = getApp()
Page({
  data: {
    end:null,
    userInfo: { avatarUrl: "/images/head.jpg" },
    hasUserInfo: false,
    gender: ["未知", "男", "女"],
    birthday: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
   this.setData({
     end: new Date()
   })
    // 查看是否授权
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  bindDateChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo != undefined) {
      
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
    
  },
  showTopTips:function(e){
    var that=this;
    if(that.data.birthday!=""){
      app.globalData.birthday = that.data.birthday
      try {
        wx.setStorageSync('birthday', that.data.birthday)
      } catch (e) {
      }
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            wx.switchTab({
              url: '/pages/home/index/index',
            })
          }, 1000) //延迟时间 
          
        }
      })
     
    }else{
      wx.showToast({
        title: '请补充出生日期',
        icon: 'none',
      })
    }
  }
 
})
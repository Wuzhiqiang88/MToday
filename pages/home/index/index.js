var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month: "",
    day: "",
    week: "",
    isOK: false,
    city: "null",
    district: "null",
    street: "null",
    now: { tmp: "0", cond_txt: "null" },
    constellationInfo: null,
    love: 0,
    health: 0,
    work: 0,
    all: 0,
    backgif: 'http://img.zcool.cn/community/01f95159718e36a8012193a302ea95.gif',
    backgif2: "http://5b0988e595225.cdn.sohucs.com/images/20171121/d41d4e119529450d8b99319795c3e292.gif"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    that.getconstellation();
    that.showconstellation(app.globalData.constellation + "座");
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;//纬度
        var longitude = res.longitude;//经度
        console.log(latitude + "----" + longitude);
        that.getCity(latitude, longitude);//调用自己写的函数获得城市
      },
    })
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    that.setData({
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      week: weekday[new Date().getDay()],
      constellation: app.globalData.constellation + "座"

    })
  },

  getCity: function (lat, lng) {
    var that = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=YLEbc9li9voReYASHn7XoT0bjrvSeGRD&location=' + lat + ',' + lng + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success  
        console.log(res);
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;
        that.setData({
          city: city,
          district: district,
          street: street
        });
        city = city.substring(0, city.length - 1);//截掉最后一个字"市"
        that.getWeather(city);
      }
    })
  },
  //获取天气信息函数
  getWeather: function (city) {
    console.log(city);//注意传递的参数需是城市名或拼音等，详情见api文档，如果给的不是城市名，则无空气质量的值。城市名要去掉"市"字。
    var that = this;
    var url = "https://free-api.heweather.com/s6/weather?parameters";
    var param = {
      key: "df43d8e7ff844895962f806f0f267027 ",
      location: city
    };
    //发出请求
    wx.request({
      url: url,
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var img;
        if (new Date().getHours() >= 18) {
          img = "http://img.zcool.cn/community/0166115971b920a8012193a331c313.gif"
        } else {
          img = 'http://img.zcool.cn/community/01f95159718e36a8012193a302ea95.gif'
        }
        app.globalData.weather = res.data.HeWeather6[0];
        that.setData({
          backgif: img,
          now: res.data.HeWeather6[0].now,
          air: res.data.HeWeather6[0].lifestyle[7],
          isOK: true,
          cond_code: "https://cdn.heweather.com/cond_icon/" + res.data.HeWeather6[0].now.cond_code + ".png"
        });
      }
    })
  },
  getconstellation: function () {
    var date = new Date(Date.parse(app.globalData.birthday.replace(/-/g, "/")));
    app.globalData.constellation = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr((date.getMonth() + 1) * 2 - (date.getDate() < "102223444433".charAt((date.getMonth() + 1) - 1) - -19) * 2, 2);
  },
  showconstellation: function (constellation) {
    var that = this;
    wx.request({
      url: 'http://web.juhe.cn:8080/constellation/getAll?consName=' + constellation + '&type=today&key=a6a9c590a797decf7a3cf1aa00fa41ae',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success  
        app.globalData.constellationInfo = res.data
        console.log(res);
        that.setData({
          constellationInfo: res.data,
          love: res.data.love.replace('%', ''),
          work: res.data.work.replace('%', ''),
          health: res.data.health.replace('%', ''),
          all: res.data.all.replace('%', ''),
        });
      }
    })
  },
  onPullDownRefresh: function () {
    var that = this;
    that.onLoad();

  },
  toweather: function () {
    wx.navigateTo({
      url: '/pages/home/weather/weather'
    })
  },
  toxz: function () {
    wx.navigateTo({
      url: '/pages/home/constellation/constellation'
    })
  },
  onShow: function () {
    var that = this;
    that.getconstellation();
    if (that.data.constellation != (app.globalData.constellation + "座")){
      that.showconstellation(app.globalData.constellation + "座");
      that.setData({
        constellation: app.globalData.constellation + "座"
      })
    }
  
  }

})
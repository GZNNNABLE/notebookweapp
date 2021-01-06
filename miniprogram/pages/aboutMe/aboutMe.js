
const app = getApp()

Page({
  data: {
    array: [1, 2, 3, 4, 5],
    msg:'Hello World',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数

  clickMe:function(){
    this.setData({ msg: "Hello" })
  },
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
   //获取当前位置
  onLoad: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var that=this
        var latitude = res.latitude // 纬度
        var longitude = res.longitude // 经度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        markers:[{
          latitude: res.latitude,
          longitude: res.longitude
        }]
      
    }})
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
  ,
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

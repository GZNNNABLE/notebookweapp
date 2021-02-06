// miniprogram/pages/calendar/editSchedule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPopup:false,
    currentDate:[],
    message:'',
    checkResult:[],


  },
  timeConfirm(val){
    console.log(val.detail)
    this.setData({
      currentDate:val.detail,
      showPopup:false
    })
  },
  timePickerClose:function(){
    this.setData({
      showPopup:false
    })
  },
  showPopup(){
    this.setData({
      showPopup:true
    })
  },
onQuery(){
  console.log(this.options.id)
  const db = wx.cloud.database()
  db.collection('schedule').where({ 
    _id: this.options.id,
  }).get({
    success: res => {
      console.log(res.data[0].tag)
      this.setData({
        message:res.data[0].message,
        checkResult: [res.data[0].tag],
        currentDate:res.data[0].time
      })
      console.log(typeof(res.data[0].tag))
      

    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
      console.error('[数据库] [查询记录] 失败：', err)
    }
  })
},
commitEdit(){
  const db = wx.cloud.database()
   
    db.collection('schedule').doc(this.options.id).update({
      data: {
        message:this.data.message,
        tag: this.data.checkResult[0],
        time:this.data.currentDate
      },
      success: res => {
        wx.showToast({
          title: '编辑成功',
          duration:2000
        })
        wx.navigateBack({
          delta: 0,
        })
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
    
  },

onChange(event) {
  this.setData({
    checkResult: event.detail,   
  })
  console.log(this.data.checkResult)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onQuery()
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
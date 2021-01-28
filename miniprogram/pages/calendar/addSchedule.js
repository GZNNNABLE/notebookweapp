// miniprogram/pages/calendar/addSchedule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:"",
    time:"",
    message:"",
    checkResult: [],
    showPopup:"",
    currentDate:""
  },
  onAdd: async function(){

    const db = wx.cloud.database()
    db.collection('schedule').add({
      data: {
        date:this.options.date,
        tag:this.data.checkResult[0],
        message:this.data.message,
        time:this.data.currentDate
      }})
      .then(
        res => {
          
        // 在返回结果中会包含新创建的记录的 _id

        
     wx.showToast({
       title: '新增记录成功',
     })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      }).catch(err => {
        wx.showToast({
          icon: 'none',
          value: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      })
 

    
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
  onChange(event) {
    this.setData({
      checkResult: event.detail,   
    })
    this.setData({
      test:this.data.checkResult[0]
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.options.date)

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
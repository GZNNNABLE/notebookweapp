
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeFormatter:"",
    title:"",
    message:"",
    showTimePicker:false,
    pickTime:false,
    checked: false,
    noticeTime:"",
    activeIcon: '../../pages/images/noticeChose.png',
    inactiveIcon: '../../pages/images/notice.png',
    minDate:new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      } else if (type === 'hour') {
        return `${value}时`;
      } else if (type === 'minute') {
        return `${value}分`;
      }
      return value;
    },
    

    currentDate: "",

  },
  onAdd: async function(){

    const db = wx.cloud.database()
    db.collection('counters').add({
      data: {
        type:2,
        title:this.data.title,
        notice:this.data.checked,
        message:this.data.message,
        noticeTime:this.data.noticeTime,
        label:"购物"
      }})
      .then(
        res => {
          
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          title:this.data.title,
          notice:this.data.checked,
          message:this.data.message,
          noticeTime:this.data.noticeTime
        })
        
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
  onChange(event) {
    
    this.setData({
      checked: event.detail,
    });
    if(this.data.checked===true){
      this.setData({
        pickTime:true
      })
    }
    else{
      this.setData({
        pickTime:false,
        noticeTime:""
      })
    }
  },
  dateConfirm:function(val){
    var year = new Date(val.detail).getFullYear()
    var month = new Date(val.detail).getMonth() + 1
    var date = new Date(val.detail).getDate()
    var hour = new Date(val.detail).getHours()
    var minute = new Date(val.detail).getMinutes()
    var time = year+'-'+month+'-'+date+' '+hour+'时'+minute+'分'
    this.setData({
      noticeTime:val.detail
    })
    
    this.setData({
      showTimePicker:false,
      timeFormatter:time
    })
  
  },
  timePickerClose:function(){
    this.setData({
      showTimePicker:false
    })
  },
  showTimePicker:function(){
    this.setData({
      showTimePicker:true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
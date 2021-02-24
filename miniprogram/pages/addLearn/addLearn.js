
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeFormatter:"",
    timeFmt:"",
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
    if(this.data.noticeTime){
      const time =this.data.noticeTime
      const time1 =this.data.timeFmt
      const item={
        "thing05": {
        "value": this.data.title? this.data.title:"暂无"
    },
         "thing02": {
        "value": this.data.message? this.data.message:"暂无"
    },
         "thing11": {
        "value": this.data.timeFormatter
    } }
      wx.requestSubscribeMessage({
        tmplIds: ['LKl8r4NSLS8Fmx9FsWs8-HVBxNaa6NEdVN6azr6EAHA'],
        success (res) {
          if (res.errMsg === 'requestSubscribeMessage:ok') {
            // 这里将订阅的课程信息调用云函数存入云开发数据
            wx.cloud
              .callFunction({
                name: 'subscribeMsg',
                data:{
                  data:item,
                  templateId: 'LKl8r4NSLS8Fmx9FsWs8-HVBxNaa6NEdVN6azr6EAHA',
                  noticeTime:time,
                  timeFmt:time1},
                 
              })
              .then(() => {
                
                wx.showToast({
                  title: '订阅成功',
                  icon: 'success',
                  duration: 2000,
                });
              })
              .catch(() => {
                wx.showToast({
                  title: '订阅失败',
                  icon: 'success',
                  duration: 2000,
                });
              });
          }
         }
      })
    }
    const db = wx.cloud.database()
    db.collection('counters').add({
      data: {
        type:1,
        title:this.data.title,
        notice:this.data.checked,
        message:this.data.message,
        noticeTime:this.data.noticeTime,
        timeFmt:this.data.timeFmt,
        label:"学习",
        statisticsName:'学习'
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
     
     

      }).catch(err => {
        wx.showToast({
          icon: 'none',
          value: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      })
      wx.navigateBack({
        delta: 0,
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
    var time1 = year+'-'+month+'-'+date+' '+hour+'时'
    this.setData({
      noticeTime:val.detail
    })
    
    this.setData({
      showTimePicker:false,
      timeFormatter:time,
      timeFmt:time1
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
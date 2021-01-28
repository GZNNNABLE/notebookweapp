Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    activeIcon: '../../pages/images/noticeChose.png',
    inactiveIcon: '../../pages/images/notice.png',
    checkBox:true,
    details:"",
    time:"",
    disabled:"",
    edit:true,
    options:{},
    checked:"",
    pickTime:"",
    noticeTime:"",
    timeFormatter:"",
    minDate:new Date().getTime(),
    showTimePicker:false,
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
    

  },
  showTimePicker:function(){
    this.setData({
      showTimePicker:true
    })
  },
  timePickerClose:function(){
    this.setData({
      showTimePicker:false
    })
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
  commitEdit(){
    const db = wx.cloud.database()
   
    db.collection('counters').doc(this.data.id).update({
      data: {
        title: this.data.title,
        message:this.data.message,
        notice:this.data.checked,
        noticeTime:this.data.noticeTime

      },
      success: res => {
        console.log(this.data.noticeTime)
        var year1 = new Date(this.data.noticeTime).getFullYear()
        var month1 = new Date(this.data.noticeTime).getMonth() + 1
        var date1= new Date(this.data.noticeTime).getDate()
        var hour1 = new Date(this.data.noticeTime).getHours()
        var minute1 = new Date(this.data.noticeTime).getMinutes()
        var time1 = year1+'-'+month1+'-'+date1+' '+hour1+'时'+minute1+'分'
        console.log(time1)
        this.setData({
          timeFormatter:time1
        })
        
        wx.switchTab({
          url: '../searchList/searchList',
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
  detailQuery:function(){
    
    const db = wx.cloud.database()
    db.collection('counters').where({
      _id:this.data.id
    }).get({
      success: res => {
        var year = new Date(res.data[0].noticeTime).getFullYear()
        var month = new Date(res.data[0].noticeTime).getMonth() + 1
        var date = new Date(res.data[0].noticeTime).getDate()
        var hour = new Date(res.data[0].noticeTime).getHours()
        var minute = new Date(res.data[0].noticeTime).getMinutes()
        var time = year+'-'+month+'-'+date+' '+hour+'时'+minute+'分'
        this.setData({
          
          checked:res.data[0].notice,
          edit:this.edit,
          details:res.data[0],
          timeFormatter:time,
          title:res.data[0].title,
          message:res.data[0].message,
          time:time,
          noticeTime:res.data[0].noticeTime
        })
        console.log(this.data.checked)
        if(this.data.details.notice){
        var year = new Date(this.data.details.noticeTime).getFullYear()
        var month = new Date(this.data.details.noticeTime).getMonth() + 1
        var date = new Date(this.data.details.noticeTime).getDate()
        var hour = new Date(this.data.details.noticeTime).getHours()
        var minute = new Date(this.data.details.noticeTime).getMinutes()
        var time = year+'-'+month+'-'+date+' '+hour+'时'+minute+'分'
        this.setData({
          time:time
        })}
        console.log(this.data.details)
        
        console.log(this.options.edit)
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      options:options
    })
  
    this.detailQuery()
    // console.log(options.edit)

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
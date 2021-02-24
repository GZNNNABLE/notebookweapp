// miniprogram/pages/addFree/addFree.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    message:"",
    picList:[],
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
  onAdd: async function(){

    const db = wx.cloud.database()
    db.collection('counters').add({
      data: {
        type:3,
        title:this.data.title,
        notice:this.data.checked,
        message:this.data.message,
        noticeTime:this.data.noticeTime,
        picList:this.data.picList,
        label:"noneType",
        statisticsName:'无类型'
      }})
      .then(
        res => {
          
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          title:this.data.title,
          notice:this.data.checked,
          message:this.data.message,
          noticeTime:this.data.noticeTime,
          picList:this.data.picList,
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
  deleteImg:function(event){
    console.log(event.currentTarget.dataset.id)
    var len=this.data.picList.length
    var piclist1=[]
    wx.cloud.deleteFile({
      fileList: [this.data.picList[event.currentTarget.dataset.id]],
      success: res => {
        // handle success
        console.log(res.fileList)
      },
      fail: console.error
    })
    for(var i=0;i<len;i++){
      if (this.data.picList[i]!=this.data.picList[event.currentTarget.dataset.id]){
        piclist1.push(this.data.picList[i])
      }
    }
    this.setData({
      picList:piclist1
      
      
    })
console.log(this.data.picList)

  },
  doUpload: function (){
    //把this赋值给that，就相当于that的作用域是全局的。
    let that = this;    
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album','camera'],
      success(res) {
        console.log("成功",res);
        that.uploadImage(res.tempFilePaths[0]);
      }
    })
  },
  takeCamera:function(){
    let that = this;    
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        console.log("成功",res);
        that.uploadImage(res.tempFilePaths[0]);
      }
    })

  },

  uploadImage(fileURL) {
    if(this.data.picList.length<3){
    wx.cloud.uploadFile({
      cloudPath:new Date().getTime()+'.png', // 上传至云端的路径
      filePath: fileURL, // 小程序临时文件路径   
      success: res => {
        // 返回文件 ID
        console.log("上传成功",res)   
                 //获取文件路径
        this.setData({
          picList:this.data.picList.concat([res.fileID])
        })  
        console.log(this.data.picList)
      },
      fail: console.error
    }
  )}
   else {wx.showToast({
     title: '最多上传三张图片',
     icon:'none',
     duration:2000
   })}
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
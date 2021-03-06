// miniprogram/pages/addNote/addNote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    fileList: [
    ],
    imgUrl:'',
    title: '',
    message:'',
    date:'',
    picList:[],
    show:'true',
    radio: true,
    testList:[],
    savePicList:[],
    icon: {
      sundaynormal: '../../pages/images/sunday1.png',
      sundayactive: '../../pages/images/sunday2.png',
      cloudnormal: '../../pages/images/cloud1.png',
      cloudactive: '../../pages/images/cloud2.png',
      rainnormal: '../../pages/images/rain1.png',
      rainactive: '../../pages/images/rain2.png',
      badnormal: '../../pages/images/badyday1.png',
      badactive: '../../pages/images/badday2.png',
      snownormal: '../../pages/images/snow1.png',
      snowactive: '../../pages/images/snow2.png'


  }},
  
  previewImg:function(event){
    console.log(event)

    wx.previewImage({
    urls: this.data.picList,
    current: this.data.picList[event.currentTarget.dataset.id],
    success: (res) => {
      console.log(res)
    },
    fail: (res) => {},
    complete: (res) => {},
  })},
  doUpload: function (){
    //把this赋值给that，就相当于that的作用域是全局的。
    let that = this;
    
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
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
   })}
  },
  deleteImg:function(event){
    console.log(event.currentTarget.dataset.id)
    var len=this.data.picList.length
    var piclist1=[]
    console.log([this.data.picList[event.currentTarget.dataset.id]])      
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

  },
  onAdd: async function(){
    var year = new Date().getFullYear().toString()
    var month1=new Date().getMonth()+1
    var month = month1.toString() 
    const db = wx.cloud.database()
    db.collection('counters').add({
      data: {
        type:0,
        title:this.data.title,
        radio:this.data.radio,
        message:this.data.message,
        picList:this.data.picList,
        label:year+"年"+month+"月"+new Date().getDate()+"日",
        statisticsName:'日记'
      }})
      .then(
        res => {
          
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          title:this.data.title,
          radio:this.data.radio,
          message:this.data.message,
          label:res.date
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
      radio: event.detail,
    });
  },

})
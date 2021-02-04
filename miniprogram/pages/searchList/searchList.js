// miniprogram/pages/searchList/searchList.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    userId:"",
    dialogShow:false,
    radio: true,
    page:0,
    pageSize:20,
    editShow:false,
    show: false,
    editDetails:{},
    editTitle:"",
    params:{},
    editMessage:"",
    details:{},
    noteList:[],
    picList:[],
    detailTitle:'',
    detailMessage:'',
    learnNotice:false,
    option1: [
      { text: '日记', value: 0 },
      { text: '学习', value: 1 },
      { text: '购物', value: 2 },
      { text: '无类型', value: 3 },
    ],
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


  },
    iconSrc:{
      snow:'../../pages/images/snow2.png',
      cloudy:'../../pages/images/cloud2.png',
      sunday:'../../pages/images/sunday2.png',
      bad:'../../pages/images/badday2.png',
      rainy:'../../pages/images/rain2.png'
    },
    value1:0,
    currentTime:new Date().getTime(),
  },
  handleClick:function(event){
    if(this.data.type===0){
      this.showPopup(event)
    }
    else if(this.data.type===1){
      wx.navigateTo({
        url: '../editDetailLearn/editDetailLearn?id='+event.currentTarget.dataset.id
      })
      
    }
    else if(this.data.type===2){
      wx.navigateTo({
        url: '../editDetailShop/editDetailShop?id='+event.currentTarget.dataset.id
      })
    }
    else if(this.data.type===3){
      wx.navigateTo({
        url: '../editDetailFree/editDetailFree?id='+event.currentTarget.dataset.id
      })
    }
  },
  changeType:function(value){
    this.setData({
      type:value.detail
      
    })
    this.data.noteList.length=0
    this.data.page=0
    console.log(this.data.type)
    this.onQuery()
    
  },
  commitEdit(){
    const db = wx.cloud.database()
   
    db.collection('counters').doc(this.data.editDetails._id).update({
      data: {
        title: this.data.editTitle,
        message:this.data.editMessage,
        radio:this.data.radio
      },
      success: res => {
        this.setData({
          editShow:false
        })      
        this.data.noteList.length=0
        this.data.page=0
        this.data.editShow=false
        this.onQuery()

       
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
    
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          instance.close();
        });
        break;
    }
  },
  onQuery: function() {
   
    const db = wx.cloud.database()
    
    db.collection('counters').skip(this.data.noteList.length).where({ 
      _openid: this.data.openid,
      type:this.data.type
    
    }).get({
      success: res => {
        
        this.setData({
          noteList:[...this.data.noteList,...res.data]
        })

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
  
  previewImg:function(){

    wx.previewImage({
    urls: this.data.details.picList,
    current: '1',
    success: (res) => {
      console.log(res)
    },
    fail: (res) => {},
    complete: (res) => {},
  })},

  showPopup(event) {
    this.setData({ show: true });
    
    const db = wx.cloud.database()
    db.collection('counters').where({
      _id:event.currentTarget.dataset.id
    }).get({
      success: res => {
        this.setData({
          details:res.data[0]
        })
        
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
  handleEdit:function(event){
    if(this.data.type===0){
      this.editNote(event)
    }
    else if(this.data.type===1){

      wx.redirectTo({
        url: '../editDetailLearn/editDetailLearn?id='+event.currentTarget.dataset.id+'&edit=1'
      })
      console.log(event.currentTarget.dataset.id)
    }
    else if(this.data.type===2){
      wx.redirectTo({
        url: '../editDetailShop/editDetailShop?id='+event.currentTarget.dataset.id+'&edit=1'
      })
    }
    else if(this.data.type===3){
      wx.redirectTo({
        url: '../editDetailFree/editDetailFree?id='+event.currentTarget.dataset.id+'&edit=1'
      })
    }
  },
  editNote(event){
    this.setData({ editShow: true });
    const db = wx.cloud.database()
    db.collection('counters').where({
      _id:event.currentTarget.dataset.id
    }).get({
      success: res => {
        this.setData({
          editDetails:res.data[0],
          editTitle:res.data[0].title,
          editMessage:res.data[0].message,
          radio:res.data[0].radio
        })
        
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
  delNote: function(event) {
    this.setData({
      dialogShow:true
    })
    this.data.userId=event.currentTarget.dataset.id
    console.log(this.data.userId)
  },
    delNoteConfirm:function(){
      const db = wx.cloud.database()
      db.collection('counters').doc(this.data.userId).remove({
        success: res => {
          wx.showToast({
            title: '删除成功',
          })
          this.data.noteList.length=0
          this.data.page=0
          
          this.onQuery()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
    
  },
  delNoteCancel:function(){
    this.setData({
      dialogShow:false
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  onEditClose(){
    this.setData({ editShow: false });
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
    this.onQuery()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
    if(this.data.noteList.length>=(this.data.page+1)*20) {
      this.data.page++ 
      this.onQuery()}
    

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
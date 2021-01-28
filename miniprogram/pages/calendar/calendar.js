// miniprogram/pages/calendar/calendar.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
      scheduleDetail:'',
      showPopup:'',
      list:[],
      page:0,
      minDate: new Date(2021, 0, 1).getTime(),
      today:new Date().getTime(),

      formatter(day){
        const month = day.date.getMonth() + 1;
        const date = day.date.getDate();
        if (day.date.setHours(0,0,0,0)===new Date().setHours(0,0,0,0)) {
          day.text = '今天';
        }
        return day;
      },
      date:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      show: false,
    },
    onPopupClose() {

      this.setData({ showPopup: false });
    },

    onQueryDetail: function(event) {   
      this.setData({
        showPopup:true
      })
      const db = wx.cloud.database()
      db.collection('schedule').where({ 
        _id: event.currentTarget.dataset.id,
      }).get({
        success: res => {
          this.setData({
            scheduleDetail:res.data[0]
          })
          console.log(this.data.scheduleDetail)
  
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
    onQuery: function() {
   
      const db = wx.cloud.database()
      
      db.collection('schedule').skip(this.data.list.length).where({ 
        _openid: this.data.openid,
        date:this.data.date
      
      }).get({
        success: res => {
          console.log(res)
          this.setData({
            list:[...this.data.list,...res.data]
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
    addSchedule(){
      wx.navigateTo({
        url: '../calendar/addSchedule?date='+this.data.date,
      })
    },
    onDisplay() {
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false });
    },
    formatDate(date) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(event) {
      this.setData({
        show: false,
        date: this.formatDate(event.detail),
      });
      this.data.list.length=0
      this.data.page=0
      this.onQuery()
     
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
      this.onQuery()
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
      if(this.data.list.length>=(this.data.page+1)*20) {
        this.data.page++ 
        this.onQuery()}
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    }
  })
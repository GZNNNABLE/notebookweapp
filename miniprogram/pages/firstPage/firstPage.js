// miniprogram/pages/firstPage/firstPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   

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
  onFreeAdd:function(){
    wx.navigateTo({
      url: '../addFree/addFree',
    })
  },
  onShoppingAdd:function(){
    wx.navigateTo({
      url: '../addShopping/addShopping',
    })
  },
  onLearnAdd:function(){
    wx.navigateTo({
      url: '../addLearn/addLearn',
    })
  },
  onNoteAdd:function(){
    wx.navigateTo({
    url: '../addNote/addNote',
  })}
})
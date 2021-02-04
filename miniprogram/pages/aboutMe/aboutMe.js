import * as echarts from '../../ec-canvas/echarts';

const app = getApp()
var xData = ["1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"], yData = [], chart, charts, pc=0, mobile=0;
function initChart(canvas, width, height,dpr) {
  chart = echarts.init(canvas, null,{
    width: width,
    height: height,
    devicePixelRatio: dpr,
  });
  canvas.setChart(chart);
  var option = {
    color: ["#9bcfff","#5db1ff","#2897ff","#017bec"],
    // color: ["#37A2DA","#00a566","#ff91a3","#c9af20"],
    tooltip: {
      trigger: 'item',
      formatter: "{a} {b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      paddingTop: '50px',
      data: ['日记', '学习','购物','无类型']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
     
    series: [
      {
        radius: ['50%', '70%'],
        name: '我的备忘录',
        
        type: 'pie',
        label: {
          normal: {
            show: false,
            position: 'outside',
            formatter: '{b}:{c}'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '20',
              fontWeight: 'bold'
            }
          }
        },
        data: [          

        ]
      }
    ]
  };
  chart.setOption(option);
  return chart;
}
function initCharts(canvas, width, height,dpr) {
  charts = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr,
    
  });
  canvas.setChart(charts);
 
  var options = {
    color: ["#5db1ff"],
    legend: {
      data: ['日程表分布']
  },
  radar: {
      // shape: 'circle',
      name: {
          textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
          }
      },
      indicator: [
        
          { name: '会议',max:8},
          { name: '学习' ,max:8},
          { name: '购物',max:8},
          { name: '出差' ,max:8},
          { name: '约会' ,max:8},
          { name: '其他', max:8}
      ]
  },
  series: [{
      type: 'radar',
      areaStyle: {},
      // areaStyle: {normal: {}},
      data: [
      ]
  }]
    
    // color: ["#9bcfff","#5db1ff","#2897ff","#017bec","#0065c4","#00478a"],
    // tooltip: {
    //   trigger: 'item',
    //   formatter: "{a} {b}: {c} ({d}%)"
    // },
    // // legend: {
    // //   orient: 'vertical',
    // //   x: 'left',
    // //   paddingTop: '50px',
    // //   data: ['会议', '学习','出差','购物','约会','其他']
    // // },
    // grid: {
    //   left: 20,
    //   right: 20,
    //   bottom: 15,
    //   top: 40,
    //   containLabel: true
    // },
     
    // series: [
    //   {

    //     name: '我的日程',
    //     roseType:'angel',
    //     type: 'pie',
    //     label: {
    //       normal: {
    //         show: true,
    //         position: 'outside',
    //         formatter: '{b}:{c}'
    //       },
    //       emphasis: {
    //         show: true,
    //         textStyle: {
    //           fontSize: '20',
    //           fontWeight: 'bold'
    //         }
    //       }
    //     },
    //     data: [
    //     ]
    //   }
    // ]
  };
 
  charts.setOption(options);
  return charts;
}

Page({
  
  data: {
    ec: {
      onInit: initChart,
    },
    ecs: {
      onInit: initCharts
    },
    loadingShow:false,
    active: 0,
    array: [1, 2, 3, 4, 5],
    msg:'Hello World',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    noteStas:[],
    scheStas:[{_id:'',num:''}],
    radarMax:0,
  },
  onStatisticsNote: function() {  
    wx.showLoading({
      title: '加载中',
      mask:'true'
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'statisticsNote',
    })
    .then(res => {
      
      this.setData({
      noteStas:res.result.list
    })
      
      
      chart.setOption({
        series: [{
          data: 
          [
            { value: this.data.noteStas[3].value, name:this.data.noteStas[3]._id},
            { value: this.data.noteStas[2].value, name:this.data.noteStas[2]._id},
            { value: this.data.noteStas[1].value, name:this.data.noteStas[1]._id},
            { value: this.data.noteStas[0].value, name:this.data.noteStas[0]._id}
          ]
        }
        ]
      });
      wx.hideLoading({})

    })
    .catch(console.error)
  },
  onStatisticsSche: function() {  
    wx.showLoading({
      title: '加载中',
      mask:'true'
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'statisticsSche',
    })
    .then(res => {
      this.setData({
      scheStas:res.result.list
    })
    console.log(this.data.scheStas[0].num)
    for( var i=0;i<this.data.scheStas.length;i++){
      if(this.data.scheStas[i].num>this.data.radarMax){
        this.setData({
          radarMax:this.data.scheStas[i].num
        })
      }
    }
    console.log(this.data.radarMax)
     
      charts.setOption({
        radar:{
          indicator: [
        
            { name: this.data.scheStas[0]._id,max:this.data.radarMax},
            { name: this.data.scheStas[1]._id ,max:this.data.radarMax},
            { name: this.data.scheStas[2]._id,max:this.data.radarMax},
            { name: this.data.scheStas[3]._id ,max:this.data.radarMax},
            { name: this.data.scheStas[4]._id ,max:this.data.radarMax},
            { name: this.data.scheStas[5]._id, max:this.data.radarMax}
        ]
        },
        series: [{
          data: [{
            value:[this.data.scheStas[0].num, 
             this.data.scheStas[1].num, 
             this.data.scheStas[2].num, 
              this.data.scheStas[3].num, 
             this.data.scheStas[4].num, 
             this.data.scheStas[5].num, ],
             name:'日程分布情况'
        }]}
        ]
      });
      wx.hideLoading({})

      
    })
    .catch(console.error)
  },
  //事件处理函数
  onChange(event) {
    this.setData({
      active:event.detail.name
    }) 
    if(this.data.active===1){this.onStatisticsSche()}
  },
  clickMe:function(){
    this.setData({ msg: "Hello" })
  },
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
   //获取当前位置
   onShow:function(){

   },
   onReady:function(){
    
   },
  onLoad: function () {
    this.onStatisticsNote()
    
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var that=this
        var latitude = res.latitude // 纬度
        var longitude = res.longitude // 经度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        markers:[{
          latitude: res.latitude,
          longitude: res.longitude
        }]
      
    }})
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
  ,
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

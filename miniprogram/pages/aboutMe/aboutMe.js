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
          { value: 0, },
          { value: 0}
          ,{ value: 0}
          ,{ value: 0}

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
        { value: 0},
        { value: 0}
        ,{ value: 0}
        ,{ value: 0}
        ,{ value: 0}
        ,{ value: 0}
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
    sche:[],
    note:[],
    loadingShow:false,
    active: 0,
    array: [1, 2, 3, 4, 5],
    msg:'Hello World',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    noteStas:[],
    scheStas:[],
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
      noteStas:res.result.list,
    })
    this.data.noteStas.forEach(function(item){
      item.name = item._id; 
      delete item._id;
  })
  console.log(this.data.noteStas)
      
      
      chart.setOption({
        series: [{
          data: this.data.noteStas

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
      scheStas:res.result.list,
     
    })      
    this.setData({
      
      sche:JSON.parse(JSON.stringify(this.data.scheStas))
    })

    for( var i=0;i<this.data.scheStas.length;i++){
      if(this.data.scheStas[i].num>this.data.radarMax){
        this.setData({
          radarMax:this.data.scheStas[i].num
        })
      }
    }
    console.log(this.data.scheStas)   
     this.data.scheStas.forEach(function(it){
      it.name = it._id; 
      it.max = it.num;
      delete it._id;
      delete it.num;
  })
  for( var i=0;i<this.data.scheStas.length;i++){
    this.data.scheStas[i].max=this.data.radarMax
  }
  var sche1=[]
  for( var i=0;i<this.data.sche.length;i++){
    console.log(this.data.sche[i])
    sche1.push(this.data.sche[i].num)
  }
  this.setData({
    sche:sche1
  })

console.log(this.data.sche)
      charts.setOption({
        radar:{
          indicator: this.data.scheStas
        },
        series: [{
          data: [{value:this.data.sche,
          name:'日程分布情况'}]
        }
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

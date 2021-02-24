// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV,
})
const db = cloud.database()
const $ = db.command.aggregate


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
   return (db.collection('counters').aggregate().match({
     _openid:wxContext.OPENID
   }).group({ 
    _id: '$statisticsName',
    value: $.sum(1)  
  }).end())
  // .then(res =>console.log(res))
  // .catch(err => console.error(err))

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}
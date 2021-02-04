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
  
   return (db.collection('schedule').aggregate().group({ 
    _id: '$tag',
    num: $.sum(1)  
  }).end())
}
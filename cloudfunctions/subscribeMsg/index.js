// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const {OPENID} = cloud.getWXContext();
    // 在云开发数据库中存储用户订阅的课程
    const result = await db.collection('subMsg').add({
      data: {
        touser: OPENID, 
        page: 'searchList', 
        data: event.data, 
        templateId: event.templateId, 
        noticeTime: event.noticeTime,
        timeFmt:event.timeFmt,
        done: false, // 消息发送状态设置为 false
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}
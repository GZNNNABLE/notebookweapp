// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    // 从云开发数据库中查询等待发送的消息列表
    const time = new Date()
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var date = time.getDate()
    var hour = time.getHours()
    var time1 = year+'-'+month+'-'+date+' '+hour+'时'

    const subMsg = await db
      .collection('msgSub').where({
        timeFmt:time1}
      ).get();



    // 循环消息列表
    const sendPromises = subMsg.data.map(async subMsg => {
      try {
        // 发送订阅消息
        await cloud.openapi.subscribeMessage.send({
          touser: subMsg.touser,
          page: subMsg.page,
          data: subMsg.data,
          templateId: subMsg.templateId,
        });
     

      } catch (e) {
        return e;
      }
    });

    return Promise.all(sendPromises);
  } catch (err) {
    console.log(err);
    return err;
  }
}
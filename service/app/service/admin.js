'use strict';
const { Service } = require('egg');

class AdminService extends Service {

  // 检查登陆
  async checkLogin({ userName, password }) {
    const { app, ctx } = this;
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
      "' AND password = '" + password + "'";

    const res = await app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行cookies缓存
      const openId = new Date().getTime();

      ctx.cookies.set('moon_token', openId.toString(), {
        maxAge: 1000 * 3600 * 24, // cookie存储一天 设置过期时间后关闭浏览器重新打开cookie还存在
        httpOnly: true,
        signed: true, // 对cookie进行签名，防止用户修改cookie
        encrypt: true, // 是否对cookie进行加密，如果加密那么获取的时候要对cookie进行解密
      });
      return '登录成功';

    }
    throw { code: 10001, msg: '账户密码错误', _operation: true };
  }
}
module.exports = AdminService;

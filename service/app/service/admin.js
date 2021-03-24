'use strict';
const { Service } = require('egg');

class AdminService extends Service {

  // 查询文章
  async checkLogin({ userName, password }) {
    const { app, ctx } = this;
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
      "' AND password = '" + password + "'";

    const res = await app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();

      ctx.cookies.set('moon_token', openId.toString(), {
        maxAge: 1000 * 3600 * 24, // cookie存储一天 设置过期时间后关闭浏览器重新打开cookie还存在
        httpOnly: true,
        signed: true, // 对cookie进行签名，防止用户修改cookie
        encrypt: true, // 是否对cookie进行加密，如果加密那么获取的时候要对cookie进行解密
      });
      return '登录成功';

    }
    throw { code: 10001, msg: '账户密码错误' };
  }

  // 查询文章
  async queryArticleById(id) {
    const { app } = this;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.viewNum as viewNum ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id;
    const result = await app.mysql.query(sql);
    if (result.length) {
      return result[0];
    }
    throw { code: 10002, msg: '查询文章失败' };
  }

  // 查询文章列表
  async queryArticleList() {
    const { app } = this;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.viewNum as viewNum ,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC ';

    return await app.mysql.query(sql);
  }
}
module.exports = AdminService;

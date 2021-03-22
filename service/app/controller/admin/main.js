'use strict';
const Controller = require('egg').Controller;

class MainController extends Controller {

  async index() {
    // 首页的文章列表数据
    this.ctx.body = 'hi api';
  }

  // 判断用户名密码是否正确
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
      "' AND password = '" + password + "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };

      this.ctx.cookies.set('moon_token', openId.toString(), {
        maxAge: 1000 * 3600 * 24, // cookie存储一天 设置过期时间后关闭浏览器重新打开cookie还存在
        httpOnly: true,
        signed: true, // 对cookie进行签名，防止用户修改cookie
        encrypt: true, // 是否对cookie进行加密，如果加密那么获取的时候要对cookie进行解密
      });
      this.ctx.body = { code: 0, meg: '', data: '登录成功' };

    } else {
      this.ctx.body = { code: 0, meg: 'ok', data: '登录失败' };
    }
  }
  // 后台文章分类信息
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }

  // 添加文章
  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    // tmpArticle.
    const result = await this.app.mysql.insert('article', tmpArticle);
    // 如果改变了一行，带表插入成功
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      code: 0, meg: 'ok',
      data: {
        isSuccess: insertSuccess,
        insertId,
      },
    };
  }

  // 修改文章
  async updateArticle() {
    const tmpArticle = this.ctx.request.body;

    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      code: 0, meg: 'ok', data: {
        isSuccess: updateSuccess,
      },

    };
  }

  // 获得文章列表
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.viewNum as viewNum ,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC ';

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { code: 0, meg: 'ok', data: { list: resList } };
  }

  // 删除文章
  async delArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { code: 0, meg: 'ok', data: res };
  }

  // 根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    const id = this.ctx.params.id;

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
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { code: 0, meg: 'ok', data: result };
  }
}

module.exports = MainController;

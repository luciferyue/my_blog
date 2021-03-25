'use strict';
const Controller = require('egg').Controller;

class MainController extends Controller {

  async index() {
    // 首页的文章列表数据
    this.ctx.body = 'hi api';
  }

  // 判断用户名密码是否正确
  async checkLogin() {
    const { ctx, service } = this;
    const { userName, password } = ctx.request.body;

    // 校验参数
    const paramRule = {
      userName: { type: 'string', required: true },
      password: { type: 'password', required: true },
    };
    ctx.validate(paramRule);

    const result = await service.admin.checkLogin({ userName, password });
    ctx.helper.success({ ctx, data: result });
  }

  // 后台文章分类信息
  async getTypeInfo() {
    const { ctx, app } = this;
    const resType = await app.mysql.select('type');
    ctx.helper.success({ ctx, data: resType });
  }

  // 添加文章
  async addArticle() {
    const { ctx, app } = this;
    const tmpArticle = ctx.request.body;
    // tmpArticle.
    const result = await app.mysql.insert('article', tmpArticle);
    // 如果改变了一行，带表插入成功
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    ctx.helper.success({
      ctx, data: {
        isSuccess: insertSuccess,
        insertId,
      },
    });
  }

  // 修改文章
  async updateArticle() {
    const { ctx, app } = this;
    const tmpArticle = ctx.request.body;
    const result = await app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    ctx.helper.success({
      ctx, data: {
        isSuccess: updateSuccess,
      },
    });
  }

  // 获得文章列表
  async getArticleList() {
    const { ctx, service } = this;
    const result = await service.article.queryArticleList();
    ctx.helper.success({ ctx, data: { list: result } });
  }

  // 删除文章
  async delArticle() {
    const { ctx } = this;
    const id = ctx.query.id;
    const result = await this.app.mysql.delete('article', { id });
    const isSuccess = result.affectedRows === 1;
    ctx.helper.success({
      ctx, data: {
        isSuccess,
      },
    });
  }

  // 根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    const { ctx, service } = this;
    const result = await service.article.queryArticleById(ctx.query.id);
    ctx.helper.success({ ctx, data: result });
  }
}

module.exports = MainController;

'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // const result = await this.app.mysql.get('blog_content', {});
    // this.ctx.body = result;

    this.ctx.body = 'api hi';
  }

  // 获取文章列表
  async getArticleList() {
    const { ctx, service } = this;
    const result = await service.article.queryArticleList();
    ctx.helper.success({ ctx, data: result });
  }

  // 获取文章详情
  async getArticleById() {
    // 先配置路由的动态传值，然后再接收值
    const { ctx, service } = this;
    const result = await service.article.queryArticleById(ctx.params.id);
    ctx.helper.success({ ctx, data: result });
  }

  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  // 根据类别ID获得文章列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.viewNum as viewNum ,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE type_id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;

// RESTful是目前最流行的网络应用程序设计风格和开发方式，大量使用在移动端App上和前后端分离的接口设计。这种形式更直观并且接口也有了一定的约束性。
// 请求方式 get获取 post新建 put更新 delete删除

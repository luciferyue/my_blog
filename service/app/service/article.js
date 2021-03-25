'use strict';
const { Service } = require('egg');

class ArticleService extends Service {

  // 查询文章
  async queryArticleById(id) {
    const { app } = this;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'article.viewNum as viewNum ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id;
    const result = await app.mysql.query(sql);
    if (result.length) {
      return result[0];
    }
    throw { code: 10002, msg: '查询文章失败', _operation: true };
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
module.exports = ArticleService;

const APP_URL = "http://127.0.0.1:7001/admin/";

const serverApi = {
  checkLogin: APP_URL + 'checkLogin',
  getTypeInfo: APP_URL + 'getTypeInfo',  //  获得文章类别信息
  addArticle: APP_URL + 'addArticle',  //  添加文章
  updateArticle: APP_URL + 'updateArticle',  //  修改文章
  getArticleList: APP_URL + 'getArticleList',  //  文章列表 
  delArticle: APP_URL + 'delArticle',  //  删除列表 
  getArticleById: APP_URL + 'getArticleById',  //  获取单个文章
}

export default serverApi;
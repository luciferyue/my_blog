const APP_URL = "http://127.0.0.1:7001/api/";

const serverApi = {
  getArticleList: APP_URL + 'getArticleList',
  getArticleById: APP_URL + 'getArticleById/',
  getTypeInfo: APP_URL + 'getTypeInfo',
  getListById: APP_URL + 'getListById/',
}

export default serverApi;
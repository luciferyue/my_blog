export function action(type, payload = {}) {
	return {
		type,
		payload,
	};
}

export const UPDATE_INITIALIZE = "UPDATE_INITIALIZE";
export const PAGE_INITIALIZED_ERROR = "PAGE_INITIALIZED_ERROR";
export const FETCH_INIT = "FETCH_INIT"; //页面初始化
export const UPDATE_LOADING = "UPDATE_LOADING"; //loading

export const FETCH_LOGIN_DATA = "FETCH_LOGIN_DATA"; //请求login数据

export const FETCH_ARTICLE_LIST_DATA = "FETCH_ARTICLE_LIST_DATA"; //请求article-list数据
export const RECEIVE_ARTICLE_LIST_DATA = "RECEIVE_ARTICLE_LIST_DATA"; //接收article-list数据

export const FETCH_ARTICLE_DATA = "FETCH_ARTICLE_DATA"; //请求article数据
export const RECEIVE_ARTICLE_DATA = "RECEIVE_ARTICLE_DATA"; //接收article数据
export const UPDATE_ARTICLE_DATA = "UPDATE_ARTICLE_DATA"; //更新article数据

export const FETCH_ARTICLE_TYPE = "FETCH_ARTICLE_TYPE";	//请求article 类型
export const RECEIVE_ARTICLE_TYPE = "RECEIVE_ARTICLE_TYPE"; //接收article 类型

export const CLEAR_ARTICLE_DATA = "CLEAR_ARTICLE_DATA"; //清除文章
export const FETCH_ADD_ARTICLE_DATA = "FETCH_ADD_ARTICLE_DATA"; //添加文章
export const FETCH_UPDATE_ARTICLE_DATA = "FETCH_UPDATE_ARTICLE_DATA"; //跟新文章
export const FETCH_DELETE_ARTICLE_DATA = "FETCH_DELETE_ARTICLE_DATA"; //删除文章



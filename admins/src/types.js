export function action(type, payload = {}) {
	return {
		type,
		payload,
	};
}

export const UPDATE_INITIALIZE = "UPDATE_INITIALIZE";
export const PAGE_INITIALIZED_ERROR = "PAGE_INITIALIZED_ERROR";
export const FETCH_INIT = "FETCH_INIT"; //页面初始化

export const FETCH_LOGIN_DATA = "FETCH_LOGIN_DATA"; //请求login数据

export const FETCH_ARTICLE_LIST_DATA = "FETCH_ARTICLE_LIST_DATA"; //请求article-list数据
export const RECEIVE_ARTICLE_LIST_DATA = "RECEIVE_ARTICLE_LIST_DATA"; //接收article-list数据

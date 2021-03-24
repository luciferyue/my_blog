
import { combineReducers } from "redux";
import { RECEIVE_ARTICLE_DATA, UPDATE_ARTICLE_DATA, RECEIVE_ARTICLE_TYPE, CLEAR_ARTICLE_DATA } from "@types";

const defaultArticle = {
	id: 0,
	title: "",
	introduce: "",
	article_content: "",
	addTime: "",
	viewNum: 0,
	typeName: "请选择",
	typeId: ""
};

const articleState = (state = defaultArticle, action) => {
	switch (action.type) {
		case RECEIVE_ARTICLE_DATA:
			return action.payload;
		case UPDATE_ARTICLE_DATA:
			return { ...state, ...action.payload };
		case CLEAR_ARTICLE_DATA:
			return defaultArticle;
		default:
			return state;
	}
};

const typeState = (state = null, action) => {
	switch (action.type) {
		case RECEIVE_ARTICLE_TYPE:
			return action.payload;
		default:
			return state;
	}
};

const articleReducer = combineReducers({
	articleState,
	typeState
});

export default articleReducer;
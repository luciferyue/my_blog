
import { combineReducers } from "redux";
import { RECEIVE_ARTICLE_LIST_DATA } from "@types";

const articleListState = (state = null, action) => {
	switch (action.type) {
		case RECEIVE_ARTICLE_LIST_DATA:
			return action.payload;
		default:
			return state;
	}
};

const articleListReducer = combineReducers({
	articleListState,
});

export default articleListReducer;
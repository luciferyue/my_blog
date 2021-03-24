
import { combineReducers } from "redux";
import { UPDATE_INITIALIZE, PAGE_INITIALIZED_ERROR, UPDATE_LOADING } from "@types";

const initializeState = {
	errorType: 0,
	errorMsg: "",
	isInitialized: true,
};
const initStatus = (state = initializeState, action) => {
	switch (action.type) {
		case PAGE_INITIALIZED_ERROR:
			if (typeof action.payload === "number") {
				return { ...state, errorType: action.payload, errorMsg: "" };
			} else {
				return { ...state, ...action.payload };
			}
		case UPDATE_INITIALIZE:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

const loading = (state = false, action) => {
	switch (action.type) {
		case UPDATE_LOADING:
			return action.payload;
		default:
			return state;
	}
};

const commonReducer = combineReducers({
	initStatus,
	loading
});

export default commonReducer;
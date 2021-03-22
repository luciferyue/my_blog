import { takeEvery, put } from "redux-saga/effects";
import * as api from "@src/api";
import { requestSaga } from "./request.saga";
import { FETCH_ARTICLE_LIST_DATA, RECEIVE_ARTICLE_LIST_DATA } from "@types";

export function* fetchArticleList() {
	try {
		const payload = yield requestSaga(api.fetchArticleList, {
			apiParam: {},
			errorLevel: 2,
		});
		yield put({ type: RECEIVE_ARTICLE_LIST_DATA, payload });
	} catch (e) {
		console.log(e);
	}
}

export function* watchFetchArticleList() {
	yield takeEvery(FETCH_ARTICLE_LIST_DATA, fetchArticleList);
}
import { takeEvery, put } from "redux-saga/effects";
import * as api from "@src/api";
import { requestSaga, upLoading } from "./request.saga";
import { FETCH_ARTICLE_LIST_DATA, RECEIVE_ARTICLE_LIST_DATA } from "@types";

export function* fetchArticleList() {
	yield upLoading(true);
	try {
		const payload = yield requestSaga(api.fetchArticleList, {
			apiParam: {},
			errorLevel: 1,
		});
		yield put({ type: RECEIVE_ARTICLE_LIST_DATA, payload });
	} catch (e) {
		console.log(e);
	}
	yield upLoading(false);
}

export function* watchFetchArticleList() {
	yield takeEvery(FETCH_ARTICLE_LIST_DATA, fetchArticleList);
}
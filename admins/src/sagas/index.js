import { all, fork } from "redux-saga/effects";
import * as commonSagas from "./common.saga";
import * as ArticleSagas from "./article-list.saga";

export default function* rootSaga() {
	yield all([
		fork(commonSagas.watchFetchLogin),
		fork(ArticleSagas.watchFetchArticleList),
	]);
}

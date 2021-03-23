import { all, fork } from "redux-saga/effects";
import * as commonSagas from "./common.saga";
import * as ArticleListSagas from "./article-list.saga";
import * as ArticleSagas from "./article.saga";

export default function* rootSaga() {
	yield all([
		fork(commonSagas.watchFetchLogin),
		fork(ArticleListSagas.watchFetchArticleList),
		fork(ArticleSagas.watchFetchArticle),
		fork(ArticleSagas.watchFetchArticleType),
		fork(ArticleSagas.watchFetchAddArticle),
		fork(ArticleSagas.watchFetchUpdateArticle),
		fork(ArticleSagas.watchFetchDeleteArticle),
	]);
}

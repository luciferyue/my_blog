import { takeEvery, put } from "redux-saga/effects";
import * as api from "@src/api";
import { requestSaga } from "./request.saga";
import { message } from "antd";
import {
	FETCH_ARTICLE_DATA,
	RECEIVE_ARTICLE_DATA,
	FETCH_ARTICLE_TYPE,
	RECEIVE_ARTICLE_TYPE,
	FETCH_ADD_ARTICLE_DATA,
	FETCH_UPDATE_ARTICLE_DATA,
	FETCH_DELETE_ARTICLE_DATA
} from "@types";

//获取type
export function* fetchArticleType(opt) {
	const parm = opt.payload;
	try {
		const payload = yield requestSaga(api.fetchTypeData, {
			apiParam: parm,
			errorLevel: 1,
		});
		yield put({ type: RECEIVE_ARTICLE_TYPE, payload });
	} catch (e) {
		console.log(e);
	}
}

export function* watchFetchArticleType() {
	yield takeEvery(FETCH_ARTICLE_TYPE, fetchArticleType);
}

//获取文章
export function* fetchArticle(opt) {
	const parm = opt.payload;
	try {
		const payload = yield requestSaga(api.fetchArticleData, {
			apiParam: parm,
			errorLevel: 1,
		});
		yield put({ type: RECEIVE_ARTICLE_DATA, payload });
	} catch (e) {
		console.log(e);
	}
}

export function* watchFetchArticle() {
	yield takeEvery(FETCH_ARTICLE_DATA, fetchArticle);
}

//添加文章
export function* fetchAddArticle(opt) {
	const { apiParam, callback } = opt.payload;
	try {
		const result = yield requestSaga(api.fetchAddArticle, {
			apiParam,
			errorLevel: 1,
		});

		if (result.isSuccess) {
			callback && callback(result.insertId);
			message.success("文章保存成功");
		} else {
			message.error("保存失败");
		}
	} catch (e) {
		console.log(e);
	}
}

export function* watchFetchAddArticle() {
	yield takeEvery(FETCH_ADD_ARTICLE_DATA, fetchAddArticle);
}

//更新文章
export function* fetchUpdateArticle(opt) {
	const parm = opt.payload;
	try {
		const result = yield requestSaga(api.fetchUpdateArticle, {
			apiParam: parm,
			errorLevel: 1,
		});

		if (result.isSuccess) {
			message.success("文章更新成功");
		} else {
			message.error("文章更新失败");
		}
	} catch (e) {
		console.log(e);
	}
}

export function* watchFetchUpdateArticle() {
	yield takeEvery(FETCH_UPDATE_ARTICLE_DATA, fetchUpdateArticle);
}

//删除文章
export function* fetchDeleteArticle(opt) {
	const { callback, id } = opt.payload;
	try {
		const result = yield requestSaga(api.fetchDeleteArticle, {
			apiParam: { id },
			errorLevel: 1,
		});
		if (result.isSuccess) {
			message.success("文章删除成功");
		} else {
			message.error("文章删除失败");
		}
		callback && callback();
	} catch (e) {
		console.log(e);
	}
}

export function* watchFetchDeleteArticle() {
	yield takeEvery(FETCH_DELETE_ARTICLE_DATA, fetchDeleteArticle);
}
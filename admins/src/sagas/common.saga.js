import { takeEvery } from "redux-saga/effects";
import * as api from "@src/api";
import { requestSaga } from "./request.saga";
import { FETCH_LOGIN_DATA } from "@types";
import { message } from "antd";

export function* fetchLogin(opt) {
	const { userName, password, callback } = opt.payload;
	message.loading(true);
	try {
		const payload = yield requestSaga(api.fetchLogin, {
			apiParam: { userName, password }
		});
		callback && callback(payload);
		message.loading(false);
	} catch (e) {
		console.log(e);
	}
}

export function* watchFetchLogin() {
	yield takeEvery(FETCH_LOGIN_DATA, fetchLogin);
}
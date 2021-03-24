import { takeEvery } from "redux-saga/effects";
import * as api from "@src/api";
import { requestSaga, upLoading } from "./request.saga";
import { FETCH_LOGIN_DATA } from "@types";
import { history } from "../store";

export function* fetchLogin(opt) {
	const { userName, password } = opt.payload;
	yield upLoading(true);
	try {
		yield requestSaga(api.fetchLogin, {
			apiParam: { userName, password }
		});
		history.push("/cms");
	} catch (e) {
		console.log(e);
	}
	yield upLoading(false);
}

export function* watchFetchLogin() {
	yield takeEvery(FETCH_LOGIN_DATA, fetchLogin);
}
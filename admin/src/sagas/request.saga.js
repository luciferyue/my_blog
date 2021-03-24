import { call, put } from "redux-saga/effects";
import http from "@utils/http";
import { PAGE_INITIALIZED_ERROR, UPDATE_LOADING } from "@types";
import { message } from "antd";
import { history } from "../store";

export function* requestSaga(url, params) {
	const opts = {
		errorLevel: 1, //1:toast处理  2：页面级抛错处理
		disposeError: true,
		apiParam: null, //接口参数
		...params,
	};
	let response = null;
	try {
		response = yield call(request, url, opts);
		const { status, data } = response;
		if (status === 200) {
			const { code, msg } = data;
			if (code === 0) {
				// 业务正常
				return data.data;
			} else {
				throw { code, msg, response };
			}
		}
	} catch (err) {
		throw yield call(disposeError, err, opts);
	}
}

function request(apiUrl, opts) {
	const [type, url] = apiUrl.split(" ");
	return http.request(type, { ...opts, url });
}

/**
 *
 * @param err 通用果错误处理
 * @param opts
 */
export function* disposeError(err, opts) {
	const { errorLevel, disposeError } = opts;

	if (!disposeError) return err;

	//服务器异常
	if (err.response && err.response.status !== 200) {
		if (err.response.status === 401) {
			//未登录跳转
			history.push("/");
		} else {
			if (errorLevel === 1) {
				showToast("出错了");
			} else {
				//页面级错误
				yield pageError();
			}
		}
		return null;
	}
	//网络异常
	if (err.timeout) {
		if (errorLevel === 1) {
			showToast("网络超时");
		} else {
			//页面级错误
			yield pageError("网络超时", 2);
		}
		return null;
	}
	//业务异常
	if (errorLevel === 1) {
		if (disposeError) {
			showToast(err.msg || "出错了");
		}
	} else {
		//页面级错误
		yield pageError(err.msg);
	}
	return err;
}

function showToast(msg) {
	message.info(msg);
}

function* pageError(msg = "", errorType = 1) {
	yield put({
		type: PAGE_INITIALIZED_ERROR,
		payload: { errorType, errorMsg: msg },
	});
	message.loading(false);
}

export function* upLoading(bl) {
	yield put({
		type: UPDATE_LOADING,
		payload: bl,
	});
}

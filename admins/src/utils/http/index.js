import axios from "axios";
import qs from "qs";
// import { setCookie } from "@utils/tools";
class HttpManager {
	constructor() {
		this.headers = {
			Accept: "application/json",
			platform: "browser",
			channel: "common",
			version: "1.0.0",
		};
		// setCookie("openId", "123131231");
	}

	init(options) {
		const { appSecret } = options;
		this.appSecret = appSecret.key;
	}

	async request(method = "GET", options) {
		const { url, apiParam, contentType } = options;
		let signParams = apiParam || {};

		let apiUrl = url;

		if (method === "GET") {
			const paramsString = qs.stringify(signParams);
			apiUrl = `${url}?${paramsString}`;

			signParams = {};
		}

		return axios.request({
			method,
			headers: { ...this.headers, "Content-Type": contentType || "application/json" },
			url: apiUrl,
			data: signParams,
			withCredentials: true,
		});
	}

	get(options) {
		return this.request("GET", options);
	}

	post(options) {
		return this.request("POST", options);
	}
}

export default new HttpManager();

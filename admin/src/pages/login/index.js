import React, { useState } from "react";
import { useAction, useStore } from "@hooks";
import { FETCH_LOGIN_DATA } from "@src/types";
import { Card, Input, Button, Spin, message } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import "./index.css";
const Icon = createFromIconfontCN({
	scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",// 在 iconfont.cn 上生成 
});

function Login() {
	const isLoading = useStore("commonReducer.loading");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");


	const fetchLogin = useAction(FETCH_LOGIN_DATA);
	const checkLogin = () => {
		if (!userName) {
			message.error("用户名不能为空");
			return false;
		} else if (!password) {
			message.error("密码不能为空");
			return false;
		}
		fetchLogin({ userName, password });
	};
	console.log(isLoading);
	return (
		<div className="login-div">
			<Spin tip="Loading..." spinning={isLoading}>
				<Card title="JSMoon Blog  System" bordered={true} style={{ width: 400 }} >
					<Input
						id="userName"
						size="large"
						placeholder="Enter your userName"
						prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
						onChange={(e) => { setUserName(e.target.value); }}
					/>
					<br /><br />
					<Input.Password
						id="password"
						size="large"
						placeholder="Enter your password"
						prefix={<Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />}
						onChange={(e) => { setPassword(e.target.value); }}
					/>
					<br /><br />
					<Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
				</Card>
			</Spin>
		</div>
	);

}
export default Login;
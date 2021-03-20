import React, { useState } from 'react';
import { Card, Input, Button, Spin, message } from 'antd';
import "./index.css";
import { createFromIconfontCN } from '@ant-design/icons';
import api from "../../api";
import axios from "axios";
const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',// 在 iconfont.cn 上生成 
});

function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = () => {
    if (!userName) {
      message.error('用户名不能为空');
      return false;
    } else if (!password) {
      message.error('密码不能为空');
      return false;
    }
    setIsLoading(true);
    axios({
      method: 'post',
      url: api.checkLogin,
      data: { userName, password },
      header: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true
    }).then(
      res => {
        setIsLoading(false)
        if (res.data.data === '登录成功') {
          localStorage.setItem('openId', res.data.openId);
          props.history.push('/index')
        } else {
          message.error('用户名密码错误')
        }
      }
    );
  }
  return (
    <div className="login-div">

      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="JSPang Blog  System" bordered={true} style={{ width: 400 }} >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <br /><br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <br /><br />
          <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
        </Card>
      </Spin>
    </div>
  )

}
export default Login
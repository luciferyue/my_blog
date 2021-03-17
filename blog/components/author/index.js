import React from "react";
import { Avatar, Divider } from "antd";
import "./index.css";

const Author = () => {
  return (
    <div className="author-div common-box">
      <Avatar size={100} src="//img1.guanaitong.com/grus-gfs/product/giveapp-rest-h5/by-days/2021-03-17/167286825fd253c5016e53cb8f65b4bb" />
      <div className="author-info">
        小白一样的开发
        <Divider >社交账号</Divider>
        <Avatar size={28} icon="github" className="account" />
        <Avatar size={28} icon="qq" className="account" />
        <Avatar size={28} icon="wechat" className="account" />
      </div>
    </div>
  )
}

export default Author;

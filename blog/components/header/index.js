import React from "react";
import "./index.css";
import { Row, Col, Menu, Icon } from "antd";

//头部
const Header = () => {
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-log">Luffy</span>
          <span className="header-text">起航</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal">
            <Menu.Item key="home">
              <Icon type="home" />首页
            </Menu.Item>
            <Menu.Item key="video">
              <Icon type="star" />文章列表
            </Menu.Item>
            <Menu.Item key="life">
              <Icon type="smile" />生活
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header;
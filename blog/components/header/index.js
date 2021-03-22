import React, { useEffect, useState } from "react";
import { Row, Col, Menu, Icon } from "antd";
import Router from 'next/router';
// import Link from 'next/link';
import axios from 'axios';
import api from '../../config/apiUrl';
import "./index.css";

//头部
const Header = () => {
  const [navArray, setNavArray] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(api.getTypeInfo).then(
        (res) => {
          setNavArray(res.data.data)
          return res.data.data
        }
      )
      setNavArray(result);
    }
    fetchData();
  }, [])

  //跳转到列表页
  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push('/index')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <div className="logo">Luffy起航</div>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu
            mode="horizontal"
            onClick={handleClick}
          >
            <Menu.Item key="0">
              <Icon type="home" />
              博客首页
          </Menu.Item>
            {
              navArray.map((item) => {
                return (
                  <Menu.Item key={item.id}>
                    <Icon type={item.icon} />
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header;
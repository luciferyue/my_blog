import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import axios from 'axios'
import api from '../config/apiUrl'
import Link from 'next/link'
import { Row, Col, List, Icon, Breadcrumb } from "antd";
import Header from "../components/header";
import Author from "../components/author";
import Advert from "../components/advert";
import Footer from "../components/footer";
import "../static/style/index.css";

function MyList(props) {
  const [myList, setList] = useState(props.data);
  useEffect(() => {
    setList(props.data)
  })
  return (
    <div>
      <Head>
        <title>MyList</title>
      </Head>
      <Header />
      <Row className="common-wap" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><Icon type="calendar" />{item.addTime}</span>
                  <span><Icon type="folder" /> {item.typeName}</span>
                  <span><Icon type="fire" />  {item.view_count}人</span>
                </div>
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

MyList.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(api.getListById + id).then(
      (res) => resolve(res.data)
    )
  })
  return await promise;
}

export default MyList;

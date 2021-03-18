import React, { useState } from "react";
import Head from 'next/head';
import Link from "next/link";
import { Row, Col, List, Icon } from "antd";
import Header from "../components/header";
import Author from "../components/author";
import Advert from "../components/advert";
import Footer from "../components/footer";
import axios from "axios";
import api from '../config/apiUrl';
import marked from 'marked'
import HightLight from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import "../static/style/index.css";

function Home(list) {
  const [myList, setList] = useState(list.data);
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer, //自定义render渲染
    gfm: true,  //启动github渲染模式
    pedantic: false,  //是否容错
    sanitize: false,  //是否忽略html标签
    tables: true, //是否允许git表格样式
    breaks: false,  //是否支持git换行
    smartLists: true, //是否自动渲染列表样式
    smartypants: false, //
    highlight: function (code) {
      return HightLight.highlightAuto(code).value;
    }
  });
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="common-wap" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
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
                  <span><Icon type="calendar" />{item.addTime || "今天"}</span>
                  <span><Icon type="folder" />教程</span>
                  <span><Icon type="fire" />{item.viewNum}人</span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }} />
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

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(api.getArticleList).then((res) => {
      console.log('远程获取数据结果:', res.data.data)
      resolve(res.data)
    })
  })

  return await promise
}

export default Home;

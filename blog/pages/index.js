import React, { useState } from "react";
import Link from "next/link";
import { List, Icon } from "antd";
import Layout from "../components/layout";
import axios from "axios";
import api from '../config/apiUrl';
import marked from 'marked'
import HightLight from "highlight.js";

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
    <Layout title="首页">
      <List
        header={<div>最新文章</div>}
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
              <span><Icon type="calendar" /> {item.addTime || "今天"}</span>
              <span><Icon type="folder" /> {item.typeName}</span>
              <span><Icon type="fire" /> {item.viewNum}人</span>
            </div>
            <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }} />
          </List.Item>
        )}
      />
    </Layout>
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

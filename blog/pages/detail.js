import Head from 'next/head';
// import ReactMarkdown from 'react-markdown';
// import MarkNav from 'markdown-navbar';
import axios from "axios";
import marked from 'marked'
import HightLight from "highlight.js";
import 'markdown-navbar/dist/navbar.css';
import { Breadcrumb, Affix } from "antd";
import Layout from "../components/layout";
import Tocify from '../components/tocify/index.tsx';
import api from '../config/apiUrl';

function Detail(props) {
  const tocify = new Tocify();

  const renderer = new marked.Renderer();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

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

  let html = marked(props.article_content);
  console.log(props);
  const renderAffix = () => {
    return (
      <Affix offsetTop={5}>
        <div className="detailed-nav common-box">
          <div className="nav-title">文章目录</div>
          {tocify && tocify.render()}
        </div>
      </Affix>
    )
  }

  const renderBread = () => {
    return (
      <div className="bread-wap">
        <Breadcrumb>
          <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href={`/list?id=${props.typeId}`}>{props.typeName}列表</a></Breadcrumb.Item>
          <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }

  return (
    <Layout
      title="文章详情"
      renderBread={renderBread}
      renderAffix={renderAffix}
    >
      <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}
Detail.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(api.getArticleById + id).then((res) => {
      console.log('远程获取数据结果:', res.data.data)
      resolve(res.data.data)
    });
  })

  return await promise
}

export default Detail;

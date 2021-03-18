import Head from 'next/head';
// import ReactMarkdown from 'react-markdown';
// import MarkNav from 'markdown-navbar';
import axios from "axios";
import marked from 'marked'
import HightLight from "highlight.js";
import 'markdown-navbar/dist/navbar.css';
import { Row, Col, Icon, Breadcrumb, Affix } from "antd";
import Header from "../components/header";
import Author from "../components/author";
import Advert from "../components/advert";
import Footer from "../components/footer";
import Tocify from '../components/tocify/index.tsx';
import "../static/style/details.css";
import 'highlight.js/styles/monokai-sublime.css';
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

  return (
    <div>
      <Head>
        <title>Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Row className="common-wap" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/list">视频列表</a></Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                React实战视频教程-技术胖Blog开发(更新08集)
              </div>

              <div className="list-icon center">
                <span><Icon type="calendar" /> 2019-06-28</span>
                <span><Icon type="folder" /> 教程</span>
                <span><Icon type="fire" /> 5498人</span>
              </div>

              <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav common-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}
Detail.getInitialProps = async (context) => {
  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(api.getArticleById + id).then((res) => {
      console.log('远程获取数据结果:', res.data.data)
      resolve(res.data.data[0])
    });
  })

  return await promise
}

export default Detail;

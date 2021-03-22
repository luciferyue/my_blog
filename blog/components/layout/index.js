import React from "react";
import Head from 'next/head';
import { Row, Col } from "antd";
import Header from "../header";
import Author from "../author";
import Advert from "../advert";
import Footer from "../footer";
import 'highlight.js/styles/monokai-sublime.css';
import "./index.css";

function Layout(props) {
  const { children, renderAffix, renderBread, title } = props;
  return (
    <>
      <Head><title>{title}</title></Head>
      <Header />
      <Row className="common-wap" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          {renderBread && renderBread()}
          {children}
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          {renderAffix && renderAffix()}
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export default Layout;

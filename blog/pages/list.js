import Head from 'next/head';
import { Row, Col } from "antd";
import Header from "../components/header";

function List() {
  return (
    <div>
      <Head>
        <title>List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Row className="common-wap" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          左侧
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          右侧
        </Col>
      </Row>
    </div>
  )
}

export default List;

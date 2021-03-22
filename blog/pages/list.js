import React, { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../config/apiUrl'
import Link from 'next/link'
import { List, Icon } from "antd";
import Layout from "../components/layout";

function MyList(props) {
  const [myList, setList] = useState(props.data);
  useEffect(() => {
    setList(props.data)
  })
  return (
    <Layout title="文章列表">
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
    </Layout>
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

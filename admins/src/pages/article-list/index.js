import React, { useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import { useHistory } from "react-router";
import { useAction, useStore } from "@hooks";
import { FETCH_ARTICLE_LIST_DATA, FETCH_DELETE_ARTICLE_DATA } from "@src/types";
import "./index.css";
const { confirm } = Modal;

function ArticleList() {
	const { push } = useHistory();
	const fetchData = useAction(FETCH_ARTICLE_LIST_DATA);
	const deleteData = useAction(FETCH_DELETE_ARTICLE_DATA);
	const { articleListState } = useStore("articleListReducer");

	useEffect(() => {
		document.title = "article-list";
		fetchData();
	}, []);

	const handleClick = (id) => {
		push("/cms/add/" + id);
	};

	//删除文章的方法
	const delArticle = (id) => {
		confirm({
			title: "确定要删除这篇博客文章吗?",
			content: "如果你点击OK按钮，文章将会永远被删除，无法恢复。",
			onOk() {
				deleteData({
					id, callback: () => {
						fetchData();
					}
				});
			},
			onCancel() {
				message.success("没有任何改变");
			},
		});

	};

	if (!articleListState) return null;
	const { list } = articleListState;
	return (
		<List
			header={
				<Row className="list-div">
					<Col span={8}>
						<b>标题</b>
					</Col>
					<Col span={3}>
						<b>类别</b>
					</Col>
					<Col span={3}>
						<b>发布时间</b>
					</Col>
					<Col span={3}>
						<b>集数</b>
					</Col>
					<Col span={3}>
						<b>浏览量</b>
					</Col>

					<Col span={4}>
						<b>操作</b>
					</Col>
				</Row>
			}
			bordered
			dataSource={list}
			renderItem={item => (
				<List.Item>
					<Row className="list-div">
						<Col span={8}>
							{item.title}
						</Col>
						<Col span={3}>
							{item.typeName}
						</Col>
						<Col span={3}>
							{item.addTime}
						</Col>
						<Col span={3}>
							共<span>{item.part_count}</span>集
						</Col>
						<Col span={3}>
							{item.viewNum}
						</Col>

						<Col span={4}>
							<Button type="primary" onClick={() => handleClick(item.id)}>修改</Button>&nbsp;
							<Button onClick={() => delArticle(item.id)} >删除 </Button>
						</Col>
					</Row>
				</List.Item>
			)}
		/>
	);
}

export default ArticleList;

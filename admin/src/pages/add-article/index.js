import React, { useEffect } from "react";
import PropTypes from "prop-types";
import marked from "marked";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import { useAction, useStore } from "@hooks";
import {
	FETCH_ARTICLE_DATA,
	UPDATE_ARTICLE_DATA,
	FETCH_ARTICLE_TYPE,
	FETCH_ADD_ARTICLE_DATA,
	FETCH_UPDATE_ARTICLE_DATA,
	CLEAR_ARTICLE_DATA
} from "@src/types";
import "./index.css";

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
	const fetchData = useAction(FETCH_ARTICLE_DATA);
	const fetchTypeData = useAction(FETCH_ARTICLE_TYPE);
	const updateData = useAction(UPDATE_ARTICLE_DATA);
	const fetchAddData = useAction(FETCH_ADD_ARTICLE_DATA);
	const fetchUpdateData = useAction(FETCH_UPDATE_ARTICLE_DATA);
	const clearData = useAction(CLEAR_ARTICLE_DATA);
	const { articleState, typeState } = useStore("articleReducer");
	const { id, title, typeName, article_content, introduce, typeId, addTime } = articleState;
	console.log(typeState);

	marked.setOptions({
		renderer: marked.Renderer(),
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: false,
		smartLists: true,
		smartypants: false,
	});

	//文章内容change
	const changeContent = (e) => {
		updateData({ article_content: e.target.value });
	};

	//简介change
	const changeIntroduce = (e) => {
		updateData({ introduce: e.target.value });
	};


	useEffect(() => {
		document.title = "add-article";
		//获得文章ID
		let tmpId = props.match.params.id;
		tmpId && fetchData({ id: tmpId });
		fetchTypeData();

		return () => {
			clearData();
		};
	}, []);

	const saveArticle = () => {
		if (!typeId) {
			message.error("必须选择文章类别");
			return false;
		} else if (!title) {
			message.error("文章名称不能为空");
			return false;
		} else if (!article_content) {
			message.error("文章内容不能为空");
			return false;
		} else if (!introduce) {
			message.error("简介不能为空");
			return false;
		} else if (!addTime) {
			message.error("发布日期不能为空");
			return false;
		}
		const dataProps = { ...articleState };   //传递到接口的参数
		let dateText = addTime.replace("-", "/"); //把字符串转换成时间戳
		dataProps.addTime = (new Date(dateText).getTime()) / 1000;
		dataProps.type_id = typeId;
		delete dataProps.typeId;

		if (id === 0) {
			fetchAddData({
				apiParam: dataProps, callback: (id) => {
					fetchData({ id });
				}
			});
		} else {
			fetchUpdateData(dataProps);
		}
	};
	if (!typeState) return null;
	console.log(articleState);
	const changeSelect = (val, obj) => {
		updateData({ typeId: val, typeName: obj.children });
	};
	return (
		<Row gutter={5}>
			<Col span={18}>
				<Row gutter={10} >
					<Col span={20}>
						<Input
							value={title}
							placeholder="博客标题"
							onChange={(e) => updateData({ title: e.target.value })}
							size="large"
						/>
					</Col>
					<Col span={4}>
						<Select value={typeName} size="large" onChange={changeSelect}>
							{
								typeState.map((item, index) => {
									return (<Option key={index} value={item.id}>{item.typeName}</Option>);
								})
							}
						</Select>
					</Col>
				</Row>
				<br />
				<Row gutter={10} >
					<Col span={12}>
						<TextArea
							value={article_content}
							className="markdown-content"
							rows={35}
							onChange={changeContent}
							onPressEnter={changeContent}
							placeholder="文章内容"
						/>
					</Col>
					<Col span={12}>
						<div
							className="show-html"
							dangerouslySetInnerHTML={{ __html: marked(article_content) }} >
						</div>
					</Col>
				</Row>
			</Col>


			<Col span={6}>
				<Row>
					<Col span={24}>
						<Button size="large">暂存文章</Button>&nbsp;
						<Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
						<br />
					</Col>
					<Col span={24}>
						<br />
						<TextArea
							rows={4}
							value={introduce}
							onChange={changeIntroduce}
							onPressEnter={changeIntroduce}
							placeholder="文章简介"
						/>
						<br />
						<div
							className="introduce-html"
							dangerouslySetInnerHTML={{ __html: "文章简介：" + marked(introduce) }} >
						</div>
					</Col>

					<Col span={12}>
						<div className="date-select">
							<DatePicker
								onChange={(date, dateString) => updateData({ addTime: dateString })}
								placeholder="发布日期"
								size="large"
							/>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	);
}
AddArticle.propTypes = {
	match: PropTypes.object,
};
export default AddArticle;

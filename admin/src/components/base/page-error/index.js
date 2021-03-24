import React from "react";
import PropTypes from "prop-types";

function PageError(props) {
	const { errorType, errorMsg } = props;

	const config = () => {
		switch (errorType) {
			case 1: //通用出错了
			default:
				return {
					type: "gat-error",
					title: errorMsg || "出错了"
				};
			case 2: //网络超时
				return {
					type: "gat-error",
					title: errorMsg || "网络超时",
					desc: "网络不稳定，让我在努力一下"
				};
		}
	};
	const result = config();
	return (
		<div>
			这是出错页面:{result.title}
		</div>
	);
}

PageError.propTypes = {
	errorType: PropTypes.number,
	errorMsg: PropTypes.string
};

export default PageError;

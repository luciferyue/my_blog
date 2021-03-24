
const path = require("path");
// const { APP_ENV } = require("../define");

module.exports = {
	test: /\.(jpg|png|svg|gif|eot|ttf|woff)$/,
	include: [path.resolve(__dirname, "../../src")],
	use: [
		{
			loader: "url-loader",
			options: {
				limit: 4096,
				esModule: false
			}
		}
	]
};

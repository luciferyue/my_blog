const path = require("path");
module.exports = {
	test: /\.([jt])s(x)?$/,
	include: [path.resolve(__dirname, "../../src")],
	use: {
		loader: "babel-loader",
		options: {
			cacheDirectory: true,
		},
	},
};

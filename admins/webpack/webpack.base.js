const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DEFINE_VALUES } = require("./define");

const config = {
	stats: {
		modules: false,
		performance: false,
		timings: true,
		children: false,
		warnings: false,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "",
			template: "./static/index.html.ejs",
		}),
		new webpack.DefinePlugin({
			...DEFINE_VALUES,
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV !== "local" ? "production" : process.env.NODE_ENV),
			},
		}),
	],
	resolve: {
		alias: {
			"@src": path.join(__dirname, "..", "src"),
			"@components": path.join(__dirname, "..", "src/components"),
			"@base": path.join(__dirname, "..", "src/components/base"),
			"@common": path.join(__dirname, "..", "src/components/common"),
			"@hooks": path.join(__dirname, "..", "src/hooks/index.js"),
			"@types": path.join(__dirname, "..", "src/types.js"),
			"@pages": path.join(__dirname, "..", "src/pages"),
			"@utils": path.join(__dirname, "..", "src/utils"),
		},
	},
};
module.exports = config;

const path = require("path");
// const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const { DEFINE_VALUES } = require("./define");
const ESLintPlugin = require("eslint-webpack-plugin");
console.log(DEFINE_VALUES.APP_URL);
const config = new webpackMerge(baseConfig, {
	mode: "development",
	devtool: "inline-source-map",
	stats: "errors-only",
	target: "web",
	entry: {
		app: ["./src/index.js"],
	},
	output: {
		path: path.join(__dirname, "..", "dist", process.env.NODE_ENV),
		publicPath: DEFINE_VALUES.APP_URL,
	},
	module: require("./loaders"),
	plugins: [
		new ESLintPlugin({
			extensions: ["js", "jsx"]
		}),
		// new webpack.NamedModulesPlugin()
	],
	resolve: {
		alias: {
			"react-dom": "@hot-loader/react-dom",
		},
	},
});

module.exports = config;

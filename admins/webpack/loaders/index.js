const cssLoader = require("./css-loader");
const babelLoader = require("./babel-loader");
const urlLoader = require("./url-loader");

module.exports = {
	rules: [
		babelLoader,
		cssLoader,
		urlLoader
	],
};

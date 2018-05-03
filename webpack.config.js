require('babel-register');
require("babel-polyfill");
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const path = require("path");

module.exports = {
	mode: 'production',
	entry: ['babel-polyfill', __dirname +"/server_clients/static/assets/App.js"],
	output: {
		path:  path.join(__dirname, "server_clients/static/js"),
		filename: "app.min.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [
					path.join(__dirname, "server_clients/static/assets"),
					path.join(__dirname, "configs"),
				],
				use: [
					'babel-loader',
					{
						loader: "babel-loader",
						options: {
							presets: ["es2015", "stage-0", "react"]
						}
					}
				]
			}
		]
	},
	plugins: [
		new MinifyPlugin(),
	],
	devServer: {
		port : 5001,
		host : 'localhost',
		contentBase :  path.join(__dirname, "server_clients/static/js"),
	}

};

require('babel-register');
require("babel-polyfill");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const path = require("path");

module.exports = {
	mode: 'production',
	// mode: 'development',
	entry: {
		app : ['babel-polyfill', __dirname +"/server_clients/static/assets/App.js"],
		style : [ __dirname +"/server_clients/static/assets/css/custom.scss"]
	},
	output: {
		path:  path.join(__dirname, "server_clients/static/js"),
		filename: "[name].min.js"
	},
	externals: [
		{
			"window": "window",
			"document" : "document",
			"location" : "location",
			"XMLHttpRequest" : "XMLHttpRequest",
		}
	],
	module: {
		rules: [
			{
				test: /\.(ttf|eot|svg|woff|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				include: [
					path.join(__dirname, "server_clients/static/assets/fonts"),
					path.join(__dirname, "server_clients/static/assets/images")
				],
				options: {
					name: 'files/[name].[ext]',
					publicPath : '/static/js/'
				},
				loader: 'file-loader'
			},
			{
				test: /\.scss$/,
				include: [
					path.join(__dirname, "server_clients/static/assets")
				],
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}, {
					loader: "sass-loader" // compiles Sass to CSS
				}]
			},
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
		new ExtractTextPlugin({
			filename: '[name].css'
		})
	],
	devServer: {
		port : 5001,
		host : 'localhost',
		contentBase :  path.join(__dirname, "server_clients/static/js"),
	}

};

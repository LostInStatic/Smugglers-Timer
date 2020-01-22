const merge = require('webpack-merge')
const common = require('./webpack.common.js');
const path = require('path');
const browsersync = require('browser-sync-webpack-plugin');

const outputPath = path.resolve(__dirname, 'dist')

module.exports = merge(common, {
/* 	watch: true, */
	mode: 'development',
	devtool: 'inline-source-map',
	plugins: [
		new browsersync(
			{
				host: 'localhost',
				port: '3000',
				proxy: 'http://localhost:8080/'
			},
			{
				reload: false
			}
		)
	]
}
)
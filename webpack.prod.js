const merge = require('webpack-merge')
const common = require('./webpack.common.js');

const miniCss = require('optimize-css-assets-webpack-plugin')
const miniJs = require('terser-webpack-plugin')


module.exports = merge(common,{
	mode: 'production',
	optimization: {
		minimizer:[new miniJs({}), new miniCss({})]
	},
	plugins:[]
}
)

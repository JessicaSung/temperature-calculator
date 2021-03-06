var path = require('path');


module.exports = {
	entry: path.resolve(__dirname, 'src/Calculator.js'),
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: "babel-loader",
			query: {
				presets: ["es2015", "react"]
			}
		}]
	}
}
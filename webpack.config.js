
module.exports = {
	entry: './_js/script.js',
	output: {
		filename: './js/script.js'
	},
  	module: {
    	loaders: [
			{ test: /\.js$/, loader: 'babel' }
		]
	} 
};
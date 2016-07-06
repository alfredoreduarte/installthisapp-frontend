var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

const isDeveloping = process.env.NODE_ENV !== 'production';

// Hot Module Reloading
if (isDeveloping) {
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
	app.use(require('webpack-hot-middleware')(compiler));
}
else{
	app.use('/static',  express.static(__dirname + '/dist'));
}

// Images and other static asssets
app.use('/images',  express.static(__dirname + '/assets/images'));

// Mock Rails Api
app.use('/apps/create', function(req, res){
	console.log(req)
	res.json(require('./data/apps.create'))
})
app.use('/admindata', function(req, res){
	res.json(require('./data/admindata'))
})

// Serving static HTML
app.get('/*', function(req, res){
	res.sendFile(path.join(__dirname, 'index.html'))
})

// Running the server
app.listen(4000, 'localhost', function(err){
	if (err) {
		console.log(err)
		return;
	}
	console.log('Listening at http://localhost:4000')
})
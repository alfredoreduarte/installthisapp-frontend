var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config.dev')

const app = express()
const compiler = webpack(config)

const isDeveloping = process.env.NODE_ENV !== 'production'

// Hot Module Reloading
if (isDeveloping) {
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
	app.use(require('webpack-hot-middleware')(compiler))
}
else{
	app.use('/static',  express.static(__dirname + '/dist'))
}

// Images and other static asssets
app.use('/images',  express.static(__dirname + '/assets/images'))
app.use('/styles',  express.static(__dirname + '/assets/styles'))

// Mock Rails Api
app.get('/admin', function(req, res){
	res.json(require('./data/admin'))
})
app.get('/entities', function(req, res){
	res.json(require('./data/entities'))
})
app.post('/apps/create', function(req, res){
	res.json(require('./data/apps.create'))
})
app.get('/apps/styles/:checksum', function(req, res){
	res.sendFile(path.join(__dirname, 'assets/styles/module.css'))
})

// Serving static HTML
app.get('/*', function(req, res){
	res.sendFile(path.join(__dirname, 'index.html'))
})

// Running the server
app.listen(process.env.PORT || 4000, 'localhost', function(err){
	if (err) {
		console.log(err)
		return;
	}
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})
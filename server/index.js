var express = require('express');
var path = require('path');

// webpack
var config = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();

// Use webpack in dev mode
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publickPath: config.output.publickPath}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));
app.use(express.static('./data'));

app.use('/', function(req, res) {
	res.sendFile(path.resolve('./client/index.html'));
});

// Listen
var port = 3000;
app.listen(port, function(err) {
	if(err) {
		throw err;
	}
	console.log('Server is listening on port %s', port);
})
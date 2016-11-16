var express = require('express');
var path = require('path');

var app = express();

// webpack
var config = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

// Use webpack in dev mode
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publickPath: config.output.publickPath}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));

app.get('/', function(req, res) {
	res.sendFile(path.resolve('./client/index.html'));
});


//	Webpack dev
/* -------------------------------------------------- */
//	Service


var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ProductsDAO = require('./products').ProductsDAO;

// DB Connect
MongoClient.connect('mongodb://localhost:27017/hp', function(err, db) {
	assert.equal(null, err);
	console.log("Successfully connected to MongoDB.");

	var products = new ProductsDAO(db);

	app.post('/data/list/:sel?/:page?/:limit?', function(req, res) {
		var sel = req.params.sel;
		var page = req.params.page || 1;
		var limit = req.params.limit;

		if(sel === 'all' || sel === undefined) {
			products.getAll({page: page, limit: limit}, function(data) {
				assert.notEqual(null, data);

				res.send(JSON.stringify(data));
			});
		} else {
			products.getByType(sel, {page: page, limit: limit}, function(data) {
				assert.notEqual(null, data);

				res.send(JSON.stringify(data));
			});
		}
	});

	app.post('/data/product/:num', function(req, res) {
		products.getOne(req.params.num, function(data) {
			assert.notEqual(null, data);
			res.send(JSON.stringify(data));
		});
	});
});

// Listen
var port = 3000;
app.listen(port, function(err) {
	if(err) {
		throw err;
	}
	console.log('Server is listening on port %s', port);
})
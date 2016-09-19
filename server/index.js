var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('./dist'));

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
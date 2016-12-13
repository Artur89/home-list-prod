var fs = require('fs');

var json = {};

fs.readFile("./data/listData.json", "utf-8", function (err, data) {
	if (err) throw err;
	json = JSON.parse(data);
	generateFiles(json);
});

function generateFiles(data) {
	for (var i = json.d.length - 1; i >= 0; i--) {
		fs.writeFile('./data/products/'+json.d[i].Number+'.json', JSON.stringify(json.d[i]), function (err) {
			if (err) return console.log(err);
		});
	};
}
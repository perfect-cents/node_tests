const commandLineArgs = require('command-line-args');

const options = commandLineArgs([
	{ name: 'serverPort', alias: 'p', type: Number, defaultOption: 8080 },
	{ name: 'query', alias: 'q', type: String}
]);

if (options.query == null) {
	console.error('you must have a query');
	process.exit();
}

var pg = require('pg');

const client = new pg.Client({
	user: 'bradenp',
	database: 'mydb',
	//password: '????????',
	host: 'localhost',
	port: 5432,
});

client.connect(() => {
	client.query(options.query, (err, result) => {
		if (err) { throw err; }
		console.log(result.rows);
	});
});


var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/' + 'index.html');
});

app.listen(options.port);


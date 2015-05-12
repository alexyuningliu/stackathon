var chalk = require('chalk');
var express = require('express');
var app = express();
// Requires in ./db/index.js -- which returns a promise that represents
// mongoose establishing a connection to a MongoDB database.
var startDb = require('./db');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index.html');
});


var startServer = function () {
	app.listen(app.get('port'), function() {
	  console.log(chalk.blue('Node app is running on port'), chalk.blue(app.get('port')));
	});
};

startDb.then(startServer).catch(function (err) {
    console.error('Initialization error:', chalk.red(err.message));
    console.error('Process terminating . . .');
    process.kill(1);
});
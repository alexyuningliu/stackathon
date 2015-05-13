var chalk = require('chalk');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
// Requires in ./db/index.js -- which returns a promise that represents
// mongoose establishing a connection to a MongoDB database.
var startDb = require('./db');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(morgan('combined'));

// Parse our POST and PUT bodies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));

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
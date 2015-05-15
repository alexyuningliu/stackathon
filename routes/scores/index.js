'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var scoreModel = mongoose.model('Score');

router.get('/high', function(req, res) {
	scoreModel.find().sort('finalTimeInMilliseconds').limit(10).exec(function (err, highScores) {
		  		if (err) return console.error(err);
		  		console.log(highScores);
		  		res.json(highScores);
	});
})

router.post('/', function(req, res) {
	var scoreObject = req.body.scoreObject;
	console.log(scoreObject);
	var score = new scoreModel(scoreObject);
	score.save(function(err, score) {
		if (err) return console.error(err);
		res.json(score);
	});
});
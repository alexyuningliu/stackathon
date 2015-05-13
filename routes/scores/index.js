'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var scoreModel = mongoose.model('Score');

router.post('/', function(req, res) {
	var scoreObject = req.body.scoreObject;
	console.log(scoreObject);
	var score = new scoreModel(scoreObject);
	score.save(function(err, score) {
		if (err) return console.error(err);
		res.json(score);
	});
});
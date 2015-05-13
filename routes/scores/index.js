'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var scoreModel = mongoose.model('Score');

router.post('/', function(req, res) {
	var scoreObject = req.body.scoreObject;
	console.log(scoreObject);
	res.json(scoreObject);
});
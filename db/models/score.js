'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    country: {
        type: String
    },
    time: {
        type: Number
    }
});

mongoose.model('Score', schema);
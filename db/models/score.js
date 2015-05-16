'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    country: {
        type: String
    },
    finalTimeInMilliseconds: {
        type: Number
    },
    createdAt: {
        type: Date 
    }
});

mongoose.model('Score', schema);
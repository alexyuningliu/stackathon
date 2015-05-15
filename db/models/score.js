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
    finalTimeInMilliseconds: {
        type: Number
    },
    createdAt: {
        type: Date 
    }
});

mongoose.model('Score', schema);
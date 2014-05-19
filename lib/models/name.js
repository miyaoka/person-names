'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NameSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  kana: String,
  lang: {
    type: String,
    enum: 'en de fr it es sv fi ru cs ja'.split(' ')
  },
  nametype: {
    type: String,
    enum: 'family male female'.split(' ')
  },
  random: Number
});

mongoose.model('Name', NameSchema);

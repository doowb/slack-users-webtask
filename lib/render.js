'use strict';

var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var helpers = require('./helpers');

module.exports = function render(data) {
  var template = fs.readFileSync(path.join(__dirname, '../templates/badge.hbs'), 'utf8');
  Handlebars.registerHelper(helpers);
  return Handlebars.compile(template)(data);
};

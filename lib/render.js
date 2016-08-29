'use strict';

var fs = require('fs');
var Handlebars = require('handlebars');
var helpers = require('./helpers');

module.exports = function render(data) {
  var template = fs.readFileSync('../templates/badge.hbs', 'utf8');
  Handlebars.registerHelper(helpers);
  return Handlebars.compile(template)(data);
};

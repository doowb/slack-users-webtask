'use strict';

var fs = require('fs');
var slackUsers = require('slack-users');
var Handlebars = require('handlebars');
var helpers = require('./lib/helpers');

module.exports = function (ctx, req, res) {
  var cb = done(res);
  var template = fs.readFileSync('./templates/badge.hbs', 'utf8');
  Handlebars.registerHelper(helpers);

  var team = ctx.data.SLACK_TEAM;
  var token = ctx.data.SLACK_TOKEN;

  if (!team) {
    return cb(new Error('Invalid SLACK_TEAM property.'));
  }

  if (!token) {
    return cb(new Error('Invalid SLACK_TOKEN property.'));
  }

  var options = {
    team: team,
    token: token
  };

  slackUsers(options, function(err, users) {
    if (err) return cb(err);
    users = users.filter(function(user) {
      return user.id != 'USLACKBOT' && !user.is_bot && !user.deleted;
    });
    var active = users.filter(function(user) {
      return user.presence === 'active';
    });

    var data = {
      total: users.length,
      active: active.length,
      title: 'slack',
      color: '#E01563',
      pad: 10,
      sep: 6
    };
    data.value = data.active + '/' + data.total;
    data.lw = data.pad + width(data.title) + data.sep;
    data.rw = data.sep + width(data.value) + data.pad;
    data.tw = data.lw + data.rw;

    var fn = Handlebars.compile(template);
    cb(null, fn(data));
  });
};

function width(str) {
  return 7 * str.length;
}

function done(res) {
  return function(err, content) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ok: false, error: err.message}));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    res.end(content);
  }
}

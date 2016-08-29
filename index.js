'use strict';

var users = require('slack-users');

module.exports = function (ctx, cb) {
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

  users(options, cb);
};

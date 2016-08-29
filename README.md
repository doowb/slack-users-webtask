# slack-users-wt [![NPM version](https://img.shields.io/npm/v/slack-users-wt.svg?style=flat)](https://www.npmjs.com/package/slack-users-wt) [![NPM downloads](https://img.shields.io/npm/dm/slack-users-wt.svg?style=flat)](https://npmjs.org/package/slack-users-wt) [![Build Status](https://img.shields.io/travis/doowb/slack-users-wt.svg?style=flat)](https://travis-ci.org/doowb/slack-users-wt)

Webtask.io service for a slack badge showing the current and total users of a slack team.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save slack-users-wt
```

## Usage

```js
var users = require('slack-users-wt');
module.exports = function(ctx, req, res) {
  // do any customization for your implementation here
  users(ctx, req, res);
};
```

## What is this?

This module is intended to be used in a [webtask.io](https://webtask.io/) task to create an svg badge showing the current online users for a slack community.

There is a distribution file provided in [dist/main.js](dist/main.js) if you want to deploy it to webtask.io directly using the following command:

```bash
$ wt create node_modules/slack-users-wt/dist/main.js --name my-slack-users-name --secret SLACK_TEAM='my-slack-team' --secret SLACK_TOKEN='XXXXXXX'
```

The main requirement is to provide the `SLACK_TEAM` and `SLACK_TOKEN` values. The above example shows setting them as secrets so they'll be available on the `ctx` when the webtask is executed.

The `SLACK_TEAM` property is the same as the subdomain used when accessing slack... `https://{slack-team}.slack.com`.
The `SLACK_TOKEN` property is the authentication token of an administrator for the specified slack team that can users people to slack.

## Webtask usage

After the webtask has been created, it can be used by doing a `GET` request from the webtask url.

```bash
$ curl https://webtask.it.auth0.com/api/run/wt-{my-profile}-0/my-slack-users-name?webtask_no_cache=1
```

An svg image will be returned with the current and total users for the specified slack community.

## Acknowledgments

The slack badge template is based and size calculations are based on the badge provided in the [slackin](https://github.com/rauchg/slackin) project.

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](contributing.md) for avice on opening issues, pull requests, and coding standards.

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](http://twitter.com/doowb)

### License

Copyright © 2016, [Brian Woodward](https://github.com/doowb).
Released under the [MIT license](https://github.com/doowb/slack-users-wt/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.1.30, on August 29, 2016._
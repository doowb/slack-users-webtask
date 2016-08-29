'use strict';

require('mocha');
var assert = require('assert');
var webtask = require('./');
var render = require('./lib/render');

function width(str) {
  return 7 * str.length;
}

describe('slack-users-webtask', function() {
  it('should export a function', function() {
    assert.equal(typeof webtask, 'function');
  });

  it('should render an svg', function() {
    var expected = [
      '<svg xmlns="http://www.w3.org/2000/svg" width="109" height="16">',
      '  <rect rx="3" width="109" height="16" fill="#555" />',
      '  <rect rx="3" x="51" width="58" height="16" fill="#E01563" />',
      '  <path d="M51 0h6v16h-6z" fill="#E01563" />',
      '  <g text-anchor="middle" font-family="Verdana" font-size="11">',
      '    <text fill="#010101" fill-opacity=".3" x="26" y="12">slack</text>',
      '    <text fill="#fff" x="26" y="11">slack</text>',
      '    <text fill="#010101" fill-opacity=".3" x="77" y="12">42/100</text>',
      '    <text fill="#fff" x="77" y="11">42/100</text>',
      '  </g>',
      '</svg>',
      ''
    ].join('\n');
    var data = {
      total: 100,
      active: 42,
      title: 'slack',
      color: '#E01563',
      pad: 10,
      sep: 6
    };
    data.value = data.active + '/' + data.total;
    data.lw = data.pad + width(data.title) + data.sep;
    data.rw = data.sep + width(data.value) + data.pad;
    data.tw = data.lw + data.rw;

    var content = render(data);
    assert.equal(content, expected);
  });
});

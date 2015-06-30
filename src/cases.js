"use strict";

var _ = require('lodash'),
  sprintf = require('sprintf');

require('jasmine-custom-message');

global = new Function('return this')(); // jshint ignore:line

if (!jasmineAvailable()) {
  throw new Error('jasmine/it is not defined');
}

if (isCommonJs()) {
  module.exports = wrapCases;
}
global.cases = wrapCases;

var oldSince = global.since;

function newSince(message) {
  return oldSince(
    function () {
      return /<[^>]*>/.test(message) ? sprintf("%s [expected: %s/actual: %s]", message, this.actual, this.expected) : message;
    });
}

global.since = newSince;
global.Then = newSince;
global.And = newSince;
global.But = newSince;

  function wrapCases(specGroupName, examples) {

  return new Cases(examples);

  function Cases(data) {
    this.examples = data;
    this.it = function (specFunc) {
      _.each(this.examples, function (row, index, rows) {
        global.it(sprintf('%s [%d/%d/%s]', specGroupName, index + 1, rows.length, JSON.stringify(row)), _.partial(specFunc, row));
      });
    };
  }
}

function isCommonJs() {
  return isDefined(module) && module.exports;
}

function jasmineAvailable() {
  return isDefined(global.jasmine) && isDefined(global.it);
}

function isDefined(ref) {
  return !_.isUndefined(ref);
}
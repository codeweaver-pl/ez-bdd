"use strict";

var _  = require('underscore'),
    $s = require('./selectors');

global = new Function('return this')(); // jshint ignore:line

module.exports.featureAsSpec = require('./gherkin2jasmine');
module.exports.parseGherkin  = require('./gherkin-model').parse;

if (global.browser) {

  require('./cases');

  module.exports.allHailThePopupOfDoom = allHailThePopupOfDoom;
  module.exports.currentUrl            = currentUrl;
  module.exports.goTo                  = goTo;
  module.exports.ui                    = ui;
}

function goTo(url) {
  browser.driver.get(browser.baseUrl + url);
  allHailThePopupOfDoom();
  browser.waitForAngular();
}

function allHailThePopupOfDoom() {

  var popupOfDoom = browser.switchTo().alert();

  if (popupOfDoom) {
    popupOfDoom.accept();
  }
}

function ui(def) {

  function UI(uri) {
    goTo(uri);
  }

  UI.prototype = Object.create(
    _.pick(def, _.isFunction),
    _.reduce(
      _.mapObject(_.omit(def, _.isFunction), asGetSetProps),
      _.extend,
      {}));

  return UI;

  function asGetSetProps(fieldDefs, fieldType) {
    return _.mapObject(fieldDefs, function (ngModelKey) {
      return $s[fieldType](ngModelKey);
    });
  }
}

function currentUrl() {
  return browser.driver.getCurrentUrl().then(function (url) {
    return url.slice(browser.baseUrl.length);
  });
}
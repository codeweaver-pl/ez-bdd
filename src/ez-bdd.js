"use strict";

var _ = require('lodash'),
  $s = require('./selectors'),
  featureAsSpec = require('./gherkin2jasmine'),
  gm = require('./gherkin-model');

global = new Function('return this')(); // jshint ignore:line

if (global.browser) {
  require('./cases');
  browser.getProcessedConfig().then(onProcessedConfig);
} else {
  module.exports = {
    featureAsSpec: featureAsSpec,
    parseGherkin: gm.parse
  };
}

function onProcessedConfig(processedConfig) {

  module.exports = {
    allHailThePopupOfDoom: allHailThePopupOfDoom,
    currentUrl: currentUrl,
    goTo: goTo,
    ui: ui,
    featureAsSpec: featureAsSpec,
    parseGherkin: gm.parse
  };

  function currentUrl() {
    return browser.driver.getCurrentUrl().then(function (url) {
      return url.slice(baseUrl().length);
    });
  }

  function goTo(url) {
    browser.driver.get(baseUrl() + url);
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

  function baseUrl() {
    return _.isString(processedConfig.baseUrl) ? processedConfig.baseUrl : '';
  }
}
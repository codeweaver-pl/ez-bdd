'use strict';

module.exports = {
  checkbox: checkbox,
  textInput: textInput,
  radio: radio,
  radioGroup: radioGroup,
  combobox: combobox
};

function checkbox(modelName) {
  return {
    get: function () {
      return element($(input('checkbox', modelName))).isSelected();
    },
    set: function (value) {
      element(
        $('input[type=checkbox][ng-model="' + modelName + '"]' + (value ? ':not(:checked)' : ':checked'))
      ).click();
    }
  };
}

function textInput(modelName) {
  return {
    get: function () {
      return element(by.model(modelName)).getAttribute('value');
    },
    set: function (value) {
      element(by.model(modelName)).sendKeys(value);
    }
  };
}

function radio(modelName) {
  return {
    get: function () {
      return element($('input[type=radio][ng-model="' + modelName + '"]:checked'));
    },
    set: function (value) {
      element(by.cssContainingText(input('radio', modelName) + '+*', value)).click();
    }
  };
}

function radioGroup(modelName) {
  return {
    get: function () {
      return element.all(by.css('input[type=radio][ng-model="' + modelName + '"]'));
    },
    set: function (index) {
      element.all(by.css('input[type=radio][ng-model="' + modelName + '"]')).get(index).click();
    }
  };
}

function combobox(modelName) {
  return {
    get: function () {
      return element(by.model(modelName)).$('option:checked').getText();
    },
    set: function (value) {
      element(by.model(modelName)).element(by.cssContainingText('option', value)).click();
    }
  };
}

var sprintf = require('sprintf');

function input(type, ngModel) {
  return sprintf('input[type=%s][ng-model="%s"]', type, ngModel);
}

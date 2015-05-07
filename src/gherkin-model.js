'use strict';

var _ = require('underscore'),
  Lexer = require('gherkin').Lexer('en'),
  log = new require('npmlog');

function GherkinModel() {

  this.Feature = Feature;
  this.Background = Background;
  this.Scenario = Scenario;
  this.ScenarioOutline = ScenarioOutline;

  function Feature(name, description) {
    this.name = name;
    this.description = description;
    this.background = undefined;
    this.scenarios = [];
    this.scenario = function (scenario) {
      this.scenarios.push(scenario);
    };
  }

  function Background() {
    this.steps = [];
    this.step = function (step, value) {
      this.steps.push({step: step, value: value});
    };
  }

  function Scenario(name) {
    this.name = name;
    this.steps = [];
    this.step = function (step, value) {
      this.steps.push({step: step, value: value, type: stepType(this.steps)});
      function stepType(steps) {
        return hasStepType(steps, 'Then ') ? 'Then' : hasStepType(steps, 'When ') ? 'When' : 'Given';
        function hasStepType(steps, stepType) {
          return _.some(steps, function (step) {
            return step.step === stepType;
          });
        }
      }
    };
  }

  function ScenarioOutline(name) {
    this.base = Scenario;
    this.base(name);
    this.examples = [];
    this.exampleDef = null;
    this.example = function (example) {
      if (_.isNull(this.exampleDef)) {
        this.exampleDef = example;
      } else {
        this.examples.push(_.object(_.zip(this.exampleDef, example)));
      }
    };
  }

  ScenarioOutline.prototype = Object.create(Scenario.prototype);
}

function parse(feature) {

  var spec = null,
    background = null,
    scenario = null,
    gm = new GherkinModel();

  new Lexer({
    feature: onFeature,
    background: onBackground,
    scenario: onScenario,
    scenario_outline: onScenario,
    step: onStep,
    row: onRow,
    eof: onEof,
    examples: _.noop,
    comment: _.noop,
    tag: _.noop,
    doc_string: _.noop
  }).scan(feature);

  return spec;

  function onFeature(keyword, name, description) {
    log.info("gherkin-model", "new %s", keyword);
    spec = new gm.Feature(name, description);
  }

  function onBackground() {
    background = new gm.Background();
  }

  function onScenario(keyword, name) {
    if (scenario) {
      spec.scenario(scenario);
    }
    scenario = 'Scenario' === keyword ? new gm.Scenario(name) : new gm.ScenarioOutline(name);
  }

  function onStep(keyword, name) {
    if (scenario) {
      scenario.step(keyword, name);
    } else {
      background.step(keyword, name);
    }
  }

  function onRow(row) {
    scenario.example(row);
  }

  function onEof() {
    if (scenario) {
      spec.scenario(scenario);
    }
    if (background) {
      spec.background = background;
    }
  }
}

module.exports = {
  parse: parse
};

'use strict';

var _ = require('lodash'),
  log = require('npmlog');

log.heading = '[g2j]';

function toJasmine(spec) {

  return "'use strict';" + "\n" +
    toDescribe(spec);

  function toDescribe(spec) {
    return "describe('" + spec.name + "', " +
      toFunctionWrapped("\n" +
        (spec.description ? toBlockComment(spec.description)  + "\n\n" : '') +
        (spec.background ? toBeforeEach(spec.background) + "\n\n" : '') +
        toIts(spec.scenarios)
      ) + ");";

    function toStepComment(step) {

      function toSince(step) {
        return step.step.toLowerCase() + "('" + step.value + "').expect(undefined).toBe(undefined);";
      }

      if (_.contains(['Given ', 'When '], step.step)) {
        return "\n" + toComment(step.step) + '\n' + toComment(step.value);
      } else if ('Then ' === step.step) {
        return "\n" + toComment(step.step) + '\n' + toSince(step);
      } else if ('Then' === step.type) {
        return toSince(step);
      } else {
        return toComment(step.step + step.value);
      }
    }

    function toBlockComment(comment) {
      return "/*\n" +
        comment + "\n" +
        "*/";
    }

    function toComment(comment) {
      return "//" + comment;
    }

    function toFunctionWrapped(body, params) {

      var content,
        argString;

      if (_.isString(body)) {
        content = body;
      } else {
        content = _.reduce(body, function (memo, line) {
          return memo + line;
        }, "");
      }

      argString = _.isArray(params) ? params.join(',') : _.isString(params) ? params : '';

      return "function(" + argString + ") {\n" +
        content + "\n" +
        "}";
    }

    function toBeforeEach(background) {
      return "beforeEach(" + toFunctionWrapped(toSteps(background.steps)) + ");";
    }

    function toIts(scenarios) {
      return _.reduce(_.map(scenarios, toIt), function (memo, it) {
        return memo + "\n\n" + it;
      });

      function toIt(scenario) {

        function toScenario(scenario) {
          return "it('" + scenario.name + "'," + toFunctionWrapped(
              toSteps(scenario.steps)
            ) + ");";
        }

        function toScenarioOutline(scenario) {

          function toExamples(scenario) {
            return "[\n" + _.map(scenario.examples, JSON.stringify).join(',\n') + "\n]";
          }

          return "cases('" + scenario.name + "', " +
            toExamples(scenario) +
            ").it(" + toFunctionWrapped(
              toSteps(scenario.steps), 'example'
            ) +
            ");";
        }

        return scenario.examples ? toScenarioOutline(scenario) : toScenario(scenario);
      }
    }

    function toSteps(steps) {
      return _.map(steps, function (step) {
        return toStepComment(step);
      }).join('\n');
    }

  }
}

module.exports = toJasmine;


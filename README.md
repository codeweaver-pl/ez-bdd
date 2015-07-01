ez-bdd
====

[![Join the chat at https://gitter.im/waxxfetish/ez-bdd](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/waxxfetish/ez-bdd?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

BDD Toolkit

[![Dependency Status](https://www.versioneye.com/user/projects/555f0577634daa5dc8001055/badge.svg?style=flat)](https://www.versioneye.com/user/projects/555f0577634daa5dc8001055)
[![Build Status](https://travis-ci.org/waxxfetish/ez-bdd.svg?branch=master)](https://travis-ci.org/waxxfetish/ez-bdd)

Installation
----

Install in project dependencies

    npm install --save ez-bdd

Or if you want to use the module from CLI:

    #install globally
    npm install -g ez-bdd

## Getting Started

It's assumed that some parts of a system that you're working on are
[specified by example](https://en.wikipedia.org/wiki/Specification_by_example).
Even better, you're given a bunch of [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin)
source files describing all features under different scenarios. Now you want to
write some automated tests.

You can start by transforming your Gherkin source files (like the one below)

```gherkin
# eating_cucubmers.feature
Feature: Eating cucumbers

  Scenario Outline: Eat
    Given there are <start> cucumbers
    When I eat <eat> cucumbers
    Then I should have <left> cucumbers

  Examples:
    | start | eat | left |
    | 12    | 5   | 7    |
    | 20    | 5   | 15   |
```

with the ez-bdd's command-line interface

```shell
$ ez-bdd eating_cucumbers.feature
```

into Jasmine specification

```javascript
// eating_cucumbers.spec.js
'use strict';
describe('Eating cucumbers', function() {

  cases('Eat', [{
      "start": "12",
      "eat": "5",
      "left": "7"
    }, {
      "start": "20",
      "eat": "5",
      "left": "15"
    }])
    .it(function(example) {

      //Given
      //there are <start> cucumbers

      //When
      //I eat <eat> cucumbers

      //Then
      then('I should have <left> cucumbers')
        .expect(undefined)
        .toBe(undefined);
    });
});
```

Usage
====

```javascript
    //node environment
    var ezBdd = require('ez-bdd'),
        feature = ezBdd.parseGherkin(featureString),
        specString = ezBdd.featureAsSpec(feature);
```

```javascript
    //test runner environment
    var ezBdd = require('ez-bdd'),
       ezBdd.allHailThePopupOfDoom() //
           ezBdd.currentUrl()//
           ezBdd.goTo() //
           ezBdd.ui() //
```

```shell
    echo "generate jasmine spec template"
    echo "path-to-jasmine-spec is optional"
    ezbdd path-to-gherkin.feature path-to-jasmine-spec.spec.js  
```

LICENSE
===

`ez-bdd` is available under the following licenses:

  * MIT

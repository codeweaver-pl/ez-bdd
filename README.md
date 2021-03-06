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
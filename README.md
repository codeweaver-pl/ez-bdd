ez-bdd
====

BDD Toolkit 

[![Dependency Status](https://www.versioneye.com/user/projects/555f0577634daa5dc8001055/badge.svg?style=flat)](https://www.versioneye.com/user/projects/555f0577634daa5dc8001055)

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
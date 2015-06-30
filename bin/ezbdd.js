#!/usr/bin/env node
"use strict";
var app = require('ez-bdd'),
  fs = require('fs'),
  _ = require('lodash'),
  log = require('npmlog'),
  jsb = require('js-beautify').js_beautify,
  args = process.argv.slice(2),
  inFile = null,
  outFile = null,
  inPattern = /(.*)\.feature$/,
  jsbOpts = {
    "indent_size": 2,
    "indent_char": " ",
    "break_chained_methods": true
  },
  encoding = {encoding: 'utf8'};

log.heading = '[ez-bdd]';

if (_.isEmpty(args)) {
  log.error('args missing');
} else {
  inFile = args[0];
  if (1 === args.length) {
    outFile = (inPattern.test(inFile) ? inPattern.exec(inFile)[1] : inFile) + '.spec.js';
  } else {
    outFile = args[1];
  }

  log.info('in: ', inFile);
  log.info('out: ', outFile);

  var featureModel = app.parseGherkin(
    fs.readFileSync(inFile, encoding)
  );

  var specString = app.featureAsSpec(featureModel);

  fs.writeFileSync(
    outFile,
    jsb(specString, jsbOpts),
    encoding
  );
}


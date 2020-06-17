#!/usr/bin/env node

const pump = require('pump');
const split = require('split2');
const through = require('through2');

const pretty = require('./pretty')();

const prettyTransport = through.obj((chunk, enc, done) => {
  process.stdout.write(pretty(chunk.toString()));
  done();
});

pump(process.stdin, split(), prettyTransport);

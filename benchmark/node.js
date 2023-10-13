/* eslint-disable @typescript-eslint/no-var-requires */
const Benchmark = require('benchmark');
const underscore = require('underscore');
const lodash = require('lodash');
const ut2 = require('..');
const fastest = require('./fastest');

fastest({ Benchmark, ut2, underscore, lodash });

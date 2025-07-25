/* eslint-disable @typescript-eslint/no-require-imports */
const Benchmark = require('benchmark');
const underscore = require('underscore');
const lodash = require('lodash');
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');
const ut2 = require('..');
const fastest = require('./fastest');

function writeToFile(file, data, options) {
  const { dir } = path.parse(file);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(file, data, options);
}

let allMethod = [];
fastest.config.forEach(function (item) {
  allMethod = allMethod.concat(item.list);
});

const result = fastest({
  Benchmark,
  ut2,
  underscore,
  lodash,

  methods: allMethod.map((item) => item.method)
  // methods: ['max', 'min']
});
const datetime = dayjs().format('YYYYMMDD_HHmmss');
const filepath = path.join(__dirname, `logs/${datetime}.json`);
writeToFile(filepath, JSON.stringify(result));

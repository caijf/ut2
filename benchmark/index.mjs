import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist';
import chalk from 'chalk';
import Table from 'cli-table';
import underscore from 'underscore';
import _ from 'lodash';
import ut2 from 'ut2';
import Benchmark from 'benchmark';
import runTest from './shared/runTest.mjs';
import { testCases, libConfig } from './shared/testCases.mjs';

const _filename = typeof __filename !== 'undefined' ? __filename : import.meta.url;
const _dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(_filename));

// preparation code
function Foo() {
  this.a = 1;
  this[Symbol.for('b')] = 2;
}
Foo.prototype.c = 3;
Foo.prototype[Symbol.for('d')] = 4;

// global variables
globalThis._ = _;
globalThis.underscore = underscore;
globalThis.ut2 = ut2;
globalThis.Foo = Foo;

const asyncRunTest = async (tests) => {
  return new Promise((resolve) => {
    runTest({
      libs: {
        Benchmark,
        _
      },
      options: { maxTime: 0.5 },
      // options: { maxTime: 5 },
      // tests: [
      //   {
      //     async: false,
      //     code: 'ut2.randomInt(2, 4)',
      //     title: 'ut2 randomInt'
      //   },
      //   {
      //     async: false,
      //     code: '_.random(2, 4)',
      //     title: 'lodash random'
      //   }
      // ],
      tests,
      // onCycle: function (data) {
      //   if (data.status === 'finished') return;
      //   console.log(data);
      // },
      onComplete: function (data) {
        // console.log(data);
        resolve(data);
      }
    });
  });
};

const { version, platform, arch, argv } = process;
console.log('node:', version, ' platform:', platform, ' arch: ', arch);

/**
 * 支持命令行参数过滤
 *
 * @example
 * node index.mjs
 * node index.mjs --category Array
 * node index.mjs --method chunk
 */
const { category, method } = minimist(argv.slice(2));

console.log(`category: ${category || 'all'}, method: ${method || 'all'}`);
console.log('\n---');

const methodList = testCases
  .filter((item) => {
    if (category) {
      if (item.category === category) return true;
      return false;
    }
    return true;
  })
  .flatMap((item) => item.list)
  .filter((item) => {
    if (method) {
      if (item.method === method) return true;
      return false;
    }
    return true;
  });
const result = [];

for (const methodItem of methodList) {
  for (const caseItem of methodItem.cases) {
    console.log(chalk.white.bgBlue(`method: ${methodItem.method}, params: ${caseItem.params}`));
    const cases = libConfig
      .filter((lib) => methodItem[lib.name]?.existed !== false && caseItem[lib.name]?.existed !== false)
      .map((lib) => {
        const method = caseItem[lib.name]?.method || methodItem[lib.name]?.method || methodItem.method;
        return {
          async: false,
          title: `${lib.name} ${method}`,
          code: `${lib.alias || lib.name}.${method}(${caseItem.params})`
        };
      });

    const caseResult = await asyncRunTest(cases);

    const finalResult = caseResult.results.map((item) => ({
      ...ut2.omit(cases[item.id], 'async'),
      ...item
    }));
    const fastest = finalResult.find((item) => item.fastest).title.split(' ')[0];
    const slowest = finalResult.find((item) => item.slowest).title.split(' ')[0];

    console.log(`${chalk.green(`fastest: ${fastest}`)}, ${chalk.magenta(`slowest: ${slowest}`)}\n---`);

    const current = result.find((item) => item.method === methodItem.method);
    const res = {
      params: caseItem.params,
      fastest,
      slowest
      // result: finalResult
    };
    if (!current) {
      result.push({
        method: methodItem.method,
        cases: [res]
      });
    } else {
      current.cases.push(res);
    }
  }
}
// console.log('result: ', JSON.stringify(result));

const allCases = result.flatMap((item) => item.cases);
const fastestTotal = ut2.countBy(allCases, 'fastest');
const slowestTotal = ut2.countBy(allCases, 'slowest');
// console.log('fastest total: ', fastestTotal);
// console.log('slowest total: ', slowestTotal);

const table = new Table({
  head: ['lib', 'fastest', 'slowest'],
  colWidths: [20, 20, 20],
  rows: [
    ['ut2', fastestTotal.ut2 || 0, slowestTotal.ut2 || 0],
    ['lodash', fastestTotal.lodash || 0, slowestTotal.lodash || 0],
    ['underscore', fastestTotal.underscore || 0, slowestTotal.underscore || 0]
  ]
});

console.log(table.toString());

function writeToFile(file, data, options) {
  const { dir } = path.parse(file);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(file, data, options);
}

const date = new Date();
const datetime = date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();

const filepath = path.join(_dirname, `logs/${datetime}-${method ? method : category || 'all'}.json`);
writeToFile(
  filepath,
  JSON.stringify({
    node: version,
    platform,
    arch,
    fastestTotal,
    slowestTotal,
    result
  })
);

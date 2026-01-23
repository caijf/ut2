import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist';
import chalk from 'chalk';
import Table from 'cli-table3';
import underscore from 'underscore';
import _ from 'lodash';
import ut2 from 'ut2';
import Benchmark from 'benchmark';
import runTest from './browser/shared/runTest.mjs';
import { testCases, libConfig } from './browser/shared/testCases.mjs';

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

/**
 * 支持命令行参数过滤
 *
 * @example
 * node index.mjs
 * node index.mjs --category Array
 * node index.mjs --method chunk
 */
const { category, method } = minimist(argv.slice(2));

console.log(chalk.bold.blue('对比 ut2/lodash/underscore 性能测试'));
console.log(chalk.dim(`node: ${version}, platform: ${platform}, arch: ${arch}`));
console.log(chalk.dim(`ut2: ${ut2.VERSION}, lodash: ${_.VERSION}, underscore: ${underscore.VERSION}`));

console.log(chalk.green(`category: ${category || 'all'}, method: ${method || 'all'}`));
console.log('---');

function generateTestData(category, method) {
  return testCases
    .filter((item) => {
      if (category && category !== 'all') {
        if (item.category === category) return true;
        return false;
      }
      return true;
    })
    .flatMap((item) => item.list)
    .filter((item) => {
      if (method && method !== 'all') {
        if (item.method === method) return true;
        return false;
      }
      return true;
    });
}

async function main() {
  console.log(chalk.yellow('开始性能测试...'));

  const methodList = generateTestData(category, method);
  const results = [];

  for (const methodItem of methodList) {
    for (const caseItem of methodItem.cases) {
      console.log(chalk.blue(`正在测试: ${methodItem.method}, params: ${caseItem.params}`));
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

      console.log(chalk.green(`fastest: ${fastest}`));
      console.log(chalk.red(`slowest: ${slowest}`));
      console.log('');

      const current = results.find((item) => item.method === methodItem.method);
      const res = {
        params: caseItem.params,
        fastest,
        slowest,
        result: finalResult.map((item) => ut2.pick(item, ['title', 'rme', 'hz', 'samples', 'percent']))
      };
      if (!current) {
        results.push({
          method: methodItem.method,
          cases: [res]
        });
      } else {
        current.cases.push(res);
      }
    }
  }
  // console.log('results: ', JSON.stringify(results));

  const allCases = results.flatMap((item) => item.cases);
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
  console.log('---\n' + chalk.bold.green('测试结果:'));
  console.log(table.toString());

  function writeToFile(file, data, options) {
    const { dir } = path.parse(file);
    fs.mkdirpSync(dir);
    fs.writeFileSync(file, data, options);
  }

  const date = new Date();
  const datetime = date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();

  const resultFile = path.join(_dirname, `logs/${datetime}-${method ? method : category || 'all'}.json`);
  writeToFile(
    resultFile,
    JSON.stringify(
      {
        env: {
          node: version,
          platform,
          arch,
          ut2: ut2.VERSION,
          lodash: _.VERSION,
          underscore: underscore.VERSION
        },
        total: {
          fastest: fastestTotal,
          slowest: slowestTotal
        },
        results
      },
      null,
      2
    )
  );

  console.log(chalk.blue(`结果已保存到: ${resultFile}`));
  console.log('');
}

// 使用方法说明
function showUsage() {
  console.log(chalk.bold.cyan('\n使用方法:'));
  console.log('node index.mjs --category=all --method=all');
  console.log('\n参数说明:');
  console.log('--category: 指定要测试的ut2方法类别(Array|Collection|Language|Math|Number|Object|String|Util|all, 默认: all)');
  console.log('--method: 指定要测试的ut2方法名称(默认: all)，如果有指定类别，仅测试该类别下的方法');
  console.log('\n示例:');
  console.log('node index.mjs --category=Array');
  console.log('node index.mjs --method=max');
  console.log('node index.mjs --category=Array --method=max # 无测试用例，因为Array类别下没有max方法');
}

// 检查是否需要显示帮助
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showUsage();
  process.exit(0);
}

// 运行主函数
main();

/* eslint-disable no-undef */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.fastest = factory();
  }
})(this, function () {
  const config = [
    {
      method: 'toString',
      params: [[123], ['a'], [null]],

      underscore: {},
      lodash: {},
      ut2: {}
    },
    // TODO underscore 没有 toNumber 方法
    // {
    //   method: 'toNumber',
    //   params: [['a'], ['3.14'], [3]],

    //   underscore: {},
    //   lodash: {},
    //   ut2: {}
    // },
    {
      method: 'chunk',
      params: [
        [['a', 'b', 'c', 'd'], 2],
        [['a', 'b', 'c', 'd'], 3]
      ],

      underscore: {},
      lodash: {},
      ut2: {}
    }
  ];

  const result = {
    // toString: [
    //   {
    //     $case: '',
    //     $fastest: '',
    //     underscore: {
    //       case: 'toString(123)',
    //       hz: 1,
    //       sampled: 92,
    //       rme: '2.45%'
    //     },
    //     lodash: {
    //       case: 'toString(123)',
    //       hz: 1,
    //       sampled: 92,
    //       rme: '2.45%'
    //     },
    //     ut2: {
    //       case: 'toString(123)',
    //       hz: 1,
    //       sampled: 92,
    //       rme: '2.45%'
    //     },
    //   }
    // ]
  };

  return function fastest({ Benchmark, ut2, underscore, lodash }) {
    config.forEach((item) => {
      result[item.method] = [];

      const underscoreConfig = {
        method: item.method,
        params: item.params,
        ...item.underscore
      };

      const lodashConfig = {
        method: item.method,
        params: item.params,
        ...item.lodash
      };

      const ut2Config = {
        method: item.method,
        params: item.params,
        ...item.ut2
      };

      item.params.forEach((args, i) => {
        const suite = new Benchmark.Suite();

        if (!result[item.method][i]) {
          result[item.method][i] = {};
        }

        result[item.method][i].$case = `${item.method}(${args.map((arg) => JSON.stringify(arg))})`;

        const cases = {
          underscore: `${underscoreConfig.method}(${underscoreConfig.params[i].map((arg) => JSON.stringify(arg))})`,
          lodash: `${lodashConfig.method}(${lodashConfig.params[i].map((arg) => JSON.stringify(arg))})`,
          ut2: `${ut2Config.method}(${ut2Config.params[i].map((arg) => JSON.stringify(arg))})`
        };
        suite
          .add(`underscore.${cases.underscore}`, () => {
            underscore[item.method](...underscoreConfig.params[i]);
          })
          .add(`lodash.${cases.lodash}`, () => {
            lodash[item.method](...lodashConfig.params[i]);
          })
          .add(`ut2.${cases.ut2}`, () => {
            ut2[item.method](...ut2Config.params[i]);
          })
          .on('cycle', function (event) {
            console.log(String(event.target));

            const [libName] = event.target.name.split('.');
            result[item.method][i][libName] = {
              case: event.target.name,
              hz: Math.floor(event.target.hz),
              rme: '±' + event.target.stats.rme.toFixed(2) + '%',
              // rme: event.target.stats.rme,
              sampled: event.target.stats.sample.length
            };
          })
          .on('complete', function () {
            const fasttestName = this.filter('fastest').map('name') + '';
            const [libName] = fasttestName.split('.');
            result[item.method][i].$fastest = libName;
            console.log('Fastest is ' + fasttestName);
          })
          .run();
      });
    });

    // console.log('result: ', JSON.stringify(result));
    return result;
  };
});

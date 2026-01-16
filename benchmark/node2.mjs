import _ from 'lodash';
import ut2 from 'ut2';
import Benchmark from 'benchmark';
import runTest from './utils/runTest.mjs';

runTest({
  libs: {
    Benchmark,
    ut2
  },
  options: { maxTime: 0.5 },
  // options: { maxTime: 5 },
  tests: [
    {
      async: false,
      code: function () {
        ut2.randomInt(2, 4);
      },
      title: 'ut2 randomInt'
    },
    {
      async: false,
      code: function () {
        _.random(2, 4);
      },
      title: 'lodash random'
    }
  ],
  onCycle: function (data) {
    if (data.status === 'finished') return;
    console.log(data);
  },
  onComplete: function (data) {
    console.log(data);
  }
});

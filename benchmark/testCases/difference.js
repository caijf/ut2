import { preCodeScript, libConfig } from './_util.js';

const params = [`[2, 1, 2], [1]`, `[1, 2, 3, 4, 5], [5, 2, 10]`, `['a', 'b', 'c'], ['a', 1]`, `[-0, 0], [0]`, `[NaN, 2, 1, NaN], [NaN, 5]`];

const cases = params.map((item) => ({
  initHTML: preCodeScript,
  tests: libConfig.map((lib) => {
    const method = 'difference';
    return {
      title: `${lib.name} ${method}`,
      code: `${lib.alias || lib.name}.${method}(${item})`
    };
  })
}));

export default cases;

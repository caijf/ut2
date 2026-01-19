import { preCodeScript, libConfig } from './_util.js';

const params = [
  `[{ x: 2 }, { x: 1 }], [{ x: 1 }], function (item) {
  return item.x;
}`,
  `[{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x'`,
  `[{ x: 1 }, { x: 2 }], [ { x: 3, a: 1 }, { x: 2, b: 2 } ], 'x'`,
  `[2.1, 2.3, 3, 4.5], [2, 4], function (item) {
    return Math.floor(item);
  }`
];

const cases = params.map((item) => ({
  initHTML: preCodeScript,
  tests: libConfig
    .filter((item) => item.name !== 'underscore')
    .map((lib) => {
      const method = lib.name === 'ut2' ? 'difference' : 'differenceBy';
      return {
        title: `${lib.name} ${method}`,
        code: `${lib.alias || lib.name}.${method}(${item})`
      };
    })
}));

export default cases;

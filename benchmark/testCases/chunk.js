import { preCodeScript, libConfig } from './_util.js';

const params = [`['a', 'b', 'c', 'd'], 0`, `['a', 'b', 'c', 'd'], 1`, `['a', 'b', 'c', 'd'], 2`, `['a', 'b', 'c', 'd'], 3`, `['a', 'b', 'c', 'd'], 7`];

const cases = params.map((item) => ({
  initHTML: preCodeScript,
  tests: libConfig.map((lib) => {
    const method = 'chunk';
    return {
      title: `${lib.name} ${method}`,
      code: `${lib.alias || lib.name}.${method}(${item})`
    };
  })
}));

export default cases;

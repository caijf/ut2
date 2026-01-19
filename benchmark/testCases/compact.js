import { preCodeScript, libConfig } from './_util.js';

const params = [`[0, 1, 2]`, `[0, 1, false, '', 2]`];

const cases = params.map((item) => ({
  initHTML: preCodeScript,
  tests: libConfig.map((lib) => {
    const method = 'compact';
    return {
      title: `${lib.name} ${method}`,
      code: `${lib.alias || lib.name}.${method}(${item})`
    };
  })
}));

export default cases;

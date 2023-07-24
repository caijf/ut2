jest.mock('../../src/internals/helpers.ts', () => {
  return {
    supportedArgumentsType: false
  };
});

import '../isArguments.test';

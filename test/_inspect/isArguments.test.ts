jest.mock('../../src/internals/helpers.ts', () => {
  return {
    argType: 'Arguments',
    supportedArgumentsType: false
  };
});

import '../isArguments.test';

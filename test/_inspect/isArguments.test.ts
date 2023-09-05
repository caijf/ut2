jest.mock('../../src/internals/helpers.ts', () => {
  const originalModule = jest.requireActual('../../src/internals/helpers.ts');

  return {
    ...originalModule,
    supportedArgumentsType: false
  };
});

import '../isArguments.test';

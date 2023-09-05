jest.mock('../../src/internals/native.ts', () => {
  const originalModule = jest.requireActual('../../src/internals/native.ts');

  return {
    ...originalModule,
    numberIsInteger: undefined
  };
});

import '../isInteger.test';

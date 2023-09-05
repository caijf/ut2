jest.mock('../../src/internals/native.ts', () => {
  const originalModule = jest.requireActual('../../src/internals/native.ts');

  return {
    ...originalModule,
    arrayAt: undefined
  };
});

import '../nth.test';

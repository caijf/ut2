jest.mock('../../src/internals/nodeUtil.ts', () => {
  const originalModule = jest.requireActual('../../src/internals/nodeUtil.ts');

  return {
    ...originalModule,
    nodeIsArrayBuffer: undefined
  };
});

import '../isArrayBuffer.test';

jest.mock('../../src/internals/nodeUtil.ts', () => {
  const originalModule = jest.requireActual('../../src/internals/nodeUtil.ts');

  return {
    ...originalModule,
    nodeIsTypedArray: undefined
  };
});

import '../isTypedArray.test';

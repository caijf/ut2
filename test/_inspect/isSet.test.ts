jest.mock('../../src/internals/nodeUtil.ts', () => {
  const originalModule = jest.requireActual('../../src/internals/nodeUtil.ts');

  return {
    ...originalModule,
    nodeIsSet: undefined
  };
});

import '../isSet.test';

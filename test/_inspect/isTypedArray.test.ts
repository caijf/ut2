jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsTypedArray: undefined
}));

import '../isTypedArray.test';

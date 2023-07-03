jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsArrayBuffer: undefined
}));

import '../isArrayBuffer.test';

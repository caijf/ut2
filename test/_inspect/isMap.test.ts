jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsMap: undefined
}));

import '../isMap.test';

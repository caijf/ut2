jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsSet: undefined
}));

import '../isSet.test';

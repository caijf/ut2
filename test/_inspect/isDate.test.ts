jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsDate: undefined
}));

import '../isDate.test';

jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsRegExp: undefined
}));

import '../isRegExp.test';

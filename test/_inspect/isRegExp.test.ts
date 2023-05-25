import { types } from 'util';
jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsRegExp: types.isRegExp
}));

import '../isRegExp.test';

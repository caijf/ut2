import { types } from 'util';
jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsTypedArray: types.isTypedArray
}));

import '../type/isTypedArray.test';

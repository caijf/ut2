import { types } from 'util';
jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsSet: types.isSet
}));

import '../type/isSet.test';

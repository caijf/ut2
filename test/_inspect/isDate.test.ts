import { types } from 'util';
jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsDate: types.isDate
}));

import '../type/isDate.test';

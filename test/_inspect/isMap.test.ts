import { types } from 'util';
jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsMap: types.isMap
}));

import '../isMap.test';
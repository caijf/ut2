import { types } from 'util';
jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsArrayBuffer: types.isArrayBuffer
}));

import '../type/isArrayBuffer.test';

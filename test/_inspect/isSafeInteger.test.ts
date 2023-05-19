jest.mock('../../src/internals/helpers.ts', () => ({
  numberIsSafeInteger: undefined
}));

import '../type/isSafeInteger.test';

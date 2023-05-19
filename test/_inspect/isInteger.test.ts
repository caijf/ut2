jest.mock('../../src/internals/helpers.ts', () => ({
  numberIsInteger: undefined
}));

import '../type/isInteger.test';

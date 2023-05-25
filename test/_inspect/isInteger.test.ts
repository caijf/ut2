jest.mock('../../src/internals/helpers.ts', () => ({
  numberIsInteger: undefined
}));

import '../isInteger.test';

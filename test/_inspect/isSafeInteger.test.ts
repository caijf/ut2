jest.mock('../../src/internals/helpers.ts', () => ({
  numberIsSafeInteger: undefined
}));

import '../isSafeInteger.test';

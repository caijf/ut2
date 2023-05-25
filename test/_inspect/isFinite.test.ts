jest.mock('../../src/internals/helpers.ts', () => ({
  numberIsFinite: undefined
}));

import '../isFinite.test';

jest.mock('../../src/internals/helpers.ts', () => ({
  numberIsFinite: undefined
}));

import '../type/isFinite.test';

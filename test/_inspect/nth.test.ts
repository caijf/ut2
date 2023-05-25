jest.mock('../../src/internals/helpers.ts', () => ({
  arrayAt: undefined
}));

import '../array/nth.test';

jest.mock('../../src/internals/helpers.ts', () => ({
  objectIs: undefined
}));

import '../eq.test';

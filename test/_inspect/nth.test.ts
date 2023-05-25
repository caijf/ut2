jest.mock('../../src/internals/helpers.ts', () => ({
  arrayAt: undefined
}));

import '../nth.test';

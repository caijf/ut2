const nativeActual = jest.requireActual('../../src/internals/native.ts');
jest.mock('../../src/internals/native.ts', () => ({
  ...nativeActual,
  arrayAt: undefined
}));

import '../nth.test';

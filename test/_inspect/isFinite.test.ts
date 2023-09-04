const nativeActual = jest.requireActual('../../src/internals/native.ts');
jest.mock('../../src/internals/native.ts', () => ({
  ...nativeActual,
  numberIsFinite: undefined
}));

import '../isFinite.test';

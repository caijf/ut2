const nativeActual = jest.requireActual('../../src/internals/native.ts');
jest.mock('../../src/internals/native.ts', () => ({
  ...nativeActual,
  numberIsInteger: undefined
}));

import '../isInteger.test';

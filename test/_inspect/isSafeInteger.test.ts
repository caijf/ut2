const nativeActual = jest.requireActual('../../src/internals/native.ts');
jest.mock('../../src/internals/native.ts', () => ({
  ...nativeActual,
  numberIsSafeInteger: undefined
}));

import '../isSafeInteger.test';

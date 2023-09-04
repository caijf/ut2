const helpersActual = jest.requireActual('../../src/internals/helpers.ts');
jest.mock('../../src/internals/helpers.ts', () => ({
  ...helpersActual,
  supportedArgumentsType: false
}));

import '../isArguments.test';

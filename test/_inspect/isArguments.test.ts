jest.mock('../../src/internals/helpers.ts', () => {
  return {
    argType: 'Arguments',
    supportedArgumentsType: false
  };
});

import { isArguments } from '../../src';
import { falsy, truthy, noop, symbol, args, strictArgs } from '../_utils';

describe('isArguments-unsupported `Object.prototype.toString', () => {
  afterAll(() => {
    jest.unmock('../../src/internals/helpers.ts');
  });

  it('corrent', () => {
    expect(isArguments(args)).toBe(true);
    expect(isArguments(strictArgs)).toBe(true);
  });

  it('incorrent', () => {
    falsy.forEach((item) => {
      expect(isArguments(item)).toBe(false);
    });

    truthy.forEach((item) => {
      expect(isArguments(item)).toBe(false);
    });

    expect(isArguments([1, 2, 3])).toBe(false);
    expect(isArguments({ a: 1, b: 2 })).toBe(false);
    expect(isArguments(noop)).toBe(false);
    expect(isArguments(/x/)).toBe(false);
    expect(isArguments('a')).toBe(false);
    expect(isArguments(new Error())).toBe(false);
    expect(isArguments(symbol)).toBe(false);
  });
});

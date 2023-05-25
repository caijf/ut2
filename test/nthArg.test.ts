import { nthArg } from '../src';
import { falsy } from './_utils';

describe('nthArg', () => {
  const args = ['a', 'b', 'c', 'd'];

  it('basic', () => {
    const func = nthArg(1);
    expect(func(...args)).toBe('b');

    args.forEach((item, i) => {
      const func = nthArg(i);
      expect(func(...args)).toBe(args[i]);
    });

    falsy.forEach((item, i) => {
      const func = nthArg(i);
      expect(func(...falsy)).toBe(falsy[i]);
    });
  });

  it('空数组返回 `undefined`', () => {
    const func = nthArg(1);
    expect(func()).toBeUndefined();
  });

  it('超出数组长度限制，返回 `undefined`', () => {
    const func1 = nthArg(Infinity);
    expect(func1(...args)).toBeUndefined();

    const func2 = nthArg(-10);
    expect(func2(...args)).toBeUndefined();
  });
});

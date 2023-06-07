import { fromPairs } from '../src';

describe('fromPairs', () => {
  it('basic', () => {
    const array = [
      ['a', 1],
      ['b', 2]
    ];
    expect(fromPairs(array)).toEqual({ a: 1, b: 2 });
    expect(
      fromPairs([
        ['foo', 'bar'],
        ['baz', 42]
      ])
    ).toEqual({ foo: 'bar', baz: 42 });
    expect(
      fromPairs([
        [Symbol.for('abc'), 'bar'],
        [1, 42]
      ])
    ).toEqual({ [Symbol.for('abc')]: 'bar', [1]: 42 });
  });

  it('错误的参数', () => {
    const values = [[[]], [[null]], false, null, undefined];
    values.forEach((item) => {
      // @ts-ignore
      expect(fromPairs(item)).toEqual({});
    });
  });
});

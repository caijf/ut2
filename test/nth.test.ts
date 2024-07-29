import { nth } from '../src';
import { toArgs } from './_utils';

describe('nth', () => {
  const arr = ['a', 'b', 'c', 'd'];

  it('basic', () => {
    expect(nth(arr)).toBe('a');
    expect(nth(arr, 1)).toBe('b');
    expect(nth(arr, 2)).toBe('c');
    expect(nth(arr, 3)).toBe('d');
    expect(nth(arr, 5)).toBeUndefined();

    expect(nth(arr, -1)).toBe('d');
    expect(nth(arr, -2)).toBe('c');
    expect(nth(arr, -3)).toBe('b');
    expect(nth(arr, -4)).toBe('a');
    expect(nth(arr, -5)).toBeUndefined();
  });

  it('支持类数组', () => {
    const obj = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 };
    const args = toArgs(['a', 'b', 'c', 'd']);
    const str = 'abcd';

    expect(nth(obj)).toBe('a');
    expect(nth(obj, 1)).toBe('b');
    expect(nth(obj, 2)).toBe('c');
    expect(nth(obj, 3)).toBe('d');
    expect(nth(obj, 5)).toBeUndefined();
    expect(nth(obj, -1)).toBe('d');
    expect(nth(obj, -2)).toBe('c');
    expect(nth(obj, -3)).toBe('b');
    expect(nth(obj, -4)).toBe('a');
    expect(nth(obj, -5)).toBeUndefined();

    expect(nth(args)).toBe('a');
    expect(nth(args, 1)).toBe('b');
    expect(nth(args, 2)).toBe('c');
    expect(nth(args, 3)).toBe('d');
    expect(nth(args, 5)).toBeUndefined();
    expect(nth(args, -1)).toBe('d');
    expect(nth(args, -2)).toBe('c');
    expect(nth(args, -3)).toBe('b');
    expect(nth(args, -4)).toBe('a');
    expect(nth(args, -5)).toBeUndefined();

    expect(nth(str)).toBe('a');
    expect(nth(str, 1)).toBe('b');
    expect(nth(str, 2)).toBe('c');
    expect(nth(str, 3)).toBe('d');
    expect(nth(str, 5)).toBeUndefined();
    expect(nth(str, -1)).toBe('d');
    expect(nth(str, -2)).toBe('c');
    expect(nth(str, -3)).toBe('b');
    expect(nth(str, -4)).toBe('a');
    expect(nth(str, -5)).toBeUndefined();
  });

  it('非类数组，返回 `undefined`', () => {
    const values = [undefined, null, 1, new Date(), new Error()];

    values.forEach((item) => {
      expect(nth(item as any, 1)).toBeUndefined();
    });
  });

  it('`n`超出数组长度限制，返回 `undefined`', () => {
    expect(nth(arr, Infinity)).toBeUndefined();

    const newArr = arr.slice();
    newArr[-1] = 'x';
    expect(nth(newArr, -1)).toBe(nth(arr, -1));
  });
});

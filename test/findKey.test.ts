import { findKey, isNumber } from '../src';
import { falsy } from './_utils';

const obj = {
  [Symbol.for('a')]: 1,
  n: 2,
  foo: 'bar',
  undef: undefined
};

const map = new Map<symbol | string, number | string | undefined>([
  [Symbol.for('a'), 1],
  ['n', 2],
  ['foo', 'bar'],
  ['undef', undefined]
]);

describe('findKey', () => {
  it('basic', () => {
    const k1 = findKey(obj, (v) => v === 2);
    expect(k1).toBe('n');
    const k2 = findKey(obj);
    expect(k2).toBe(undefined);
    const k3 = findKey(obj, isNumber); // Symbol 键属性在字符串属性后面
    expect(k3).toBe('n');
  });

  it('map 对象', () => {
    const k1 = findKey(map, (v) => v === 2);
    expect(k1).toBe('n');
    const k2 = findKey(map);
    expect(k2).toBe(undefined);
    const k3 = findKey(map, isNumber);
    expect(k3).toBe(Symbol.for('a'));
  });

  it('数组，同 findIndex 方法', () => {
    const k1 = findKey(['a', 'b'], (v) => v == 'b');
    expect(k1).toBe(1);
  });

  it('错误参数', () => {
    // 不支持的类型
    falsy.forEach((value) => {
      // @ts-ignore
      expect(findKey(value, () => true)).toBe(undefined);
    });

    const k1 = findKey(new WeakMap([[obj, 'bar']]), (v) => v === 'bar');
    expect(k1).toBe(undefined);
  });
});

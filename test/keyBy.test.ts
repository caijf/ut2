import { keyBy } from '../src';
import { symbol } from './_utils';

describe('keyBy', () => {
  it('basic', () => {
    const array = [6.1, 4.2, 6.3];
    expect(keyBy(array, Math.floor)).toEqual({ '6': 6.3, '4': 4.2 });
    expect(keyBy(array, (v) => Math.floor(v))).toEqual({ '6': 6.3, '4': 4.2 });

    // 无需迭代函数参数
    expect(keyBy([6, 4, 6])).toEqual({ '6': 6, '4': 4 });

    // shourthands
    expect(keyBy(['one', 'two', 'three'], 'length')).toEqual({
      '3': 'two',
      '5': 'three'
    });

    const array2 = [
      { dir: 'left', code: 97 },
      { dir: 'right', code: 100 }
    ];
    expect(keyBy(array2, (item) => String.fromCharCode(item.code))).toEqual({
      a: { dir: 'left', code: 97 },
      d: { dir: 'right', code: 100 }
    });
    expect(keyBy(array2, 'dir')).toEqual({
      left: { dir: 'left', code: 97 },
      right: { dir: 'right', code: 100 }
    });
  });

  it('数组数字索引', () => {
    const array = [
      [1, 'a'],
      [2, 'a'],
      [2, 'b']
    ];
    expect(keyBy(array, 0)).toEqual({
      '1': [1, 'a'],
      '2': [2, 'b']
    });
    expect(keyBy(array, 1)).toEqual({
      a: [2, 'a'],
      b: [2, 'b']
    });
  });

  it('对象集合', () => {
    expect(keyBy([{ n: 6.1 }, { n: 4.2 }, { n: 6.3 }], (item) => Math.floor(item.n))).toEqual({
      '6': { n: 6.3 },
      '4': { n: 4.2 }
    });
  });

  it('对象', () => {
    expect(keyBy({ a: 1, b: 1, c: 2 })).toEqual({ '1': 1, '2': 2 });
    expect(keyBy({ a: 'one', b: 'two', c: 'three' }, 'length')).toEqual({ '3': 'two', '5': 'three' });
    expect(keyBy({ a: { n: 6.1 }, b: { n: 4.2 }, c: { n: 6.3 } }, (value) => Math.floor(value.n))).toEqual({
      '6': { n: 6.3 },
      '4': { n: 4.2 }
    });
  });

  it('错误的参数', () => {
    const values = [null, undefined, 1, '', {}, NaN, symbol];
    values.forEach((item) => {
      expect(keyBy(item)).toEqual({});
    });
  });
});

import { countBy } from '../src';
import { symbol } from './_utils';

describe('countBy', () => {
  it('basic', () => {
    const array = [6.1, 4.2, 6.3];
    expect(countBy(array, Math.floor)).toEqual({ '6': 2, '4': 1 });
    expect(countBy(array, (v) => Math.floor(v))).toEqual({ '6': 2, '4': 1 });

    // 无需迭代函数参数
    expect(countBy([6, 4, 6])).toEqual({ '6': 2, '4': 1 });

    // shourthands
    expect(countBy(['one', 'two', 'three'], 'length')).toEqual({ '3': 2, '5': 1 });
  });

  it('数组数字索引', () => {
    const array = [
      [1, 'a'],
      [2, 'a'],
      [2, 'b']
    ];
    expect(countBy(array, 0)).toEqual({ '1': 1, '2': 2 });
    expect(countBy(array, 1)).toEqual({ a: 2, b: 1 });
  });

  it('对象集合', () => {
    expect(countBy([{ n: 6.1 }, { n: 4.2 }, { n: 6.3 }], (item) => Math.floor(item.n))).toEqual({
      '6': 2,
      '4': 1
    });
  });

  it('对象', () => {
    expect(countBy({ a: 1, b: 1, c: 2 })).toEqual({ '1': 2, '2': 1 });
    expect(countBy({ a: 'one', b: 'two', c: 'three' }, 'length')).toEqual({ '3': 2, '5': 1 });
    expect(countBy({ a: { n: 6.1 }, b: { n: 4.2 }, c: { n: 6.3 } }, (value) => Math.floor(value.n))).toEqual({
      '6': 2,
      '4': 1
    });
  });

  it('错误的参数', () => {
    const values = [null, undefined, 1, '', {}, NaN, symbol];
    values.forEach((item) => {
      // @ts-ignore
      expect(countBy(item)).toEqual({});
    });
  });
});

import { countBy } from '../src';
import { symbol } from './_utils';

describe('countBy', () => {
  it('basic', () => {
    const array = [6.1, 4.2, 6.3];
    const expected1 = countBy(array, Math.floor);
    expect(expected1).toEqual({ '6': 2, '4': 1 });

    const expected2 = countBy(array, (v) => Math.floor(v));
    expect(expected2).toEqual({ '6': 2, '4': 1 });

    // 无需迭代函数参数
    const expected3 = countBy([6, 4, 6]);
    expect(expected3).toEqual({ '6': 2, '4': 1 });

    // shourthands
    const expected4 = countBy(['one', 'two', 'three'], 'length');
    expect(expected4).toEqual({ '3': 2, '5': 1 });
  });

  it('数组数字索引', () => {
    const array = [
      [1, 'a'],
      [2, 'a'],
      [2, 'b']
    ];
    const expected1 = countBy(array, 0);
    expect(expected1).toEqual({ '1': 1, '2': 2 });

    const expected2 = countBy(array, 1);
    expect(expected2).toEqual({ a: 2, b: 1 });
  });

  it('对象集合', () => {
    const expected1 = countBy([{ n: 6.1 }, { n: 4.2 }, { n: 6.3 }], (item) => Math.floor(item.n));
    expect(expected1).toEqual({
      '6': 2,
      '4': 1
    });
  });

  it('对象', () => {
    const expected1 = countBy({ a: 1, b: 1, c: 2, [symbol]: 3 });
    expect(expected1).toEqual({ '1': 2, '2': 1, '3': 1 });

    const expected2 = countBy({ a: 'one', b: 'two', c: 'three' }, 'length');
    expect(expected2).toEqual({ '3': 2, '5': 1 });

    const expected3 = countBy({ a: { n: 6.1 }, b: { n: 4.2 }, c: { n: 6.3 } }, (value) => Math.floor(value.n));
    expect(expected3).toEqual({
      '6': 2,
      '4': 1
    });
  });

  it('使用索引或键值', () => {
    const array = [6.1, 4.2, 6.3];
    const object = { a: 1, b: 1, c: 2 };

    const expected1 = countBy(array, (_, i) => (i % 2 === 0 ? 'even' : 'odd'));
    expect(expected1).toEqual({
      even: 2,
      odd: 1
    });

    const expected2 = countBy(object, (_, k) => (k.indexOf('b') === -1 ? 'a' : 'b'));
    expect(expected2).toEqual({
      a: 2,
      b: 1
    });
  });

  it('错误的参数', () => {
    const values = [null, undefined, 1, '', {}, NaN, symbol];
    values.forEach((item) => {
      expect(countBy(item)).toEqual({});
    });
  });
});

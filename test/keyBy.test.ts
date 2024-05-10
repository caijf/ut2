import { keyBy } from '../src';
import { symbol } from './_utils';

describe('keyBy', () => {
  it('basic', () => {
    const array = [6.1, 4.2, 6.3];
    const expected1 = keyBy(array, Math.floor);
    expect(expected1).toEqual({ '6': 6.3, '4': 4.2 });

    const expected2 = keyBy(array, (v) => Math.floor(v));
    expect(expected2).toEqual({ '6': 6.3, '4': 4.2 });

    // 无需迭代函数参数
    const expected3 = keyBy([6, 4, 6]);
    expect(expected3).toEqual({ '6': 6, '4': 4 });

    // shourthands
    const expected4 = keyBy(['one', 'two', 'three'], 'length');
    expect(expected4).toEqual({
      '3': 'two',
      '5': 'three'
    });

    const array2 = [
      { dir: 'left', code: 97 },
      { dir: 'right', code: 100 }
    ];
    const expected5 = keyBy(array2, (item) => String.fromCharCode(item.code));
    expect(expected5).toEqual({
      a: { dir: 'left', code: 97 },
      d: { dir: 'right', code: 100 }
    });

    const expected6 = keyBy(array2, 'dir');
    expect(expected6).toEqual({
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
    const expected1 = keyBy(array, 0);
    expect(expected1).toEqual({
      '1': [1, 'a'],
      '2': [2, 'b']
    });

    const expected2 = keyBy(array, 1);
    expect(expected2).toEqual({
      a: [2, 'a'],
      b: [2, 'b']
    });
  });

  it('对象集合', () => {
    const expected1 = keyBy([{ n: 6.1 }, { n: 4.2 }, { n: 6.3 }], (item) => Math.floor(item.n));
    expect(expected1).toEqual({
      '6': { n: 6.3 },
      '4': { n: 4.2 }
    });
  });

  it('对象', () => {
    const expected1 = keyBy({ a: 1, b: 1, c: 2, [symbol]: 3 });
    expect(expected1).toEqual({ '1': 1, '2': 2, '3': 3 });

    const expected2 = keyBy({ a: 'one', b: 'two', c: 'three' }, 'length');
    expect(expected2).toEqual({ '3': 'two', '5': 'three' });

    const expected3 = keyBy({ a: { n: 6.1 }, b: { n: 4.2 }, c: { n: 6.3 } }, (value) => Math.floor(value.n));
    expect(expected3).toEqual({
      '6': { n: 6.3 },
      '4': { n: 4.2 }
    });
  });

  it('使用索引或键值', () => {
    const array = [6.1, 4.2, 6.3];
    const object = { a: 1, b: 1, c: 2 };

    const expected1 = keyBy(array, (_, i) => (i % 2 === 0 ? 'even' : 'odd'));
    expect(expected1).toEqual({
      even: 6.3,
      odd: 4.2
    });

    const expected2 = keyBy(object, (_, k) => (k.indexOf('b') === -1 ? 'a' : 'b'));
    expect(expected2).toEqual({
      a: 2,
      b: 1
    });
  });

  it('错误的参数', () => {
    const values = [null, undefined, 1, '', {}, NaN, symbol];
    values.forEach((item) => {
      expect(keyBy(item)).toEqual({});
    });
  });
});

import { groupBy } from '../src';
import { symbol } from './_utils';

describe('groupBy', () => {
  it('basic', () => {
    const array = [6.1, 4.2, 6.3];
    expect(groupBy(array, Math.floor)).toEqual({ '6': [6.1, 6.3], '4': [4.2] });
    expect(groupBy(array, (v) => Math.floor(v))).toEqual({ '6': [6.1, 6.3], '4': [4.2] });

    // 无需迭代函数参数
    expect(groupBy([6, 4, 6])).toEqual({ '6': [6, 6], '4': [4] });

    // shourthands
    expect(groupBy(['one', 'two', 'three'], 'length')).toEqual({
      '3': ['one', 'two'],
      '5': ['three']
    });
  });

  it('数组数字索引', () => {
    const array = [
      [1, 'a'],
      [2, 'a'],
      [2, 'b']
    ];
    expect(groupBy(array, 0)).toEqual({
      '1': [[1, 'a']],
      '2': [
        [2, 'a'],
        [2, 'b']
      ]
    });
    expect(groupBy(array, 1)).toEqual({
      a: [
        [1, 'a'],
        [2, 'a']
      ],
      b: [[2, 'b']]
    });
  });

  it('对象集合', () => {
    expect(groupBy([{ n: 6.1 }, { n: 4.2 }, { n: 6.3 }], (item) => Math.floor(item.n))).toEqual({
      '6': [{ n: 6.1 }, { n: 6.3 }],
      '4': [{ n: 4.2 }]
    });
  });

  it('错误的参数', () => {
    const values = [null, undefined, 1, '', {}, NaN, symbol];
    values.forEach((item) => {
      // @ts-ignore
      expect(groupBy(item)).toEqual({});
    });
  });
});

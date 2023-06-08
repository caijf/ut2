import { union } from '../src';

describe('union', () => {
  it('返回两个数组的并集', () => {
    expect(union([2], [2, 1])).toEqual([2, 1]);
    expect(union([2], [2, 1])).toEqual([2, 1]);
    expect(union([2, 'a', NaN, 1, NaN], [NaN, null, undefined, 2, 3])).toEqual([
      2,
      'a',
      NaN,
      1,
      null,
      undefined,
      3
    ]);
    expect(union([2.1, 2.3, 3, 4.5], [2], Math.floor)).toEqual([2.1, 3, 4.5]);
    expect(union([2.1, 2.3, 3, 4.5], [2], (item) => Math.floor(item))).toEqual([2.1, 3, 4.5]);
    expect(union([{ n: 1 }, { n: 2 }, { n: 1 }], [{ n: 1 }], 'n')).toEqual([{ n: 1 }, { n: 2 }]);
    expect(union([{ n: 1 }, { n: 2 }, { n: 1 }], [{ n: 1 }], (item) => item.n)).toEqual([
      { n: 1 },
      { n: 2 }
    ]);
  });

  it('返回一个数组中的唯一值', () => {
    expect(union([1, 2, 3, 2, 1], [2, 3, 2, 1, 5, 4])).toEqual([1, 2, 3, 5, 4]);
  });

  it('`+0` `-0` 全等于 `0`', () => {
    expect(union([-0, +0, 0], [+0])).toEqual([-0]);
    expect(union([+0, -0, 0], [-0])).toEqual([+0]);
    expect(union([0, +0, -0], [0])).toEqual([0]);
  });

  it('匹配 `NaN`', () => {
    expect(union([NaN, 1, 2, NaN], [NaN, 5])).toEqual([NaN, 1, 2, 5]);
  });

  it('包含引用数据', () => {
    const obj = { a: 1 };
    expect(union([obj, { a: 1 }, ''], [{ a: 1 }])).toEqual([obj, { a: 1 }, '', { a: 1 }]);
    expect(union([obj, { a: 1 }, ''], [obj])).toEqual([obj, { a: 1 }, '']);
    expect(
      union([obj, { a: 1 }, ''], [{ a: 1 }], (item) => (typeof item === 'object' ? item.a : item))
    ).toEqual([obj, '']);
  });

  it('错误的参数', () => {
    const values = [null, false, true, 1, '', { a: 1 }];
    values.forEach((item) => {
      // @ts-ignore
      expect(union(item)).toEqual([]);
    });
    // @ts-ignore
    expect(union('a', [1])).toEqual([1]);
    // @ts-ignore
    expect(union(['a'], 1)).toEqual(['a']);
  });
});

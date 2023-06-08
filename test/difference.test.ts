import { difference } from '../src';

describe('difference', () => {
  it('basic', () => {
    expect(difference([2, 1, 2], [1])).toEqual([2, 2]);
    expect(difference(['a', 'b', 'c'], ['a', 1])).toEqual(['b', 'c']);
    expect(
      difference(
        [{ n: 1 }, { n: 2 }],
        [
          { n: 3, a: 1 },
          { n: 1, b: 2 }
        ],
        'n'
      )
    ).toEqual([{ n: 2 }]);
    expect(
      difference(
        [{ n: 1 }, { n: 2 }],
        [
          { n: 3, a: 1 },
          { n: 1, b: 2 }
        ],
        (item) => item.n
      )
    ).toEqual([{ n: 2 }]);
    expect(difference([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor)).toEqual([3.1, 1.3]);
  });

  it('`+0` `-0` 全等于 `0`', () => {
    expect(difference([-0, 0, +0], [0])).toEqual([]);
    expect(difference([-0, 0, +0], [-0])).toEqual([]);
    expect(difference([-0, 0, +0], [+0])).toEqual([]);
  });

  it('匹配 `NaN`', () => {
    expect(difference([NaN, 1, 2, NaN], [NaN, 5])).toEqual([1, 2]);
  });

  it('包含引用数据', () => {
    const obj = { a: 1 };
    expect(difference([obj, { a: 1 }, ''], [{ a: 1 }])).toEqual([obj, { a: 1 }, '']);
    expect(difference([obj, { a: 1 }, ''], [obj])).toEqual([{ a: 1 }, '']);
    expect(
      difference([obj, { a: 1 }, ''], [{ a: 1 }], (item) =>
        typeof item === 'object' ? item.a : item
      )
    ).toEqual(['']);
  });

  it('错误的参数', () => {
    // @ts-ignore
    expect(difference('a', [1])).toEqual([]);
    // @ts-ignore
    expect(difference(['a'], 1)).toEqual(['a']);
  });
});

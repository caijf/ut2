import { intersection } from '../src';

describe('intersection', () => {
  it('返回两个数组的交集', () => {
    expect(intersection([2, 1], [2, 3])).toEqual([2]);
    expect(intersection([2, 'a', NaN, 1, NaN], [NaN, null, undefined, 2, 3])).toEqual([2, NaN]);
    expect(intersection([2.1, 2.3, 3, 4.5], [2], Math.floor)).toEqual([2.1]);
    expect(intersection([2.1, 2.3, 3, 4.5], [2], (item) => Math.floor(item))).toEqual([2.1]);
    expect(intersection([{ n: 1 }, { n: 2 }, { n: 1 }], [{ n: 1 }], 'n')).toEqual([{ n: 1 }]);
    expect(intersection([{ n: 1 }, { n: 2 }, { n: 1 }], [{ n: 1 }], (item) => item.n)).toEqual([{ n: 1 }]);
  });

  it('返回一个数组中的唯一值', () => {
    expect(intersection([1, 2, 3, 2, 1], [2, 3, 2, 1, 5, 4])).toEqual([1, 2, 3]);
  });

  it('`+0` `-0` 全等于 `0`', () => {
    expect(intersection([-0, 0, +0], [0])).toEqual([-0]);
    expect(intersection([-0, 0, +0], [-0])).toEqual([-0]);
    expect(intersection([-0, 0, +0], [+0])).toEqual([-0]);
  });

  it('匹配 `NaN`', () => {
    expect(intersection([NaN, 1, 2, NaN], [NaN, 5])).toEqual([NaN]);
  });

  it('包含引用数据', () => {
    const obj = { a: 1 };
    expect(intersection([obj, { a: 1 }, ''], [{ a: 1 }])).toEqual([]);
    expect(intersection([obj, { a: 1 }, ''], [obj])).toEqual([obj]);
    expect(intersection([obj, { a: 1 }, ''], [{ a: 1 }], (item) => (typeof item === 'object' ? item.a : item))).toEqual([obj]);
  });

  it('strickCheck', () => {
    expect(intersection([-0, 0, +0], [0], undefined, true)).toEqual([0]);
    expect(intersection([-0, 0, +0], [-0], undefined, true)).toEqual([-0]);
    expect(intersection([-0, 0, +0], [+0], undefined, true)).toEqual([0]);
  });

  it('错误的参数', () => {
    // @ts-ignore
    expect(intersection('a', [1])).toEqual([]);
    // @ts-ignore
    expect(intersection(['a'], 1)).toEqual([]);
  });
});

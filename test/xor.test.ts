import { xor } from '../src';

describe('xor', () => {
  it('返回两个数组的差集', () => {
    expect(xor([2, 1], [2, 3])).toEqual([1, 3]);
    expect(xor([2, 'a', NaN, 1, NaN], [NaN, null, undefined, 2, 3])).toEqual([
      'a',
      1,
      null,
      undefined,
      3
    ]);
    expect(xor([2.1, 2.3, 3, 4.5], [2], Math.floor)).toEqual([3, 4.5]);
    expect(xor([2.1, 2.3, 3, 4.5], [2], (item) => Math.floor(item))).toEqual([3, 4.5]);
    expect(xor([{ n: 1 }, { n: 2 }, { n: 1 }], [{ n: 1 }], 'n')).toEqual([{ n: 2 }]);
    expect(xor([{ n: 1 }, { n: 2 }, { n: 1 }], [{ n: 1 }], (item) => item.n)).toEqual([{ n: 2 }]);
  });

  it('返回一个数组中的唯一值', () => {
    expect(xor([1, 2, 3, 2, 1], [2, 3, 2, 1, 5, 4])).toEqual([5, 4]);
  });

  it('`+0` `-0` 全等于 `0`', () => {
    expect(xor([-0, 0, +0], [0])).toEqual([]);
    expect(xor([-0, 0, +0], [-0])).toEqual([]);
    expect(xor([-0, 0, +0], [+0])).toEqual([]);
  });

  it('匹配 `NaN`', () => {
    expect(xor([NaN, 1, 2, NaN], [NaN, 5])).toEqual([1, 2, 5]);
  });

  it('包含引用数据', () => {
    const obj = { a: 1 };
    expect(xor([obj, { a: 1 }, ''], [{ a: 1 }])).toEqual([obj, { a: 1 }, '', { a: 1 }]);
    expect(xor([obj, { a: 1 }, ''], [obj])).toEqual([{ a: 1 }, '']);
    expect(
      xor([obj, { a: 1 }, ''], [{ a: 1 }], (item) => (typeof item === 'object' ? item.a : item))
    ).toEqual(['']);
  });

  it('错误的参数', () => {
    const values = [null, false, true, 1, '', { a: 1 }];
    values.forEach((item) => {
      // @ts-ignore
      expect(xor(item)).toEqual([]);
    });
    // @ts-ignore
    expect(xor('a', 1)).toEqual([]);
    // @ts-ignore
    expect(xor('a', [1])).toEqual([1]);
    // @ts-ignore
    expect(xor(['a'], 1)).toEqual(['a']);
  });
});

import { zip } from '../src';
import { toArgs } from './_utils';

describe('zip', () => {
  it('basic', () => {
    expect(zip([])).toEqual([]);
    expect(zip([], [])).toEqual([]);
    expect(zip(['barney', 'fred'], [36, 40])).toEqual([
      ['barney', 36],
      ['fred', 40]
    ]);
    expect(zip(['barney', 'fred'], [36, 40], [true, false])).toEqual([
      ['barney', 36, true],
      ['fred', 40, false]
    ]);
  });

  it('不同长度的分组数组', () => {
    expect(zip(['barney', 'fred'], [36, 40, false])).toEqual([
      ['barney', 36],
      ['fred', 40],
      [undefined, false]
    ]);
    expect(zip(['barney', 'fred'], [36, 40], [])).toEqual([
      ['barney', 36, undefined],
      ['fred', 40, undefined]
    ]);
    expect(zip(['barney', 'fred'], [36, 40], [true])).toEqual([
      ['barney', 36, true],
      ['fred', 40, undefined]
    ]);
  });

  it('含有非数组和类数组对象', () => {
    // @ts-ignore
    expect(zip([1, 2], null, undefined, 1, 'a', [3, 4])).toEqual([
      [1, 3],
      [2, 4]
    ]);
    // @ts-ignore
    expect(zip([1, 2], toArgs(['a', 'b']), undefined, 1, 'a', [3, 4])).toEqual([
      [1, 'a', 3],
      [2, 'b', 4]
    ]);
  });

  it('支持使用自身的返回值', () => {
    const array = [
      ['barney', 'fred'],
      [36, 40]
    ];
    expect(zip(...zip(...array))).toEqual(array);
  });

  it('错误的参数', () => {
    const values = ['abc', 123, {}, null, undefined];
    values.forEach((item) => {
      // @ts-ignore
      expect(zip(item)).toEqual([]);
    });

    // @ts-ignore
    expect(zip()).toEqual([]);
  });
});

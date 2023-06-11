import { chunk } from '../src';

describe('chunk', () => {
  const array = [0, 1, 2, 3, 4, 5];

  it('返回一个区块数组', () => {
    expect(chunk(array)).toEqual([[0], [1], [2], [3], [4], [5]]);
    expect(chunk(array, 2)).toEqual([
      [0, 1],
      [2, 3],
      [4, 5]
    ]);
    expect(chunk(array, 3)).toEqual([
      [0, 1, 2],
      [3, 4, 5]
    ]);
    expect(chunk(array, 4)).toEqual([
      [0, 1, 2, 3],
      [4, 5]
    ]);
    expect(chunk(array, 5)).toEqual([[0, 1, 2, 3, 4], [5]]);
    expect(chunk(array, 6)).toEqual([[0, 1, 2, 3, 4, 5]]);
    expect(chunk(array, 7)).toEqual([[0, 1, 2, 3, 4, 5]]);
  });

  it('长度为 `0`', () => {
    expect(chunk(array, 0)).toEqual([]);
  });

  it('错误的参数', () => {
    const errorSizeValues = [NaN, {}, 0];
    errorSizeValues.forEach((item) => {
      // @ts-ignore
      expect(chunk(array, item)).toEqual([]);
    });

    const errorArrayValues = [1, NaN, null, {}, false, true, ''];
    errorArrayValues.forEach((item) => {
      // @ts-ignore
      expect(chunk(item)).toEqual([]);
    });
  });
});

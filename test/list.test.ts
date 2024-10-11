import { constant, list } from '../src';
import { falsy } from './_utils';

describe('list', () => {
  it('basic', () => {
    expect(list(0)).toEqual([]);
    expect(list(0, () => {})).toEqual([]);

    expect(list(2)).toEqual([0, 1]);
    expect(list(2, () => {})).toEqual([undefined, undefined]);

    expect(list(3, String)).toEqual(['0', '1', '2']);
    expect(list(4, constant(4))).toEqual([4, 4, 4, 4]);

    expect(list(3, (x) => x * 2)).toEqual([0, 2, 4]);

    expect(
      list(1, function () {
        // eslint-disable-next-line prefer-rest-params
        return Array.prototype.slice.call(arguments);
      })
    ).toEqual([[0]]);
  });

  it('`n` 为非整数，向下取整', () => {
    expect(list(2.6)).toEqual([0, 1]);
  });

  it('`n` 不是一个有限数值 或 超出安全整数，返回空数组', () => {
    const values = [Infinity, NaN, Number.MAX_VALUE, Number.MAX_SAFE_INTEGER + 1];
    values.forEach((item) => {
      expect(list(item)).toEqual([]);
    });
  });

  it('`n` 为 Falsy 值或负数，返回空数组', () => {
    const values = [...falsy, -1, -Infinity];
    values.forEach((item) => {
      // @ts-ignore
      expect(list(item)).toEqual([]);
    });
  });

  it('`iteratee` 非函数类型，取 `identity`', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    values.forEach((item) => {
      // @ts-ignore
      expect(list(3, item)).toEqual(list(3));
    });
  });
});

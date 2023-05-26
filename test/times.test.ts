import { constant, times } from '../src';
import { falsy } from './_utils';

describe('times', () => {
  it('basic', () => {
    expect(times(0)).toEqual([]);
    expect(times(0, () => {})).toEqual([]);

    expect(times(2)).toEqual([0, 1]);
    expect(times(2, () => {})).toEqual([undefined, undefined]);

    expect(times(3, String)).toEqual(['0', '1', '2']);
    expect(times(4, constant(4))).toEqual([4, 4, 4, 4]);

    expect(times(3, (x) => x * 2)).toEqual([0, 2, 4]);

    expect(
      times(1, function () {
        // eslint-disable-next-line prefer-rest-params
        return Array.prototype.slice.call(arguments);
      })
    ).toEqual([[0]]);
  });

  it('`n` 为非整数，向下取整', () => {
    expect(times(2.6)).toEqual([0, 1]);
  });

  it('`n` 不是一个有限数值 或 超出安全整数，返回空数组', () => {
    const values = [Infinity, NaN, Number.MAX_VALUE, Number.MAX_SAFE_INTEGER + 1];
    values.forEach((item) => {
      expect(times(item)).toEqual([]);
    });
  });

  it('`n` 为 Falsy 值或负数，返回空数组', () => {
    const values = [...falsy, -1, -Infinity];
    values.forEach((item) => {
      // @ts-ignore
      expect(times(item)).toEqual([]);
    });
  });

  it('`iteratee` 非函数类型，取 `identity`', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    values.forEach((item) => {
      // @ts-ignore
      expect(times(3, item)).toEqual(times(3));
    });
  });
});

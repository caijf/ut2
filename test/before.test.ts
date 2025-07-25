import { before, list } from '../src';

describe('before', () => {
  function testBefore(n: number, total: number) {
    const fn = jest.fn();
    list(total, before(n, fn));
    return fn;
  }

  it('调用 `func` 函数 `n` 次之后不再调用', () => {
    expect(testBefore(5, 5)).toHaveBeenCalledTimes(4);
    expect(testBefore(5, 4)).toHaveBeenCalledTimes(4);
    expect(testBefore(5, 6)).toHaveBeenCalledTimes(4);
    expect(testBefore(0, 0)).toHaveBeenCalledTimes(0);
    expect(testBefore(0, 1)).toHaveBeenCalledTimes(0);
    expect(testBefore(0, 3)).toHaveBeenCalledTimes(0);

    expect(testBefore(1, 0)).toHaveBeenCalledTimes(0);
    expect(testBefore(1, 1)).toHaveBeenCalledTimes(0);
    expect(testBefore(1, 3)).toHaveBeenCalledTimes(0);

    let count = 0;
    const increment = before(3, () => {
      return ++count;
    });
    expect(increment()).toBe(1);
    expect(increment()).toBe(2);
    expect(increment()).toBe(2);
    expect(increment()).toBe(2);
  });

  it('如果 `n` 不能转为数字，强制改为 `0`', () => {
    // @ts-ignore
    expect(testBefore('a', 0)).toHaveBeenCalledTimes(0);
    expect(testBefore(NaN, 1)).toHaveBeenCalledTimes(0);
    // @ts-ignore
    expect(testBefore(null, 3)).toHaveBeenCalledTimes(0);
  });

  it('使用 `this`', () => {
    const fn = jest.fn().mockImplementation(function () {
      // @ts-ignore
      return ++this.count;
    });
    const obj = {
      before: before(2, fn),
      count: 0
    };

    expect(obj.before()).toBe(1);
    expect(obj.count).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(obj.before()).toBe(1);
    expect(obj.count).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(obj.before()).toBe(1);
    expect(obj.count).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('非函数报异常', () => {
    const errorFunc = function () {
      // @ts-ignore
      return before(1, 'a');
    };
    expect(errorFunc).toThrow('Expected a function');
  });
});

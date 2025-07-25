import { after, list } from '../src';

describe('after', () => {
  function testAfter(n: number, total: number) {
    const fn = jest.fn();
    list(total, after(n, fn));
    return fn;
  }

  it('创建一个函数，在调用 `n` 次或更多次后执行 `func` ', () => {
    expect(testAfter(5, 5)).toHaveBeenCalledTimes(1);
    expect(testAfter(5, 4)).toHaveBeenCalledTimes(0);
    expect(testAfter(0, 0)).toHaveBeenCalledTimes(0);
    expect(testAfter(0, 1)).toHaveBeenCalledTimes(1);
    expect(testAfter(0, 3)).toHaveBeenCalledTimes(3);
  });

  it('如果 `n` 不能转为数字，强制改为 `0`', () => {
    // @ts-ignore
    expect(testAfter('a', 0)).toHaveBeenCalledTimes(0);
    expect(testAfter(NaN, 1)).toHaveBeenCalledTimes(1);
    // @ts-ignore
    expect(testAfter(null, 3)).toHaveBeenCalledTimes(3);
  });

  it('使用 `this`', () => {
    const fn = jest.fn().mockImplementation(function () {
      // @ts-ignore
      return ++this.count;
    });
    const obj = {
      after: after(2, fn),
      count: 0
    };

    expect(obj.after()).toBeUndefined();
    expect(obj.count).toBe(0);
    expect(fn).toHaveBeenCalledTimes(0);

    expect(obj.after()).toBe(1);
    expect(obj.count).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('非函数报异常', () => {
    const errorFunc = function () {
      // @ts-ignore
      return after(1, 'a');
    };
    expect(errorFunc).toThrow('Expected a function');
  });
});

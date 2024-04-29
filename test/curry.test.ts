import { curry, partial } from '../src';

describe('curry', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(a: number, b: number, c: number, d: number) {
    // eslint-disable-next-line prefer-rest-params
    return Array.prototype.slice.call(arguments);
  }

  it('根据给定参数数量进行柯里化', () => {
    const curried = curry(fn);
    const expected = [1, 2, 3, 4];
    expect(curried(1)(2)(3)(4)).toEqual(expected);
    expect(curried(1, 2)(3)(4)).toEqual(expected);
    expect(curried(1)(2, 3)(4)).toEqual(expected);
    expect(curried(1)(2)(3, 4)).toEqual(expected);
    expect(curried(1, 2)(3, 4)).toEqual(expected);
    expect(curried(1)(2, 3, 4)).toEqual(expected);
    expect(curried(1, 2, 3)(4)).toEqual(expected);
    expect(curried(1, 2, 3, 4)).toEqual(expected);
  });

  it('允许指定参数数量', () => {
    const curried = curry(fn, 3);
    const expected = [1, 2, 3];
    expect(curried(1)(2)(3)).toEqual(expected);
    expect(curried(1)(2, 3)).toEqual(expected);
    expect(curried(1, 2)(3)).toEqual(expected);
    expect(curried(1, 2, 3)).toEqual(expected);
  });

  it('将参数数量强制转为整数', () => {
    // @ts-expect-error
    const curried1 = curry(fn, '0');
    expect(curried1()).toEqual([]);

    const curried2 = curry(fn, 0.6);
    expect(curried2()).toEqual([]);

    // @ts-expect-error
    const curried3 = curry(fn, 'xyz');
    expect(curried3()).toEqual([]);

    // @ts-expect-error
    const curried4 = curry(fn, '2');
    // @ts-expect-error
    expect(curried4(1)(2)).toEqual([1, 2]);
  });

  it('支持占位符', () => {
    const curried = curry(fn);
    const ph = curry.placeholder;
    const expected = [1, 2, 3, 4];

    expect(curried(1)(ph, 3)(ph, 4)(2)).toEqual(expected);
    expect(curried(ph, 2)(ph, 3)(ph, 4)(1)).toEqual(expected);
    expect(curried(ph, 2)(ph, 3, 4)(1)).toEqual(expected);
    expect(curried(ph, 2)(ph, ph, 4)(1, 3)).toEqual(expected);
    expect(curried(ph, ph, 3)(ph, 2)(ph, 4)(1)).toEqual(expected);
    expect(curried(ph, ph, ph, 4)(ph, ph, 3)(ph, 2)(1)).toEqual(expected);
  });

  it('保留占位符', () => {
    const curried = curry(fn);
    const ph = curry.placeholder;
    expect(curried(ph, ph, ph, 4)(1)(ph)(2)(3)).toEqual([1, 2, 3, 4]);
  });

  it('达到目标参数数量后提供额外的参数', () => {
    const curried = curry(fn, 3);
    expect(curried(1)(2, 3, 4)).toEqual([1, 2, 3, 4]);
    // @ts-expect-error
    expect(curried(1, 2)(3, 4, 5)).toEqual([1, 2, 3, 4, 5]);
    // @ts-expect-error
    expect(curried(1, 2, 3, 4, 5, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('返回函数参数长度为 `0`', () => {
    const curried1 = curry(fn);
    expect(curried1().length).toBe(0);
    expect(curried1(1).length).toBe(0);
    expect(curried1(1, 2).length).toBe(0);

    const curried2 = curry(fn, 4);
    expect(curried2().length).toBe(0);
    expect(curried2(1).length).toBe(0);
    expect(curried2(1, 2).length).toBe(0);
  });

  it('函数调用指定 `this` ', () => {
    function fn2(this: any, a: string, b: string, c: string) {
      const value = this || {};
      return [value[a], value[b], value[c]];
    }

    const obj: any = { a: 1, b: 2, c: 3 };
    const expected = [1, 2, 3];
    expect(curry(fn2.bind(obj), 3)('a')('b')('c')).toEqual(expected);
    expect(curry(fn2.bind(obj), 3)('a', 'b')('c')).toEqual(expected);
    expect(curry(fn2.bind(obj), 3)('a', 'b', 'c')).toEqual(expected);

    expect(curry(fn2, 3).bind(obj)('a')('b')('c')).toEqual(expected);
    expect(curry(fn2, 3).bind(obj)('a', 'b')('c')).toEqual(expected);
    expect(curry(fn2, 3).bind(obj)('a', 'b', 'c')).toEqual(expected);

    obj.curried = curry(fn2);
    expect(obj.curried('a')('b')('c')).toEqual(expected);
    expect(obj.curried('a', 'b')('c')).toEqual(expected);
    expect(obj.curried('a', 'b', 'c')).toEqual(expected);
  });

  it('和 partial 方法一起使用', () => {
    const curried = curry(fn);
    const expected = [1, 2, 3, 4];

    const a = partial(curried, 1);
    // @ts-expect-error
    expect(a(2, 3, 4)).toEqual(expected);

    const b = curry(a, 3);
    // @ts-expect-error
    expect(b(curry._, curry._, 4)(curry._, 3)(2)).toEqual(expected);

    const c = partial(b, 2);
    // @ts-expect-error
    expect(c(3, 4)).toEqual(expected);
  });
});

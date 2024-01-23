import { every, isNumber, isString, times } from '../src';

describe('every', () => {
  it('basic', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(every(arr, (item) => item % 2 === 0)).toBe(false);
    expect(every(arr, (item) => item < 3)).toBe(false);
    expect(every(arr, (item) => item > 3)).toBe(false);
    expect(every(arr, isNumber)).toBe(true);
    expect(every(arr)).toBe(true);
  });

  it('不传第二个参数，默认返回元素自身的值', () => {
    const arr = [1, null, undefined, false, 2, 3];
    expect(every(arr)).toBe(false);

    const fn = jest.fn((item) => item); // 模拟默认第二个参数，用于测试
    every(arr, fn);
    expect(fn).toBeCalledTimes(2);

    const obj = { a: 1, b: false, c: 2 };
    expect(every(obj)).toBe(false);

    const objFn = jest.fn((value) => value); // 模拟默认第二个参数，用于测试
    every(obj, objFn);
    expect(objFn).toBeCalledTimes(2);
  });

  it('对象', () => {
    const obj = { one: 1, two: 2, three: 3 };
    expect(every(obj, (item) => item % 2 === 0)).toBe(false);
    expect(every(obj, (item) => item > 1)).toBe(false);
    expect(every(obj, (item) => item > 0)).toBe(true);
    expect(every(obj, isNumber)).toBe(true);
  });

  it('字符串', () => {
    expect(every('abc', (item) => item !== 'b')).toBe(false);
    expect(every('abc', isString)).toBe(true);
  });

  it('迭代次数', () => {
    const fn = jest.fn(isNumber);
    const arr = times(1000);
    every(arr, fn);
    expect(fn).toBeCalledTimes(1000);
  });

  it('迭代函数显示返回 false ，终止迭代', () => {
    const arr = times(1000);
    const fn = jest.fn((num: number) => {
      return num !== 499;
    });
    every(arr, fn);
    expect(fn).toBeCalledTimes(500);

    const obj = { a: 1, b: 2, c: 3 };
    const objFn = jest.fn((value: number, key: string) => {
      return key !== 'b';
    });
    every(obj, objFn);
    expect(objFn).toBeCalledTimes(2);
  });

  it('带 length 的普通对象，视为类数组对象', () => {
    // 错误的类数组对象
    const obj = { a: 1, b: 2, length: 2 };
    const fn = jest.fn((item) => item);
    const objResult = every(obj, fn);
    expect(fn).toBeCalledTimes(1);
    expect(objResult).toBe(false);

    // 正常的类数组对象
    const obj2 = { 0: 'a', 1: 'b', length: 2 };
    const fn2 = jest.fn((item) => item);
    const obj2Result = every(obj2, fn2);
    expect(fn2).toBeCalledTimes(2);
    expect(obj2Result).toBe(true);
  });

  it('不支持的数据类型 Map,Set,number,null,undefined,function 等，返回 true', () => {
    const mapFn = jest.fn((item) => item);
    const mapResult = every(
      new Map([
        ['foo', 'bar'],
        ['baz', 'a']
      ]),
      mapFn
    );
    expect(mapFn).toBeCalledTimes(0);
    expect(mapResult).toBe(true);

    const setFn = jest.fn((item) => item);
    const setResult = every(new Set(['bar', 'foo', 'baz']), setFn);
    expect(setFn).toBeCalledTimes(0);
    expect(setResult).toBe(true);

    const numFn = jest.fn((item) => item);
    // @ts-ignore
    const numResult = every(12345, numFn);
    expect(numFn).toBeCalledTimes(0);
    expect(numResult).toBe(true);

    const nullFn = jest.fn((item) => item);
    const nullResult = every(null, nullFn);
    expect(nullFn).toBeCalledTimes(0);
    expect(nullResult).toBe(true);

    const undefFn = jest.fn((item) => item);
    // @ts-ignore
    const undefResult = every(undefined, undefFn);
    expect(undefFn).toBeCalledTimes(0);
    expect(undefResult).toBe(true);

    function foo(a: number) {
      return a;
    }
    const funcFn = jest.fn((item) => item);
    const funcResult = every(foo, funcFn);
    expect(funcFn).toBeCalledTimes(0);
    expect(funcResult).toBe(true);
  });
});

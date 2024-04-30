import { some, isNumber, isString, times } from '../src';

describe('some', () => {
  it('basic', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(some(arr, (item) => item % 2 === 0)).toBe(true);
    expect(some(arr, (item) => item < 3)).toBe(true);
    expect(some(arr, (item) => item > 6)).toBe(false);
    expect(some(arr, isNumber)).toBe(true);
    expect(some(arr)).toBe(true);
  });

  it('不传第二个参数，默认返回元素自身的值', () => {
    const arr = [1, null, undefined, false, 2, 3];
    expect(some(arr)).toBe(true);

    const fn = jest.fn((item) => item); // 模拟默认第二个参数，用于测试
    some(arr, fn);
    expect(fn).toBeCalledTimes(1);

    const obj = { a: 1, b: false, c: 2 };
    expect(some(obj)).toBe(true);

    const objFn = jest.fn((value) => value); // 模拟默认第二个参数，用于测试
    some(obj, objFn);
    expect(objFn).toBeCalledTimes(1);
  });

  it('对象', () => {
    const obj = { one: 1, two: 2, three: 3 };
    expect(some(obj, (item) => item % 2 === 0)).toBe(true);
    expect(some(obj, (item) => item > 1)).toBe(true);
    expect(some(obj, (item) => item > 0)).toBe(true);
    expect(some(obj, isString)).toBe(false);
  });

  it('字符串', () => {
    expect(some('abc', (item) => item !== 'b')).toBe(true);
    expect(some('abc', (item) => item === 'd')).toBe(false);
    expect(some('abc', isString)).toBe(true);
  });

  it('迭代次数', () => {
    const fn = jest.fn();
    const arr = times(1000);
    some(arr, fn);
    expect(fn).toBeCalledTimes(1000);
  });

  it('迭代函数显示返回 false ，终止迭代', () => {
    const arr = times(1000);
    const fn = jest.fn((num: number) => {
      return num === 499;
    });
    some(arr, fn);
    expect(fn).toBeCalledTimes(500);

    const obj = { a: 1, b: 2, c: 3 };
    const objFn = jest.fn((value: number, key: string) => {
      return key === 'b';
    });
    some(obj, objFn);
    expect(objFn).toBeCalledTimes(2);
  });

  it('带 length 的普通对象，视为类数组对象', () => {
    // 错误的类数组对象
    const obj = { a: 1, b: 2, length: 2 };
    const fn = jest.fn((item) => item);
    const objResult = some(obj, fn);
    expect(fn).toBeCalledTimes(2);
    expect(objResult).toBe(false);

    // 正常的类数组对象
    const obj2 = { 0: 'a', 1: 'b', length: 2 };
    const fn2 = jest.fn((item) => item);
    const obj2Result = some(obj2, fn2);
    expect(fn2).toBeCalledTimes(1);
    expect(obj2Result).toBe(true);
  });

  it('不支持的数据类型 Map,Set,number,null,undefined,function 等，返回 true', () => {
    const mapFn = jest.fn((item) => item);
    const mapResult = some(
      new Map([
        ['foo', 'bar'],
        ['baz', 'a']
      ]),
      mapFn
    );
    expect(mapFn).toBeCalledTimes(0);
    expect(mapResult).toBe(false);

    const setFn = jest.fn((item) => item);
    const setResult = some(new Set(['bar', 'foo', 'baz']), setFn);
    expect(setFn).toBeCalledTimes(0);
    expect(setResult).toBe(false);

    const numFn = jest.fn((item) => item);
    // @ts-ignore
    const numResult = some(12345, numFn);
    expect(numFn).toBeCalledTimes(0);
    expect(numResult).toBe(false);

    const nullFn = jest.fn((item) => item);
    const nullResult = some(null, nullFn);
    expect(nullFn).toBeCalledTimes(0);
    expect(nullResult).toBe(false);

    const undefFn = jest.fn((item) => item);
    const undefResult = some(undefined, undefFn);
    expect(undefFn).toBeCalledTimes(0);
    expect(undefResult).toBe(false);

    function foo(a: number) {
      return a;
    }
    const funcFn = jest.fn((item) => item);
    const funcResult = some(foo, funcFn);
    expect(funcFn).toBeCalledTimes(0);
    expect(funcResult).toBe(false);
  });
});

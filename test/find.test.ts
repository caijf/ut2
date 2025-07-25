import { find, isNumber, isString, list } from '../src';

describe('find', () => {
  it('basic', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(find(arr, (item) => item % 2 === 0)).toBe(2);
    expect(find(arr, (item) => item < 3)).toBe(1);
    expect(find(arr, (item) => item > 6)).toBeUndefined();
    expect(find(arr, isNumber)).toBe(1);
    expect(find(arr)).toBe(1);
  });

  it('不传第二个参数，默认返回元素自身的值', () => {
    const arr = [1, null, undefined, false, 2, 3];
    expect(find(arr)).toBe(1);

    const fn = jest.fn((item) => item); // 模拟默认第二个参数，用于测试
    find(arr, fn);
    expect(fn).toHaveBeenCalledTimes(1);

    const obj = { a: 1, b: false, c: 2 };
    expect(find(obj)).toBe(1);

    const objFn = jest.fn((value) => value); // 模拟默认第二个参数，用于测试
    find(obj, objFn);
    expect(objFn).toHaveBeenCalledTimes(1);
  });

  it('对象', () => {
    const obj = { one: 1, two: 2, three: 3 };
    expect(find(obj, (item) => item % 2 === 0)).toBe(2);
    expect(find(obj, (item) => item > 1)).toBe(2);
    expect(find(obj, (item) => item > 0)).toBe(1);
    expect(find(obj, isString)).toBeUndefined();
  });

  it('字符串', () => {
    expect(find('abc', (item) => item !== 'b')).toBe('a');
    expect(find('abc', (item) => item === 'd')).toBeUndefined();
    expect(find('abc', isString)).toBe('a');
  });

  it('迭代次数', () => {
    const fn = jest.fn();
    const arr = list(1000);
    find(arr, fn);
    expect(fn).toHaveBeenCalledTimes(1000);
  });

  it('迭代函数显示返回 false ，终止迭代', () => {
    const arr = list(1000);
    const fn = jest.fn((num: number) => {
      return num === 499;
    });
    find(arr, fn);
    expect(fn).toHaveBeenCalledTimes(500);

    const obj = { a: 1, b: 2, c: 3 };
    const objFn = jest.fn((value: number, key: string) => {
      return key === 'b';
    });
    find(obj, objFn);
    expect(objFn).toHaveBeenCalledTimes(2);
  });

  it('带 length 的普通对象，视为类数组对象', () => {
    // 错误的类数组对象
    const obj = { a: 1, b: 2, length: 2 };
    const fn = jest.fn((item) => item);
    const objResult = find(obj, fn);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(objResult).toBeUndefined();

    // 正常的类数组对象
    const obj2 = { 0: 'a', 1: 'b', length: 2 };
    const fn2 = jest.fn((item) => item);
    const obj2Result = find(obj2, fn2);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(obj2Result).toBe('a');
  });

  it('不支持的数据类型 Map,Set,number,null,undefined,function 等', () => {
    const mapFn = jest.fn((item) => item);
    const mapResult = find(
      new Map([
        ['foo', 'bar'],
        ['baz', 'a']
      ]),
      mapFn
    );
    expect(mapFn).toHaveBeenCalledTimes(0);
    expect(mapResult).toBeUndefined();

    const setFn = jest.fn((item) => item);
    const setResult = find(new Set(['bar', 'foo', 'baz']), setFn);
    expect(setFn).toHaveBeenCalledTimes(0);
    expect(setResult).toBeUndefined();

    const numFn = jest.fn((item) => item);
    // @ts-ignore
    const numResult = find(12345, numFn);
    expect(numFn).toHaveBeenCalledTimes(0);
    expect(numResult).toBeUndefined();

    const nullFn = jest.fn((item) => item);
    const nullResult = find(null, nullFn);
    expect(nullFn).toHaveBeenCalledTimes(0);
    expect(nullResult).toBeUndefined();

    const undefFn = jest.fn((item) => item);
    const undefResult = find(undefined, undefFn);
    expect(undefFn).toHaveBeenCalledTimes(0);
    expect(undefResult).toBeUndefined();

    function foo(a: number) {
      return a;
    }
    const funcFn = jest.fn((item) => item);
    const funcResult = find(foo, funcFn);
    expect(funcFn).toHaveBeenCalledTimes(0);
    expect(funcResult).toBeUndefined();
  });
});

import { map, times } from '../src';

describe('map', () => {
  it('basic', () => {
    const arr = [1, 2, 3];
    expect(map(arr, (item) => item * 3)).toEqual([3, 6, 9]);
    expect(map(arr)).toEqual([1, 2, 3]);
  });

  it('不传第二个参数，默认返回元素自身的值', () => {
    const arr = [1, null, undefined, false, 2, 3];
    expect(map(arr)).toEqual(arr);

    const fn = jest.fn((item) => item); // 模拟默认第二个参数，用于测试
    map(arr, fn);
    expect(fn).toBeCalledTimes(6);

    const obj = { a: 1, b: false, c: 2 };
    expect(map(obj)).toEqual([1, false, 2]);

    const objFn = jest.fn((value) => value); // 模拟默认第二个参数，用于测试
    map(obj, objFn);
    expect(objFn).toBeCalledTimes(3);
  });

  it('对象', () => {
    const obj = { one: 1, two: 2, three: 3 };
    expect(map(obj, (item) => item * 3)).toEqual([3, 6, 9]);
    expect(map(obj)).toEqual([1, 2, 3]);
  });

  it('字符串', () => {
    expect(map('abc')).toEqual(['a', 'b', 'c']);
    expect(map('abc', (item) => item.repeat(2))).toEqual(['aa', 'bb', 'cc']);
  });

  it('迭代次数', () => {
    const fn = jest.fn();
    const arr = times(1000);
    map(arr, fn);
    expect(fn).toBeCalledTimes(1000);
  });

  it('迭代函数显示返回 false ，不会终止迭代', () => {
    const arr = times(1000);
    const fn = jest.fn((num: number) => {
      return num === 499;
    });
    map(arr, fn);
    expect(fn).toBeCalledTimes(1000);

    const obj = { a: 1, b: 2, c: 3 };
    const objFn = jest.fn((value: number, key: string) => {
      return key === 'b';
    });
    map(obj, objFn);
    expect(objFn).toBeCalledTimes(3);
  });

  it('带 length 的普通对象，视为类数组对象', () => {
    // 错误的类数组对象
    const obj = { a: 1, b: 2, length: 2 };
    const fn = jest.fn((item) => item);
    const objResult = map(obj, fn);
    expect(fn).toBeCalledTimes(2);
    expect(objResult).toEqual([undefined, undefined]);

    // 正常的类数组对象
    const obj2 = { 0: 'a', 1: 'b', length: 2 };
    const fn2 = jest.fn((item) => item);
    const obj2Result = map(obj2, fn2);
    expect(fn2).toBeCalledTimes(2);
    expect(obj2Result).toEqual(['a', 'b']);
  });

  it('不支持的数据类型 Map,Set,number,null,undefined,function 等，返回 true', () => {
    const mapFn = jest.fn((item) => item);
    const mapResult = map(
      new Map([
        ['foo', 'bar'],
        ['baz', 'a']
      ]),
      mapFn
    );
    expect(mapFn).toBeCalledTimes(0);
    expect(mapResult).toEqual([]);

    const setFn = jest.fn((item) => item);
    const setResult = map(new Set(['bar', 'foo', 'baz']), setFn);
    expect(setFn).toBeCalledTimes(0);
    expect(setResult).toEqual([]);

    const numFn = jest.fn((item) => item);
    // @ts-ignore
    const numResult = map(12345, numFn);
    expect(numFn).toBeCalledTimes(0);
    expect(numResult).toEqual([]);

    const nullFn = jest.fn((item) => item);
    const nullResult = map(null, nullFn);
    expect(nullFn).toBeCalledTimes(0);
    expect(nullResult).toEqual([]);

    const undefFn = jest.fn((item) => item);
    // @ts-ignore
    const undefResult = map(undefined, undefFn);
    expect(undefFn).toBeCalledTimes(0);
    expect(undefResult).toEqual([]);

    function foo(a: number) {
      return a;
    }
    const funcFn = jest.fn((item) => item);
    const funcResult = map(foo, funcFn);
    expect(funcFn).toBeCalledTimes(0);
    expect(funcResult).toEqual([]);
  });
});

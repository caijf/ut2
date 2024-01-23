import { filter, times } from '../src';

describe('filter', () => {
  it('basic', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(filter(arr, (item) => item % 2 === 0)).toEqual([2, 4, 6]);
    expect(filter(arr, (item) => item < 3)).toEqual([1, 2]);
    expect(filter(arr, (item) => item > 3)).toEqual([4, 5, 6]);
  });

  it('不传第二个参数，默认返回元素自身的值', () => {
    const arr = [1, null, undefined, false, 2, 3];
    expect(filter(arr)).toEqual([1, 2, 3]);

    const fn = jest.fn((item) => item); // 模拟默认第二个参数，用于测试
    filter(arr, fn);
    expect(fn).toBeCalledTimes(6);

    const obj = { a: 1, b: false, c: 2 };
    expect(filter(obj)).toEqual([1, 2]);

    const objFn = jest.fn((value) => value); // 模拟默认第二个参数，用于测试
    filter(obj, objFn);
    expect(objFn).toBeCalledTimes(3);
  });

  it('对象', () => {
    const obj = { one: 1, two: 2, three: 3 };
    expect(filter(obj, (item) => item % 2 === 0)).toEqual([2]);
  });

  it('字符串', () => {
    expect(filter('abc', (item) => item !== 'b')).toEqual(['a', 'c']);
  });

  it('迭代次数', () => {
    const fn = jest.fn();
    const arr = times(1000);
    filter(arr, fn);
    expect(fn).toBeCalledTimes(1000);
  });

  it('迭代函数显示返回 false ，不会终止迭代', () => {
    const arr = times(1000);
    const fn = jest.fn((num: number) => {
      if (num === 499) {
        return false;
      }
    });
    filter(arr, fn);
    expect(fn).toBeCalledTimes(1000);

    const obj = { a: 1, b: 2, c: 3 };
    const objFn = jest.fn((value: number, key: string) => {
      if (key === 'b') {
        return false;
      }
    });
    filter(obj, objFn);
    expect(objFn).toBeCalledTimes(3);
  });

  it('带 length 的普通对象，视为类数组对象', () => {
    // 错误的类数组对象
    const obj = { a: 1, b: 2, length: 2 };
    const fn = jest.fn((item) => item);
    const objResult = filter(obj, fn);
    expect(fn).toBeCalledTimes(2);
    expect(objResult).toEqual([]);

    // 正常的类数组对象
    const obj2 = { 0: 'a', 1: 'b', length: 2 };
    const fn2 = jest.fn((item) => item);
    const obj2Result = filter(obj2, fn2);
    expect(fn2).toBeCalledTimes(2);
    expect(obj2Result).toEqual(['a', 'b']);
  });

  it('不支持的数据类型 Map,Set,number,null,undefined,function 等', () => {
    const mapFn = jest.fn();
    const map = new Map([
      ['foo', 'bar'],
      ['baz', 'a']
    ]);
    const mapResult = filter(map, (...args) => {
      mapFn(...args);
    });
    expect(mapFn).toBeCalledTimes(0);
    expect(mapResult).toEqual([]);

    const setFn = jest.fn();
    const set = new Set(['bar', 'foo', 'baz']);
    const setResult = filter(set, (...args) => {
      setFn(...args);
    });
    expect(setFn).toBeCalledTimes(0);
    expect(setResult).toEqual([]);

    const numFn = jest.fn();
    const num = 12345;
    // @ts-ignore
    const numResult = filter(num, (...args) => {
      numFn(...args);
    });
    expect(numFn).toBeCalledTimes(0);
    expect(numResult).toEqual([]);

    const nullFn = jest.fn();
    const nullResult = filter(null, (...args) => {
      nullFn(...args);
    });
    expect(nullFn).toBeCalledTimes(0);
    expect(nullResult).toEqual([]);

    const undefFn = jest.fn();
    // @ts-ignore
    const undefResult = filter(undefined, (...args) => {
      undefFn(...args);
    });
    expect(undefFn).toBeCalledTimes(0);
    expect(undefResult).toEqual([]);

    function foo(a: number) {
      return a;
    }
    const funcFn = jest.fn();
    const funcResult = filter(foo, (...args) => {
      funcFn(...args);
    });
    expect(funcFn).toBeCalledTimes(0);
    expect(funcResult).toEqual([]);
  });
});

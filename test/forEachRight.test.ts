import { forEachRight, times } from '../src';
import { symbol } from './_utils';

describe('forEachRight', () => {
  it('basic', () => {
    const arr = [1, 2, 3];
    forEachRight(arr, (item, index, array) => {
      expect(arr).toBe(array);
      expect(arr).toContain(item);
      expect(item).toBe(index + 1);
    });

    let answers: number[] = [];
    forEachRight(arr, (item) => {
      answers.push(item * 5);
    });
    expect(answers).toEqual([15, 10, 5]);

    answers = [];
    forEachRight(arr, (item) => answers.push(item));
    expect(answers).toEqual(arr.reverse());
  });

  it('不传第二个参数，如果迭代的值为 false 终止迭代', () => {
    const arr = [1, null, undefined, false, 2, 3];
    forEachRight(arr);

    const fn = jest.fn((item) => item); // 模拟默认第二个参数，用于测试
    forEachRight(arr, fn);
    expect(fn).toBeCalledTimes(3);

    const obj = { a: 1, b: false, c: 2 };
    forEachRight(obj);

    const objFn = jest.fn((value) => value); // 模拟默认第二个参数，用于测试
    forEachRight(obj, objFn);
    expect(objFn).toBeCalledTimes(2);
  });

  it('迭代对象', () => {
    const keys: any[] = [];
    const values: any[] = [];

    forEachRight({ foo: 'bar', baz: 1, [symbol]: 'abc' }, (value, key) => {
      values.push(value);
      keys.push(key);
    });
    expect(keys).toEqual([symbol, 'baz', 'foo']);
    expect(values).toEqual(['abc', 1, 'bar']);
  });

  it('迭代字符串', () => {
    const keys: any[] = [];
    const values: any[] = [];
    forEachRight('abc', (item, i) => {
      keys.push(i);
      values.push(item);
    });
    expect(keys).toEqual([2, 1, 0]);
    expect(values).toEqual(['c', 'b', 'a']);
  });

  it('迭代次数', () => {
    const fn = jest.fn();
    const arr = times(1000);
    forEachRight(arr, fn);
    expect(fn).toBeCalledTimes(1000);
  });

  it('迭代函数显示返回 false ，终止迭代', () => {
    const arr = times(1000);
    const fn = jest.fn((num: number) => {
      if (num === 499) {
        return false;
      }
    });
    forEachRight(arr, fn);
    expect(fn).toBeCalledTimes(501);

    const obj = { a: 1, b: 2, c: 3 };
    const objFn = jest.fn((value: number, key: string) => {
      if (key === 'b') {
        return false;
      }
    });
    forEachRight(obj, objFn);
    expect(objFn).toBeCalledTimes(2);
  });

  it('带 length 的普通对象，视为类数组对象', () => {
    // 错误的类数组对象
    const obj = { a: 1, b: 2, length: 2 };
    const fn = jest.fn((value) => {
      expect(value).toBeUndefined();
    });
    const objResult = forEachRight(obj, fn);
    expect(fn).toBeCalledTimes(2);
    expect(objResult).toBe(obj);

    // 正常的类数组对象
    const obj2 = { 0: 'a', 1: 'b', length: 2 };
    const fn2 = jest.fn((value) => {
      expect(value).not.toBeUndefined();
    });
    const obj2Result = forEachRight(obj2, fn2);
    expect(fn2).toBeCalledTimes(2);
    expect(obj2Result).toBe(obj2);
  });

  it('不支持的数据类型 Map,Set,number,null,undefined,function 等', () => {
    const mapFn = jest.fn();
    const map = new Map([
      ['foo', 'bar'],
      ['baz', 'a']
    ]);
    const mapResult = forEachRight(map, (...args) => {
      mapFn(...args);
    });
    expect(mapFn).toBeCalledTimes(0);
    expect(mapResult).toBe(map);

    const setFn = jest.fn();
    const set = new Set(['bar', 'foo', 'baz']);
    const setResult = forEachRight(set, (...args) => {
      setFn(...args);
    });
    expect(setFn).toBeCalledTimes(0);
    expect(setResult).toBe(set);

    const numFn = jest.fn();
    const num = 12345;
    // @ts-ignore
    const numResult = forEachRight(num, (...args) => {
      numFn(...args);
    });
    expect(numFn).toBeCalledTimes(0);
    expect(numResult).toBe(num);

    const nullFn = jest.fn();
    const nullResult = forEachRight(null, (...args) => {
      nullFn(...args);
    });
    expect(nullFn).toBeCalledTimes(0);
    expect(nullResult).toBeNull();

    const undefFn = jest.fn();
    const undefResult = forEachRight(undefined, (...args) => {
      undefFn(...args);
    });
    expect(undefFn).toBeCalledTimes(0);
    expect(undefResult).toBeUndefined();

    function foo(a: number) {
      return a;
    }
    const funcFn = jest.fn();
    const funcResult = forEachRight(foo, (...args) => {
      funcFn(...args);
    });
    expect(funcFn).toBeCalledTimes(0);
    expect(funcResult).toBe(foo);
  });
});

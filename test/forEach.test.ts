import { forEach, times } from '../src';
import { symbol } from './_utils';

describe('forEach', () => {
  it('basic', () => {
    const arr = [1, 2, 3];
    forEach(arr, (item, index, array) => {
      expect(arr).toBe(array);
      expect(arr).toContain(item);
      expect(item).toBe(index + 1);
    });

    let answers: number[] = [];
    forEach(arr, (item) => {
      answers.push(item * 5);
    });
    expect(answers).toEqual([5, 10, 15]);

    answers = [];
    forEach(arr, (item) => answers.push(item));
    expect(answers).toEqual(arr);
  });

  it('不传第二个参数，如果迭代的值为 false 终止迭代', () => {
    const arr = [1, null, undefined, false, 2, 3];
    forEach(arr);

    const fn = jest.fn((item) => item); // 模拟默认第二个参数，用于测试
    forEach(arr, fn);
    expect(fn).toBeCalledTimes(4);

    const obj = { a: 1, b: false, c: 2 };
    forEach(obj);

    const objFn = jest.fn((value) => value); // 模拟默认第二个参数，用于测试
    forEach(obj, objFn);
    expect(objFn).toBeCalledTimes(2);
  });

  it('迭代对象', () => {
    const keys: any[] = [];
    const values: any[] = [];

    forEach({ foo: 'bar', baz: 1, [symbol]: 'abc' }, (value, key) => {
      values.push(value);
      keys.push(key);
    });
    expect(keys).toEqual(['foo', 'baz', symbol]);
    expect(values).toEqual(['bar', 1, 'abc']);
  });

  it('迭代字符串', () => {
    const keys: any[] = [];
    const values: any[] = [];
    forEach('abc', (item, i) => {
      keys.push(i);
      values.push(item);
    });
    expect(keys).toEqual([0, 1, 2]);
    expect(values).toEqual(['a', 'b', 'c']);
  });

  it('迭代次数', () => {
    const fn = jest.fn();
    const arr = times(1000);
    forEach(arr, fn);
    expect(fn).toBeCalledTimes(1000);
  });

  it('迭代函数显示返回 false ，终止迭代', () => {
    const arr = times(1000);
    const fn = jest.fn((num: number) => {
      if (num === 499) {
        return false;
      }
    });
    forEach(arr, fn);
    expect(fn).toBeCalledTimes(500);

    const obj = { a: 1, b: 2, c: 3 };
    const objFn = jest.fn((value: number, key: string) => {
      if (key === 'b') {
        return false;
      }
    });
    forEach(obj, objFn);
    expect(objFn).toBeCalledTimes(2);
  });

  it('带 length 的普通对象，视为类数组对象', () => {
    // 错误的类数组对象
    const obj = { a: 1, b: 2, length: 2 };
    const fn = jest.fn((value) => {
      expect(value).toBeUndefined();
    });
    const objResult = forEach(obj, fn);
    expect(fn).toBeCalledTimes(2);
    expect(objResult).toBe(obj);

    // 正常的类数组对象
    const obj2 = { 0: 'a', 1: 'b', length: 2 };
    const fn2 = jest.fn((value) => {
      expect(value).not.toBeUndefined();
    });
    const obj2Result = forEach(obj2, fn2);
    expect(fn2).toBeCalledTimes(2);
    expect(obj2Result).toBe(obj2);
  });

  it('不支持的数据类型 Map,Set,number,null,undefined,function 等', () => {
    const mapFn = jest.fn();
    const map = new Map([
      ['foo', 'bar'],
      ['baz', 'a']
    ]);
    const mapResult = forEach(map, (...args) => {
      mapFn(...args);
    });
    expect(mapFn).toBeCalledTimes(0);
    expect(mapResult).toBe(map);

    const setFn = jest.fn();
    const set = new Set(['bar', 'foo', 'baz']);
    const setResult = forEach(set, (...args) => {
      setFn(...args);
    });
    expect(setFn).toBeCalledTimes(0);
    expect(setResult).toBe(set);

    const numFn = jest.fn();
    const num = 12345;
    // @ts-ignore
    const numResult = forEach(num, (...args) => {
      numFn(...args);
    });
    expect(numFn).toBeCalledTimes(0);
    expect(numResult).toBe(num);

    const nullFn = jest.fn();
    const nullResult = forEach(null, (...args) => {
      nullFn(...args);
    });
    expect(nullFn).toBeCalledTimes(0);
    expect(nullResult).toBeNull();

    const undefFn = jest.fn();
    const undefResult = forEach(undefined, (...args) => {
      undefFn(...args);
    });
    expect(undefFn).toBeCalledTimes(0);
    expect(undefResult).toBeUndefined();

    function foo(a: number) {
      return a;
    }
    const funcFn = jest.fn();
    const funcResult = forEach(foo, (...args) => {
      funcFn(...args);
    });
    expect(funcFn).toBeCalledTimes(0);
    expect(funcResult).toBe(foo);
  });
});

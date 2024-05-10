import { noop, reduce, times } from '../src';
import { symbol } from './_utils';

describe('reduce', () => {
  it('basic', () => {
    const arr = [1, 2, 3];
    const result1 = reduce(
      arr,
      (accumulator, current) => {
        return accumulator + current;
      },
      0
    );
    expect(result1).toBe(6);

    const result2 = reduce(
      arr,
      (accumulator, current) => {
        return accumulator + current * 3;
      },
      0
    );
    expect(result2).toBe(18);
  });

  it('只有一个参数，默认返回第一个参数值', () => {
    expect(reduce([1, 2, 3])).toBe(1);
    expect(reduce([null, 2, 3])).toBeNull();
    expect(reduce([undefined, 2, 3])).toBeUndefined();
    expect(reduce({ a: 1, b: 2, c: 3 })).toBe(1);
  });

  it('没有第三个参数时，第一个参数值作为初始值，且少一次迭代', () => {
    const arr = [1, 2, 3];
    const fn1 = jest.fn();
    let first1: any;
    const result1 = reduce(
      arr,
      (accumulator, current) => {
        fn1();
        if (first1 === undefined) {
          first1 = accumulator;
        }
        return accumulator + current;
      },
      0
    );
    expect(fn1).toBeCalledTimes(3);
    expect(first1).toBe(0);
    expect(result1).toBe(6);

    const fn2 = jest.fn();
    let first2: any;
    const result2 = reduce(arr, (accumulator, current) => {
      fn2();
      if (first2 === undefined) {
        first2 = accumulator;
      }
      return accumulator + current;
    });
    expect(fn2).toBeCalledTimes(2);
    expect(first2).toBe(1);
    expect(result2).toBe(result1);
  });

  it('空值迭代返回 默认值 或 undefined', () => {
    // @ts-ignore
    expect(reduce(null, noop, 100)).toBe(100);
    expect(reduce([], noop, void 0)).toBeUndefined();
    // 没有初始值时，第一个参数作为初始值
    // @ts-ignore
    expect(reduce([1], noop)).toBe(1);
    expect(reduce([], noop)).toBeUndefined();
    expect(reduce(null, noop)).toBeUndefined();
  });

  it('如果迭代返回值为 false 不会终止迭代', () => {
    const arr = [1, null, undefined, false, 2, 3];
    expect(reduce(arr)).toBe(1);

    const fn = jest.fn((item) => item); // 模拟默认第二个参数，用于测试
    reduce(arr, fn);
    expect(fn).toBeCalledTimes(5);

    const obj = { a: 1, b: false, c: 2 };
    expect(reduce(obj)).toBe(1);

    const objFn = jest.fn((value) => value); // 模拟默认第二个参数，用于测试
    reduce(obj, objFn);
    expect(objFn).toBeCalledTimes(2);
  });

  it('迭代对象', () => {
    const keys: any[] = [];
    const values: any[] = [];

    const arr: any[] = [];

    reduce(
      { foo: 'bar', baz: 1, [symbol]: 'abc' },
      (accumulator, value, key) => {
        values.push(value);
        keys.push(key);
        accumulator.push({ [value]: key });
        return accumulator;
      },
      arr
    );
    expect(keys).toEqual(['foo', 'baz', symbol]);
    expect(values).toEqual(['bar', 1, 'abc']);
    expect(arr).toEqual([{ bar: 'foo' }, { '1': 'baz' }, { abc: symbol }]);
  });

  it('迭代字符串', () => {
    const keys: any[] = [];
    const values: any[] = [];
    const result = reduce(
      'abc',
      (accumulator, item, i) => {
        keys.push(i);
        values.push(item);
        return item;
      },
      ''
    );
    expect(keys).toEqual([0, 1, 2]);
    expect(values).toEqual(['a', 'b', 'c']);
    expect(result).toBe('c');
  });

  it('迭代次数', () => {
    const fn = jest.fn();
    const arr = times(1000);
    reduce(arr, fn);
    expect(fn).toBeCalledTimes(999);

    fn.mockReset();
    reduce(arr, fn, 0);
    expect(fn).toBeCalledTimes(1000);
  });

  it('带 length 的普通对象，视为类数组对象', () => {
    // 错误的类数组对象
    const obj = { a: 1, b: 2, length: 2 };
    const fn = jest.fn((value) => {
      expect(value).toBeUndefined();
    });
    const objResult = reduce(obj, fn);
    expect(fn).toBeCalledTimes(1);
    expect(objResult).toBeUndefined();

    // 正常的类数组对象
    const obj2 = { 0: 'a', 1: 'b', length: 2 };
    const fn2 = jest.fn((value) => {
      expect(value).not.toBeUndefined();
    });
    const obj2Result = reduce(obj2, fn2);
    expect(fn2).toBeCalledTimes(1);
    expect(obj2Result).toBeUndefined();
  });

  it('不支持的数据类型 Map,Set,number,null,undefined,function 等', () => {
    const mapFn = jest.fn();
    const map = new Map([
      ['foo', 'bar'],
      ['baz', 'a']
    ]);
    const mapResult = reduce(map, mapFn);
    expect(mapFn).toBeCalledTimes(0);
    expect(mapResult).toBeUndefined();

    const setFn = jest.fn();
    const set = new Set(['bar', 'foo', 'baz']);
    const setResult = reduce(set, setFn);
    expect(setFn).toBeCalledTimes(0);
    expect(setResult).toBeUndefined();

    const numFn = jest.fn();
    const num = 12345;
    // @ts-ignore
    const numResult = reduce(num, numFn);
    expect(numFn).toBeCalledTimes(0);
    expect(numResult).toBeUndefined();

    const nullFn = jest.fn();
    const nullResult = reduce(null, nullFn);
    expect(nullFn).toBeCalledTimes(0);
    expect(nullResult).toBeUndefined();

    const undefFn = jest.fn();
    const undefResult = reduce(undefined, undefFn);
    expect(undefFn).toBeCalledTimes(0);
    expect(undefResult).toBeUndefined();

    function foo(a: number) {
      return a;
    }
    const funcFn = jest.fn();
    const funcResult = reduce(foo, funcFn as any);
    expect(funcFn).toBeCalledTimes(0);
    expect(funcResult).toBeUndefined();
  });
});

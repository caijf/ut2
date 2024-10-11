import { noop, reduceRight, list } from '../src';
import { symbol } from './_utils';

describe('reduceRight', () => {
  it('basic', () => {
    const arr = [1, 2, 3];
    const result1 = reduceRight(
      arr,
      (accumulator, current) => {
        return accumulator + current;
      },
      0
    );
    expect(result1).toBe(6);

    const result2 = reduceRight(
      arr,
      (accumulator, current) => {
        return accumulator + current * 3;
      },
      0
    );
    expect(result2).toBe(18);
  });

  it('只有一个参数，默认返回最后一个参数值', () => {
    expect(reduceRight([1, 2, 3])).toBe(3);
    expect(reduceRight([2, 3, null])).toBeNull();
    expect(reduceRight([2, 3, undefined])).toBeUndefined();
    expect(reduceRight({ a: 1, b: 2, c: 3 })).toBe(3);
  });

  it('没有第三个参数时，最后一个参数值作为初始值，且少一次迭代', () => {
    const arr = [1, 2, 3];
    const fn1 = jest.fn();
    let first1: any;
    const result1 = reduceRight(
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
    const result2 = reduceRight(arr, (accumulator, current) => {
      fn2();
      if (first2 === undefined) {
        first2 = accumulator;
      }
      return accumulator + current;
    });
    expect(fn2).toBeCalledTimes(2);
    expect(first2).toBe(3);
    expect(result2).toBe(result1);
  });

  it('空值迭代返回 默认值 或 undefined', () => {
    // @ts-ignore
    expect(reduceRight(null, noop, 100)).toBe(100);
    expect(reduceRight([], noop, void 0)).toBeUndefined();
    // 没有初始值时，第一个参数作为初始值
    // @ts-ignore
    expect(reduceRight([1], noop)).toBe(1);
    expect(reduceRight([], noop)).toBeUndefined();
    expect(reduceRight(null, noop)).toBeUndefined();
  });

  it('如果迭代返回值为 false 不会终止迭代', () => {
    const arr = [1, null, undefined, false, 2, 3];
    expect(reduceRight(arr)).toBe(3);

    const fn = jest.fn((item) => item); // 模拟默认第二个参数，用于测试
    reduceRight(arr, fn);
    expect(fn).toBeCalledTimes(5);

    const obj = { a: 1, b: false, c: 2 };
    expect(reduceRight(obj)).toBe(2);

    const objFn = jest.fn((value) => value); // 模拟默认第二个参数，用于测试
    reduceRight(obj, objFn);
    expect(objFn).toBeCalledTimes(2);
  });

  it('迭代对象', () => {
    const keys: any[] = [];
    const values: any[] = [];

    const arr: any[] = [];

    reduceRight(
      { foo: 'bar', baz: 1, [symbol]: 'abc' },
      (accumulator, value, key) => {
        values.push(value);
        keys.push(key);
        accumulator.push({ [value]: key });
        return accumulator;
      },
      arr
    );
    expect(keys).toEqual([symbol, 'baz', 'foo']);
    expect(values).toEqual(['abc', 1, 'bar']);
    expect(arr).toEqual([{ abc: symbol }, { '1': 'baz' }, { bar: 'foo' }]);
  });

  it('迭代字符串', () => {
    const keys: any[] = [];
    const values: any[] = [];
    const result = reduceRight(
      'abc',
      (accumulator, item, i) => {
        keys.push(i);
        values.push(item);
        return item;
      },
      ''
    );
    expect(keys).toEqual([2, 1, 0]);
    expect(values).toEqual(['c', 'b', 'a']);
    expect(result).toBe('a');
  });

  it('迭代次数', () => {
    const fn = jest.fn();
    const arr = list(1000);
    reduceRight(arr, fn);
    expect(fn).toBeCalledTimes(999);

    fn.mockReset();
    reduceRight(arr, fn, 0);
    expect(fn).toBeCalledTimes(1000);
  });

  it('带 length 的普通对象，视为类数组对象', () => {
    // 错误的类数组对象
    const obj = { a: 1, b: 2, length: 2 };
    const fn = jest.fn((value) => {
      expect(value).toBeUndefined();
    });
    const objResult = reduceRight(obj, fn);
    expect(fn).toBeCalledTimes(1);
    expect(objResult).toBeUndefined();

    // 正常的类数组对象
    const obj2 = { 0: 'a', 1: 'b', length: 2 };
    const fn2 = jest.fn((value) => {
      expect(value).not.toBeUndefined();
    });
    const obj2Result = reduceRight(obj2, fn2);
    expect(fn2).toBeCalledTimes(1);
    expect(obj2Result).toBeUndefined();
  });

  it('不支持的数据类型 Map,Set,number,null,undefined,function 等', () => {
    const mapFn = jest.fn();
    const map = new Map([
      ['foo', 'bar'],
      ['baz', 'a']
    ]);
    const mapResult = reduceRight(map, mapFn);
    expect(mapFn).toBeCalledTimes(0);
    expect(mapResult).toBeUndefined();

    const setFn = jest.fn();
    const set = new Set(['bar', 'foo', 'baz']);
    const setResult = reduceRight(set, setFn);
    expect(setFn).toBeCalledTimes(0);
    expect(setResult).toBeUndefined();

    const numFn = jest.fn();
    const num = 12345;
    // @ts-ignore
    const numResult = reduceRight(num, numFn);
    expect(numFn).toBeCalledTimes(0);
    expect(numResult).toBeUndefined();

    const nullFn = jest.fn();
    const nullResult = reduceRight(null, nullFn);
    expect(nullFn).toBeCalledTimes(0);
    expect(nullResult).toBeUndefined();

    const undefFn = jest.fn();
    const undefResult = reduceRight(undefined, undefFn);
    expect(undefFn).toBeCalledTimes(0);
    expect(undefResult).toBeUndefined();

    function foo(a: number) {
      return a;
    }
    const funcFn = jest.fn();
    const funcResult = reduceRight(foo, funcFn as any);
    expect(funcFn).toBeCalledTimes(0);
    expect(funcResult).toBeUndefined();
  });
});

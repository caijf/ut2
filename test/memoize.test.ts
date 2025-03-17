import { identity, isEqual, memoize } from '../src';

describe('memoize', () => {
  const add = jest.fn((a: number, b: number) => a + b);
  const memoizedAdd = memoize(add);

  beforeEach(() => {
    add.mockClear();
    memoizedAdd.clear();
  });

  it('缓存函数的结果', () => {
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(add).toHaveBeenCalledTimes(1);

    expect(memoizedAdd(1, 2)).toBe(3);
    expect(add).toHaveBeenCalledTimes(1);

    const obj = { a: 1, b: 2 };
    const memoizedValues = memoize(Object.values);
    expect(memoizedValues(obj)).toEqual([1, 2]);
    obj.b = 3;
    expect(memoizedValues(obj)).toEqual([1, 2]);
  });

  it('不同参数的调用', () => {
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(memoizedAdd(1, 3)).toBe(4);
    expect(add).toHaveBeenCalledTimes(2);
  });

  it('相同参数，但不同上下文的调用', () => {
    const obj1 = {};
    const obj2 = {};
    expect(memoizedAdd.call(obj1, 1, 2)).toBe(3);
    expect(memoizedAdd.call(obj2, 1, 2)).toBe(3);
    expect(add).toHaveBeenCalledTimes(2);
  });

  it('参数长度不匹配的情况', () => {
    // @ts-ignore
    expect(memoizedAdd(1)).toBeNaN();
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(add).toHaveBeenCalledTimes(2);
  });

  it('缓存大小限制', () => {
    const memoizedAdd2 = memoize(add, { max: 2 });
    expect(memoizedAdd2(1, 2)).toBe(3);
    expect(memoizedAdd2(2, 3)).toBe(5);
    expect(memoizedAdd2(3, 4)).toBe(7); // 超过最大缓存，最旧的缓存被移除
    expect(memoizedAdd2(1, 2)).toBe(3); // 需要重新计算
    expect(add).toHaveBeenCalledTimes(4);
  });

  it('自定义比较函数', () => {
    const memoizedAdd = memoize(add, {
      isEqual: (arg1, arg2) => arg1[0] === arg2[0]
    });
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(memoizedAdd(1, 3)).toBe(3); // 使用自定义比较函数
  });

  it('深比较', () => {
    const shallowMemoized = memoize(identity);
    const deepMemoized = memoize(identity, { isEqual });
    const result1 = shallowMemoized({ foo: 'bar' });
    const result2 = deepMemoized({ foo: 'bar' });
    expect(result1 === result2).toBe(false);

    const result3 = deepMemoized({ foo: 'bar' });
    const result4 = deepMemoized({ foo: 'bar' });
    expect(result3 === result4).toBe(true);
  });

  it('无效函数', () => {
    // @ts-ignore
    const memoizeNull = memoize(null);
    expect(() => memoizeNull()).toThrow();
  });

  it('无参数调用', () => {
    const func = jest.fn(() => 'no args');
    const memoizedFunc = memoize(func);
    expect(memoizedFunc()).toBe('no args');
    expect(memoizedFunc()).toBe('no args');
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('清空缓存', () => {
    expect(memoizedAdd(1, 2)).toBe(3);
    memoizedAdd.clear();
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(add).toHaveBeenCalledTimes(2);

    const obj = { a: 1, b: 2 };
    const deepMemoizedValues = memoize(Object.values, { isEqual });
    expect(deepMemoizedValues(obj)).toEqual([1, 2]);
    deepMemoizedValues.clear();
    obj.b = 3;
    expect(deepMemoizedValues(obj)).toEqual([1, 3]);
  });
});

import { equalArrayLike } from '../src';

describe('equalArrayLike 函数测试', () => {
  test('当两个类数组相等时，返回 true', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(equalArrayLike(arr1, arr2)).toBe(true);
  });
  test('当两个类数组长度不相等时，返回 false', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2];
    expect(equalArrayLike(arr1, arr2)).toBe(false);
  });
  test('当两个类数组的对应值不相等时，返回 false', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 4];
    expect(equalArrayLike(arr1, arr2)).toBe(false);
  });
  test('当两个类数组相等但类型不同（如数字和字符串）时，返回 false', () => {
    const arr1 = [1, 2, 3];
    const arr2 = ['1', '2', '3'];
    expect(equalArrayLike(arr1, arr2)).toBe(false);
  });
  test('不同类型的类数组，对应值相等时，返回 true', () => {
    const arr1 = [1, 2, 3];
    const notArray = { 0: 1, 1: 2, 2: 3, length: 3 };
    expect(equalArrayLike(arr1, notArray)).toBe(true);

    expect(equalArrayLike(['a', 'b'], 'ab')).toBe(true);
  });
  test('当两个类数组相等，且 strictCheck 为 true 时，区分 0 和 -0', () => {
    const arr1 = [0, -0];
    const arr2 = [-0, 0];
    expect(equalArrayLike(arr1, arr2, true)).toBe(false);
  });
  test('当两个类数组相等，且 strictCheck 为 false 时，不区分 0 和 -0', () => {
    const arr1 = [0, -0];
    const arr2 = [-0, 0];
    expect(equalArrayLike(arr1, arr2, false)).toBe(true);
  });
  test('测试空类数组时，返回 true', () => {
    const arr1: any[] = [];
    const arr2: any[] = [];
    expect(equalArrayLike(arr1, arr2)).toBe(true);
  });
  test('测试类数组与 null 时，返回 false', () => {
    const arr1 = [1, 2, 3];
    // @ts-ignore
    expect(equalArrayLike(arr1, null)).toBe(false);
  });
  test('测试类数组与 undefined 时，返回 false', () => {
    const arr1 = [1, 2, 3];
    // @ts-ignore
    expect(equalArrayLike(arr1, undefined)).toBe(false);
  });
  test('两个相等的值始终返回 true', () => {
    // @ts-ignore
    expect(equalArrayLike(null, null)).toBe(true);
    // @ts-ignore
    expect(equalArrayLike(undefined, undefined)).toBe(true);
    // @ts-ignore
    expect(equalArrayLike(NaN, NaN)).toBe(true);
    const obj1 = {};
    const obj2 = obj1;
    // @ts-ignore
    expect(equalArrayLike(obj1, obj2)).toBe(true);
  });
});

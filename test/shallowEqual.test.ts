import { shallowEqual } from '../src';

describe('shallowEqual 函数测试', () => {
  test('两个相等的值始终返回 true', () => {
    expect(shallowEqual(1, 1)).toBe(true);
    expect(shallowEqual('foo', 'foo')).toBe(true);
    expect(shallowEqual(null, null)).toBe(true);
    expect(shallowEqual(undefined, undefined)).toBe(true);
    expect(shallowEqual(NaN, NaN)).toBe(true);
    const obj1 = {};
    const obj2 = obj1;
    expect(shallowEqual(obj1, obj2)).toBe(true);
  });
  test('当两个对象相等时，返回 true', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(shallowEqual(arr1, arr2)).toBe(true);

    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    expect(shallowEqual(obj1, obj2)).toBe(true);
  });
  test('当两个对象属性长度不相等时，返回 false', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2];
    expect(shallowEqual(arr1, arr2)).toBe(false);

    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2 };
    expect(shallowEqual(obj1, obj2)).toBe(false);
  });
  test('当两个对象的对应值不相等时，返回 false', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 4];
    expect(shallowEqual(arr1, arr2)).toBe(false);

    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, c: 4 };
    expect(shallowEqual(obj1, obj2)).toBe(false);
  });
  test('当两个对象相等但类型不同（如数字和字符串）时，返回 false', () => {
    const arr1 = [1, 2, 3];
    const arr2 = ['1', '2', '3'];
    expect(shallowEqual(arr1, arr2)).toBe(false);

    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: '1', b: '2', c: '3' };
    expect(shallowEqual(obj1, obj2)).toBe(false);
  });
  test('不同类型的对象，对应值相等时，返回 false', () => {
    const arr = [1, 2, 3];
    const obj = { 0: 1, 1: 2, 2: 3, length: 3 };
    expect(shallowEqual(arr, obj)).toBe(false);
    expect(shallowEqual(['a', 'b'], 'ab')).toBe(false);
  });
  test('测试空对象时，返回 true', () => {
    const arr1: any[] = [];
    const arr2: any[] = [];
    expect(shallowEqual(arr1, arr2)).toBe(true);

    const obj1 = {};
    const obj2 = {};
    expect(shallowEqual(obj1, obj2)).toBe(true);
  });
  test('测试对象与 null 时，返回 false', () => {
    expect(shallowEqual([], null)).toBe(false);
    expect(shallowEqual({}, null)).toBe(false);
  });
  test('测试对象与 undefined 时，返回 false', () => {
    expect(shallowEqual([], undefined)).toBe(false);
    expect(shallowEqual({}, undefined)).toBe(false);
  });
  test('区分 0 和 -0', () => {
    const arr1 = [0, -0];
    const arr2 = [-0, 0];
    expect(shallowEqual(arr1, arr2, true)).toBe(false);

    const obj1 = { a: 0, b: -0 };
    const obj2 = { a: -0, b: 0 };
    expect(shallowEqual(obj1, obj2, true)).toBe(false);
  });
  test('不区分 0 和 -0', () => {
    const arr1 = [0, -0];
    const arr2 = [-0, 0];
    expect(shallowEqual(arr1, arr2, false)).toBe(true);

    const obj1 = { a: 0, b: -0 };
    const obj2 = { a: -0, b: 0 };
    expect(shallowEqual(obj1, obj2, false)).toBe(true);
  });
});

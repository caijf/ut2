import { has } from '../src';
import { symbol } from './_utils';

describe('has', () => {
  it('对象自身的属性，返回 true', () => {
    const obj = { a: 1 };
    expect(has(obj, 'a')).toBe(true);
  });

  it('对象属性不存在，返回 false', () => {
    const obj = { a: 1 };
    expect(has(obj, 'b')).toBe(false);
    expect(has(obj, 'b.0')).toBe(false);
    expect(has(obj, ['b', 'c'])).toBe(false);
  });

  it('对象继承的属性，返回 false', () => {
    const obj = { a: 1 };
    expect(has(obj, 'toString')).toBe(false);
    expect(has(obj, 'a.toFixed')).toBe(false);
  });

  it('验证 symbol 类型键的处理', () => {
    const obj = { [symbol]: 1 };
    expect(has(obj, symbol)).toBe(true);
  });

  it('验证数组对象数字索引的处理', () => {
    const array = [1, 2, 3, 'a', 'b'];
    expect(has(array, 1)).toBe(true);
    expect(has(array, '4')).toBe(true);
    expect(has(array, 10)).toBe(false);
  });

  it('验证嵌套属性访问的处理', () => {
    const obj = { a: { b: { c: [{ d: 'foo' }] } } };
    expect(has(obj, 'a.b.c')).toBe(true);
    expect(has(obj, 'a.b.c[0].d')).toBe(true);
    expect(has(obj, 'a.b.c.0.d')).toBe(true);
    expect(has(obj, 'a.b.c.1')).toBe(false);

    expect(has(obj, ['a', 'b', 'c'])).toBe(true);
    expect(has(obj, ['a', 'b', 'c', '0', 'd'])).toBe(true);
    expect(has(obj, ['a', 'b', 'c', 0, 'd'])).toBe(true);
    expect(has(obj, ['a', 'b', 'c', 1])).toBe(false);
  });

  it('验证混合类型路径的处理', () => {
    const obj = { a: { 1: { [symbol]: 'foo' } } };
    expect(has(obj, ['a', '1', symbol])).toBe(true);
  });

  it('验证被删除的属性，返回 false', () => {
    const obj = { a: 1 };
    // @ts-ignore
    delete obj.a;
    expect(has(obj, 'a')).toBe(false);
  });

  it('对象自身的属性值为 undefined ， 返回 true', () => {
    expect(has({ a: undefined }, 'a')).toBe(true);
  });

  it('对象继承的属性值为 undefined ， 返回 false', () => {
    const obj = Object.create({ a: undefined });
    expect(has(obj, 'a')).toBe(false);
  });

  it('属性路径为空，返回 false', () => {
    expect(has({ a: 1 }, [])).toBe(false);
    expect(has({ a: 1 }, '')).toBe(false);
  });

  it('对象是 null 或 undefined ，返回 false', () => {
    expect(has(null, 'a')).toBe(false);
    expect(has(undefined, 'a')).toBe(false);
  });

  it('验证路径存在但最后一级属性不存在的处理', () => {
    const obj = { a: { b: {} } };
    expect(has(obj, ['a', 'b', 'c'])).toBe(false);
  });

  it('验证完整路径', () => {
    const obj = { 'a.b': 1 };
    expect(has(obj, 'a.b')).toBe(true);
    expect(has(obj, ['a.b'])).toBe(true);
  });

  it('验证没有使用对象的 hasOwnProperty 方法', () => {
    const obj = { hasOwnProperty: null, a: 1 };
    expect(has(obj, 'hasOwnProperty')).toBe(true);
  });

  it('验证特殊路径', () => {
    const obj = { null: 1, undefined: 2, fn: 3, '[object Object]': 4 };
    function fn() {}
    fn.toString = () => 'fn';

    // @ts-ignore
    expect(has(obj, [null])).toBe(true);
    // @ts-ignore
    expect(has(obj, [undefined])).toBe(true);
    // @ts-ignore
    expect(has(obj, [fn])).toBe(true);
    // @ts-ignore
    expect(has(obj, [{}])).toBe(true);
  });

  it('验证 -0 和 0', () => {
    const obj = { '-0': 1, '0': 2 };
    expect(has(obj, '-0')).toBe(true);
    expect(has(obj, '0')).toBe(true);
  });
});

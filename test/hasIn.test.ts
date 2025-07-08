import { hasIn } from '../src';
import { symbol } from './_utils';

describe('hasIn', () => {
  it('对象自身的属性，返回 true', () => {
    const obj = { a: 1 };
    expect(hasIn(obj, 'a')).toBe(true);
  });

  it('对象属性不存在，返回 false', () => {
    const obj = { a: 1 };
    expect(hasIn(obj, 'b')).toBe(false);
    expect(hasIn(obj, 'b.0')).toBe(false);
    expect(hasIn(obj, ['b', 'c'])).toBe(false);
  });

  it('对象继承的属性，返回 true', () => {
    const obj = { a: 1 };
    expect(hasIn(obj, 'toString')).toBe(true);
    expect(hasIn(obj, 'a.toFixed')).toBe(true);
  });

  it('验证 symbol 类型键的处理', () => {
    const obj = { [symbol]: 1 };
    expect(hasIn(obj, symbol)).toBe(true);
  });

  it('验证数组对象数字索引的处理', () => {
    const array = [1, 2, 3, 'a', 'b'];
    expect(hasIn(array, 1)).toBe(true);
    expect(hasIn(array, '4')).toBe(true);
    expect(hasIn(array, 10)).toBe(false);
  });

  it('验证嵌套属性访问的处理', () => {
    const obj = { a: { b: { c: [{ d: 'foo' }] } } };
    expect(hasIn(obj, 'a.b.c')).toBe(true);
    expect(hasIn(obj, 'a.b.c[0].d')).toBe(true);
    expect(hasIn(obj, 'a.b.c.0.d')).toBe(true);
    expect(hasIn(obj, 'a.b.c.1')).toBe(false);

    expect(hasIn(obj, ['a', 'b', 'c'])).toBe(true);
    expect(hasIn(obj, ['a', 'b', 'c', '0', 'd'])).toBe(true);
    expect(hasIn(obj, ['a', 'b', 'c', 0, 'd'])).toBe(true);
    expect(hasIn(obj, ['a', 'b', 'c', 1])).toBe(false);
  });

  it('验证混合类型路径的处理', () => {
    const obj = { a: { 1: { [symbol]: 'foo' } } };
    expect(hasIn(obj, ['a', '1', symbol])).toBe(true);
  });

  it('验证被删除的属性，返回 false', () => {
    const obj = { a: 1 };
    // @ts-ignore
    delete obj.a;
    expect(hasIn(obj, 'a')).toBe(false);
  });

  it('对象自身的属性值为 undefined ， 返回 true', () => {
    expect(hasIn({ a: undefined }, 'a')).toBe(true);
  });

  it('对象继承的属性值为 undefined ， 返回 true', () => {
    const obj = Object.create({ a: undefined });
    expect(hasIn(obj, 'a')).toBe(true);
  });

  it('属性路径为空，返回 false', () => {
    expect(hasIn({ a: 1 }, [])).toBe(false);
    expect(hasIn({ a: 1 }, '')).toBe(false);
  });

  it('对象是 null 或 undefined ，返回 false', () => {
    expect(hasIn(null, 'a')).toBe(false);
    expect(hasIn(undefined, 'a')).toBe(false);
  });

  it('验证路径存在但最后一级属性不存在的处理', () => {
    const obj = { a: { b: {} } };
    expect(hasIn(obj, ['a', 'b', 'c'])).toBe(false);
  });

  it('验证完整路径', () => {
    const obj = { 'a.b': 1 };
    expect(hasIn(obj, 'a.b')).toBe(true);
    expect(hasIn(obj, ['a.b'])).toBe(true);
  });

  it('验证没有使用对象的 hasOwnProperty 方法', () => {
    const obj = { hasOwnProperty: null, a: 1 };
    expect(hasIn(obj, 'hasOwnProperty')).toBe(true);
  });

  it('验证特殊路径', () => {
    const obj = { null: 1, undefined: 2, fn: 3, '[object Object]': 4 };
    function fn() {}
    fn.toString = () => 'fn';

    // @ts-ignore
    expect(hasIn(obj, [null])).toBe(true);
    // @ts-ignore
    expect(hasIn(obj, [undefined])).toBe(true);
    // @ts-ignore
    expect(hasIn(obj, [fn])).toBe(true);
    // @ts-ignore
    expect(hasIn(obj, [{}])).toBe(true);
  });

  it('验证 -0 和 0', () => {
    const obj = { '-0': 1, '0': 2 };
    expect(hasIn(obj, '-0')).toBe(true);
    expect(hasIn(obj, '0')).toBe(true);
  });
});

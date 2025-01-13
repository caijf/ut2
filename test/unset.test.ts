import { forEach, unset } from '../src';
import { symbol } from './_utils';

describe('unset', () => {
  test('应删除属性值', () => {
    const obj = { a: 1, b: 2 };
    expect(unset(obj, 'a')).toBe(true);
    expect(obj).toEqual({ b: 2 });
  });

  test('应保留`0`的符号', () => {
    forEach([-0, Object(-0)], (v) => {
      const obj = { '-0': 'a', 0: 'b' };
      expect(unset(obj, v)).toBe(true);
      expect(obj).toEqual({ 0: 'b' });
    });

    forEach([0, Object(0)], (v) => {
      const obj = { '-0': 'a', 0: 'b' };
      expect(unset(obj, v)).toBe(true);
      expect(obj).toEqual({ '-0': 'a' });
    });
  });

  test('应删除 symbol 属性值', () => {
    const obj = { [symbol]: 1 };
    expect(unset(obj, symbol)).toBe(true);
    expect(symbol in obj).toBe(false);
  });

  test('应删除深层级属性值', () => {
    forEach(['a.b', ['a', 'b']], (v) => {
      const obj = { a: { b: 1 } };
      expect(unset(obj, v)).toBe(true);
      expect(obj).toEqual({ a: {} });
    });
  });

  test('应处理复杂路径', () => {
    const paths = ['a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g', ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']];
    forEach(paths, (v) => {
      const obj = { a: { '-1.23': { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: 1 } } } } } } } };
      expect(unset(obj, v)).toBe(true);
      expect(obj).toEqual({ a: { '-1.23': { '["b"]': { c: { "['d']": { '\ne\n': { f: {} } } } } } } });
    });
  });

  test('当没有匹配路径时返回`true`', () => {
    const obj = { a: { b: { c: 1 } } };
    forEach(['z', 'a.z', 'a.b.z', 'a.b.c.z'], (v) => {
      expect(unset(obj, v)).toBe(true);
    });
  });

  test('当对象为空时不报错', () => {
    expect(unset(null, 'a.b')).toBe(true);
    expect(unset(null, ['a', 'b'])).toBe(true);
    expect(unset(undefined, 'a.b')).toBe(true);
    expect(unset(undefined, ['a', 'b'])).toBe(true);
  });

  test('删除非普通对象的路径', () => {
    forEach(['constructor.prototype.a', ['constructor', 'prototype', 'a']], (v) => {
      // @ts-ignore
      Number.prototype.a = 1;
      expect('a' in Number.prototype).toBe(true);
      expect(unset(0, v)).toBe(true);
      expect('a' in Number.prototype).toBe(false);
    });
  });

  test('不可配置属性返回`false`', () => {
    const obj = {};
    Object.defineProperty(obj, 'a', {
      configurable: false,
      value: 1,
      writable: true,
      enumerable: true
    });
    try {
      // ref: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Cant_delete
      unset(obj, 'a');
    } catch {
      /* empty */
    }
    expect(obj).toEqual({ a: 1 });
  });
});

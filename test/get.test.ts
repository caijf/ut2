import { forEach, get } from '../src';
import { symbol } from './_utils';

describe('get', () => {
  test('获取字符串属性的值', () => {
    const obj = { a: 1 };
    expect(get(obj, 'a')).toBe(1);
    expect(get(obj, ['a'])).toBe(1);
  });

  test('保留 `0` 的符号', () => {
    const obj = { '-0': 'a', 0: 'b' };
    expect(get(obj, -0)).toBe('a');
    expect(get(obj, Object(-0))).toBe('a');
    expect(get(obj, 0)).toBe('b');
    expect(get(obj, Object(0))).toBe('b');
  });

  test('获取 symbol 属性的值', () => {
    const obj = { [symbol]: 1 };
    expect(get(obj, symbol)).toBe(1);
    expect(get(obj, [symbol])).toBe(1);
  });

  test('获取深层级属性的值', () => {
    const obj = { a: { b: 2 } };
    expect(get(obj, 'a.b')).toBe(2);
    expect(get(obj, ['a', 'b'])).toBe(2);
  });

  test('获取键为路径的值', () => {
    const obj = { 'a.b': 1, a: { b: 2 } };
    expect(get(obj, 'a.b')).toBe(1);
    expect(get(obj, ['a.b'])).toBe(1);
  });

  test('不应将数组转为字符串', () => {
    const obj = { 'a,b,c': 1, a: { b: { c: 2 } } };
    expect(get(obj, ['a', 'b', 'c'])).toBe(2);
  });

  test('应不忽略空括号', () => {
    const obj = { a: { '': 1 } };
    expect(get(obj, 'a[]')).toBe(1);
  });

  test('应处理空路径', () => {
    const obj = { '': { '': 1 } };
    expect(get(obj, ['', ''])).toBe(1);
    // @ts-ignore
    expect(get(obj, [[], ['']])).toBe(1);
  });

  test('应处理复杂路径', () => {
    const obj = { a: { '-1.23': { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: 1 } } } } } } } };
    expect(get(obj, 'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g')).toBe(1);
    expect(get(obj, ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g'])).toBe(1);
  });

  test('当对象为空时，返回 `undefined`', () => {
    expect(get(null, 'constructor')).toBeUndefined();
    expect(get(undefined, 'constructor')).toBeUndefined();
  });

  test('当深层级路径为空时，返回 `undefined`', () => {
    const obj = { a: { b: 1 } };
    expect(get(obj, 'a.c.d')).toBeUndefined();
  });

  test('当部分路径缺失时，返回 `undefined`', () => {
    const obj = { a: [undefined, null] };
    expect(get(obj, 'a[1].b.c')).toBeUndefined();
    expect(get(obj, ['a', '1', 'b', 'c'])).toBeUndefined();
  });

  test('应该返回 null 值', () => {
    const obj = { a: { b: null } };
    expect(get(obj, 'a.b')).toBe(null);
    expect(get(obj, ['a', 'b'])).toBe(null);
  });

  test('应该返回非普通对象的值', () => {
    // @ts-ignore
    Number.prototype.a = { b: 1 };
    expect(get(0, 'a.b')).toBe(1);
    expect(get(0, ['a', 'b'])).toBe(1);
    // @ts-ignore
    delete Number.prototype.a;

    expect(get(0, 'a.b')).toBeUndefined();
  });

  test('应在值为 `undefined` 时，返回 `defaultValue`', () => {
    const obj = { a: {} };
    const values = [true, new Date(), 1, /x/, 'a'];

    forEach(values, (v) => {
      expect(get(obj, 'a.b', v)).toBe(v);
    });
  });

  test('当路径为空时，返回 `defaultValue`', () => {
    expect(get({}, 'a.b', 'a')).toBe('a');
  });
});

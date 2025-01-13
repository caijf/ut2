import { isObject, noop, set } from '../src';

describe('set', () => {
  test('应正常设置属性值', () => {
    const obj = { a: 1 };
    const actual = set(obj, 'a', 2);
    expect(obj).toBe(actual);
    expect(obj).toEqual({ a: 2 });

    set(obj, ['a'], 3);
    expect(obj).toEqual({ a: 3 });
  });

  test('应与 `customizer` 函数一起工作', () => {
    const obj = { 0: {} };
    set(obj, '[0][1][2]', 3, (value) => (isObject(value) ? undefined : {}));
    expect(obj).toEqual({ 0: { 1: { 2: 3 } } });
  });

  test('应与 `customizer` 函数返回 `undefined` 一起工作', () => {
    const obj = {};
    set(obj, 'a[0].b.c', 4, noop);
    expect(obj).toEqual({ a: [{ b: { c: 4 } }] });
  });

  test('应保存 `0` 的符号', () => {
    const obj = {};
    expect(set(obj, -0, 'a')).toEqual({ '-0': 'a' });
    expect(set(obj, Object(-0), 'a')).toEqual({ '-0': 'a' });
    expect(set(obj, 0, 'b')).toEqual({ '-0': 'a', '0': 'b' });
    expect(set(obj, Object(0), 'b')).toEqual({ '-0': 'a', '0': 'b' });
  });

  test('应设置深层级属性值', () => {
    const obj = {};
    expect(set(obj, 'a.b', 1)).toEqual({ a: { b: 1 } });
    expect(set(obj, ['a', 'b'], 2)).toEqual({ a: { b: 2 } });
  });

  test('应设置键为路径的属性', () => {
    const obj = { 'a.b': 1 };
    set(obj, 'a.b', 2);
    expect(obj).toEqual({ 'a.b': 2 });

    set(obj, ['a.b'], 3);
    expect(obj).toEqual({ 'a.b': 3 });
  });

  test('不应将数组转为字符串', () => {
    const obj = { 'a,b,c': 1, a: { b: { c: 1 } } };
    set(obj, ['a', 'b', 'c'], 2);
    expect(obj).toEqual({ 'a,b,c': 1, a: { b: { c: 2 } } });
  });

  test('应不忽略空括号', () => {
    const obj = {};
    set(obj, 'a[]', 1);
    expect(obj).toEqual({ a: { '': 1 } });
  });

  test('应处理空路径', () => {
    const obj1 = {};
    set(obj1, ['', ''], 1);
    expect(obj1).toEqual({ '': { '': 1 } });

    const obj2 = {};
    // @ts-ignore
    set(obj2, [[], ['']], 1);
    expect(obj2).toEqual({ '': { '': 1 } });
  });

  test('应处理复杂路径', () => {
    const obj = { a: { '1.23': { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: 1 } } } } } } } };
    set(obj, 'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g', 1);
    expect(obj).toEqual({
      a: {
        '1.23': { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: 1 } } } } } },
        '-1.23': { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: 1 } } } } } }
      }
    });

    const obj2 = {};
    set(obj2, ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g'], 2);
    expect(obj2).toEqual({ a: { '-1.23': { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: 2 } } } } } } } });
  });

  test('应创建缺失路径部分', () => {
    const obj1 = {};
    set(obj1, 'a[1].b.c', 1);
    expect(obj1).toEqual({ a: [undefined, { b: { c: 1 } }] });

    const obj2 = {};
    set(obj2, ['a', '1', 'b', 'c'], 1);
    expect(obj2).toEqual({ a: [undefined, { b: { c: 1 } }] });
  });

  test('应在对象为空时不报错', () => {
    const obj1 = null;
    // @ts-ignore
    set(obj1, 'a.c', 1);
    expect(obj1).toEqual(null);

    const obj2 = undefined;
    // @ts-ignore
    set(obj2, 'a.c', 1);
    expect(obj2).toEqual(undefined);
  });

  test('应覆盖路径中的原值', () => {
    const obj = { a: '' };
    set(obj, 'a.b', 1);
    expect(obj).toEqual({ a: { b: 1 } });
  });

  test('不应为缺失的以数字开头的非索引属性名称创建数组', () => {
    const obj1 = {};
    set(obj1, '1a.2b.3c', 1);
    expect(obj1).toEqual({ '1a': { '2b': { '3c': 1 } } });

    const obj2 = {};
    set(obj2, ['1a', '2b', '3c'], 1);
    expect(obj2).toEqual({ '1a': { '2b': { '3c': 1 } } });
  });

  test('不应分配与其目的地相同的值', () => {
    const obj = {};
    let pass = true;
    Object.defineProperty(obj, 'a', {
      configurable: true,
      enumerable: true,
      get() {
        return 'a';
      },
      set() {
        pass = false;
      }
    });

    set(obj, 'a', 1);
    expect(pass).toBe(false);
    // @ts-ignore
    expect(obj.a).toBe('a');
  });
});

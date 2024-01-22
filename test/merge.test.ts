import { isBuffer, keys, keysIn, merge, noop } from '../src';
import { args } from './_utils';

describe('merge', () => {
  it('来源对象合并到目标对象', () => {
    expect(merge({}, { a: true, b: false })).toEqual({ a: true, b: false });
    expect(
      merge(
        {
          characters: [
            { name: 'barney', age: 36 },
            { name: 'fred', age: 40 }
          ]
        },
        { characters: [{ height: '5\'4"' }, { height: '5\'5"' }] }
      )
    ).toEqual({
      characters: [
        { name: 'barney', age: 36, height: '5\'4"' },
        { name: 'fred', age: 40, height: '5\'5"' }
      ]
    });
  });

  it('来源对象包含循环引用', () => {
    const object = {
      foo: { a: 1 },
      bar: { a: 2 }
    };
    const source = {
      foo: { b: { c: { d: {} } } },
      bar: { b: {} }
    };
    source.foo.b.c.d = source;
    source.bar.b = source.foo.b;

    const actual = merge(object, source);
    expect(actual.bar.b).toEqual(actual.foo.b);
    // @ts-ignore
    expect(actual.foo.b.c.d).toEqual(actual.foo.b.c.d.foo.b.c.d);
  });

  it('合并到函数对象', () => {
    function Foo() {}
    const source = { a: 1 };

    const actual = merge(Foo, source);

    expect(actual).toBe(Foo);
    expect(actual.a).toBe(1);
  });

  it('合并源对象属性中的 `function`', () => {
    const fn = function () {};
    const actual = merge({ prop: fn }, { prop: {} });
    expect(actual).toEqual({ prop: {} });

    const actual2 = merge({ prop: {} }, { prop: fn });
    expect(actual2).toEqual({ prop: fn });
  });

  it('合并到非普通对象值', () => {
    function Foo() {}
    const object = new (Foo as any)();
    const actual = merge(object, { a: 1 });

    expect(actual).toBe(object);
    expect(actual.a).toBe(1);
  });

  it('合并到参数对象', () => {
    const object = { value: args };
    const source = { value: { '3': 4 } };
    const actual = merge(object, source);
    expect(actual).toEqual(object);
  });

  it('合并 `null` 值', () => {
    expect(merge({ a: 1 }, { a: null })).toEqual({ a: null });
  });

  it('合并特殊对象值', () => {
    function Foo() {}
    const values = [new (Foo as any)(), new Boolean(), new Date(), new Number(), new String(), new RegExp(''), Foo];

    values.map((item) => {
      const actual = merge({}, { a: item, b: { c: item } });
      expect(actual.a).toBe(item);
      expect(actual.b.c).toBe(item);
    });
  });

  it('合并 buffer 值', () => {
    const buffer = Buffer.from([1]);
    const actual = merge({}, { value: buffer });

    expect(isBuffer(actual.value)).toBe(true);
    expect(actual.value).toBe(buffer);
  });

  it('合并复杂对象，不扩充源对象', () => {
    expect(merge({ a: [4, 5] }, { a: [1, 2, 3] })).toEqual({ a: [1, 2, 3] });
    expect(merge({ a: [4, 5] }, { a: [1] })).toEqual({ a: [1, 5] });
    expect(merge({ a: [{ a: 1 }] }, { a: [{ b: 2 }] })).toEqual({ a: [{ a: 1, b: 2 }] });
    expect(merge({ a: [[1, 2, 3]] }, { a: [[3, 4]] })).toEqual({ a: [[3, 4, 3]] });
  });

  it('普通对象合并到非普通对象', () => {
    function Foo(this: any, object: object) {
      Object.assign(this, object);
    }

    const object = { a: 1 };
    const actual = merge(new (Foo as any)(), object);

    expect(actual instanceof Foo).toBe(true);
    expect(actual).toEqual(new (Foo as any)(object));
  });

  it('来源对象的 `undefined` 值不覆盖现有值', () => {
    expect(merge({ a: 1 }, { a: undefined, b: undefined })).toEqual({ a: 1, b: undefined });
    expect(merge([4, 5, 6], [1, undefined, 3])).toEqual([1, 5, 3]);
  });

  it('当来源对象和目标对象的值相等时，跳过合并', () => {
    const object = {};
    let pass = true;

    Object.defineProperty(object, 'a', {
      configurable: true,
      enumerable: true,
      get() {
        pass = false;
      },
      set() {
        pass = false;
      }
    });

    merge(object, object);
    expect(pass).toBe(true);
  });

  it('来源数据和目标数据不一致时将以来源数据为准', () => {
    const object = { a: { '1': 'y', b: 'z', length: 2 } };
    const actual = merge(object, { a: ['x'] });
    expect(actual).toEqual({ a: ['x'] });

    const actual2 = merge({ a: {} }, { a: [] });
    expect(actual2).toEqual({ a: [] });

    const actual3 = merge({ a: 'abc' }, { a: ['x', 'y', 'z'] });
    expect(actual3).toEqual({ a: ['x', 'y', 'z'] });
  });

  it('自定义赋值，返回 `undefined`', () => {
    const actual = merge({ a: { b: [1, 1] } }, { a: { b: [0] } }, noop);
    expect(actual).toEqual({ a: { b: [0, 1] } });

    const actual2 = merge({ a: { b: { c: 1 } } }, { a: { b: { d: 2 } } }, noop);
    expect(actual2).toEqual({ a: { b: { c: 1, d: 2 } } });
  });

  it('自定义赋值，合并数组', () => {
    const actual = merge({ a: { b: [0, 1] } }, { a: { b: [2] } }, (a, b) => {
      return Array.isArray(a) ? a.concat(b) : undefined;
    });
    expect(actual).toEqual({ a: { b: [0, 1, 2] } });
  });

  it('包含 `Symbol` 属性值', () => {
    function Foo(this: any) {
      this.a = 1;
      this[Symbol.for('a')] = 2;
    }
    Foo.prototype.b = 3;
    Foo.prototype[Symbol.for('b')] = 4;

    expect(merge({ a: 'a', [Symbol.for('a')]: 'a' }, new (Foo as any)())).toEqual({
      a: 1,
      b: 3,
      [Symbol.for('a')]: 2,
      [Symbol.for('b')]: 4
    });
  });

  it('目标对象不存在值，则迭代来源目标赋值给目标对象', () => {
    const a = { a: { b: 1 } };
    const b = { a: { b: 2 } };
    const c = merge({}, a);

    expect(c).toEqual(a);

    const d = merge(c, b);
    expect(d).toBe(c);
    expect(d).not.toEqual(a);
  });

  it('自定义获取对象键的方法', () => {
    function Foo(this: any) {
      this.a = 1;
      this[Symbol.for('a')] = 2;
    }
    Foo.prototype.b = 3;
    Foo.prototype[Symbol.for('b')] = 4;

    expect(merge({ a: 'a', [Symbol.for('a')]: 'a' }, new (Foo as any)(), undefined, keys)).toEqual({
      a: 1,
      [Symbol.for('a')]: 'a'
    });
    expect(merge({ a: 'a', [Symbol.for('a')]: 'a' }, new (Foo as any)(), undefined, keysIn)).toEqual({
      a: 1,
      [Symbol.for('a')]: 'a',
      b: 3
    });

    expect(merge({ a: 'a' }, new (Foo as any)(), undefined, keys)).toEqual({
      a: 1
    });
    expect(merge({ a: 'a' }, new (Foo as any)(), undefined, keysIn)).toEqual({
      a: 1,
      b: 3
    });
  });

  it('错误的参数', () => {
    const boolObj = Object(false);
    boolObj.a = true;
    expect(merge(false, { a: true })).toEqual(boolObj);
    expect(merge(undefined, { a: true })).toEqual({ a: true });
    expect(merge({ a: true }, undefined)).toEqual({ a: true });
  });
});

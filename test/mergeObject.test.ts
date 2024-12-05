import { mergeObject } from '../src';

describe('mergeObject', () => {
  it('basic', () => {
    expect(mergeObject({ c: 3 }, { e: 5 })).toEqual({ c: 3, e: 5 });
    expect(mergeObject({ a: 1 }, { a: undefined, b: undefined })).toEqual({ a: 1, b: undefined });
    expect(mergeObject({ a: 1 }, { a: undefined, b: undefined }, { c: 'x' })).toEqual({ a: 1, b: undefined, c: 'x' });
    expect(mergeObject({ foo: 42 }, { bar: 'baz' }, { growup: false })).toEqual({ foo: 42, bar: 'baz', growup: false });

    const source = {
      a: [{ b: 2 }, { d: 4 }]
    };
    const otherSource = {
      a: [{ c: 3 }, { e: 5 }]
    };
    const result = mergeObject({}, source, otherSource);
    expect(result).toEqual({ a: [{ c: 3 }, { e: 5 }] });

    // 来源对象无变化
    expect(source).toEqual({ a: [{ b: 2 }, { d: 4 }] });
  });

  it('来源对象合并到目标对象', () => {
    expect(mergeObject({}, { a: true, b: false })).toEqual({ a: true, b: false });
    expect(
      mergeObject(
        {
          characters: [
            { name: 'barney', age: 36 },
            { name: 'fred', age: 40 }
          ]
        },
        { characters: [{ height: '5\'4"' }, { height: '5\'5"' }] }
      )
    ).toEqual({
      characters: [{ height: '5\'4"' }, { height: '5\'5"' }]
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

    const actual = mergeObject({}, object, source);
    expect(actual.bar.b).toEqual(actual.foo.b);
    // @ts-ignore
    expect(actual.foo.b.c.d).toEqual(actual.foo.b.c.d.foo.b.c.d);
  });

  it('错误的参数', () => {
    const boolObj = Object(false);
    boolObj.a = true;
    expect(mergeObject(false, { a: true })).toEqual(boolObj);
    expect(mergeObject(undefined, { a: true })).toEqual({ a: true });
    expect(mergeObject({ a: true }, undefined)).toEqual({ a: true });
  });
});

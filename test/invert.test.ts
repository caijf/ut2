import { invert, isNumber, isString } from '../src';

describe('invert', () => {
  it('反转对象', () => {
    const obj = { a: 1, b: 2 };
    const actual = invert(obj);

    expect(actual).toEqual({ 1: 'a', 2: 'b' });
    expect(invert(actual)).toEqual({ a: '1', b: '2' });
  });

  it('值为 `Object.prototype` 上的属性', () => {
    const obj = { a: 'hasOwnProperty', b: 'constructor' };
    expect(invert(obj)).toEqual({ hasOwnProperty: 'a', constructor: 'b' });
  });

  it('含有 `length` 属性的对象', () => {
    const obj = { 0: 'a', 1: 'b', length: 2 };
    expect(invert(obj)).toEqual({ a: '0', b: '1', 2: 'length' });
  });

  it('自定义反转', () => {
    const obj = { foo: 'bar', baz: 42 };
    expect(invert(obj, isString)).toEqual({ bar: 'foo', baz: 42 });
    expect(invert(obj, isNumber)).toEqual({ foo: 'bar', 42: 'baz' });
    expect(invert(obj, (v, k) => k === 'foo')).toEqual({ bar: 'foo', baz: 42 });
  });

  it('值为特殊值', () => {
    const obj = { a: { a: 1 }, b: true, c: [123], d: Symbol.for('a'), e: () => {}, f: function () {}, g: NaN, h: undefined, i: null };
    expect(invert(obj)).toEqual({ '[object Object]': 'a', true: 'b', 123: 'c', [Symbol.for('a')]: 'd', '() => { }': 'e', 'function () { }': 'f', NaN: 'g', undefined: 'h', null: 'i' });
  });

  it('不包含继承的属性', () => {
    function Foo(this: any) {
      this.name = 'jeff';
    }
    Foo.prototype.age = 18;
    Foo.prototype.greet = function () {
      return 'hi ' + this.name;
    };

    expect(invert(new (Foo as any)())).toEqual({ jeff: 'name' });
  });

  it('错误参数', () => {
    expect(invert(undefined)).toEqual({});
    expect(invert(null)).toEqual({});
    expect(invert([])).toEqual({});
    expect(invert(function () {})).toEqual({});
    // @ts-expect-error
    expect(invert(1)).toEqual({});
    // @ts-expect-error
    expect(invert(false)).toEqual({});
    // @ts-expect-error
    expect(invert(NaN)).toEqual({});
  });
});

import { isPlainObject } from '../src';
import { args, falsy, noop, symbol } from './_utils';

describe('isPlainObject', () => {
  it('检测普通对象', () => {
    function Foo(this: { a: number; constructor: () => void }) {
      this.a = 1;
    }

    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
    expect(isPlainObject({ constructor: Foo })).toBe(true);
    expect(isPlainObject([1, 2, 3])).toBe(false);
    expect(isPlainObject(new (Foo as any)())).toBe(false);
  });

  it('对象的 [[Prototype]] 为 null ，返回 true', () => {
    const obj = Object.create(null);
    expect(isPlainObject(obj)).toBe(true);

    obj.constructor = Object.prototype.constructor;
    expect(isPlainObject(obj)).toBe(true);
  });

  it('对象包含 valueOf 属性 ，返回 ture', () => {
    expect(isPlainObject({ valueOf: 0 })).toBe(true);
  });

  it('对象包含一个自定义 `[[Prototype]]` 属性，返回 false', () => {
    expect(isPlainObject(Object.create({ a: 1 }))).toBe(false);
  });

  it('非对象返回 false', () => {
    const values = [...falsy, true, 'a', symbol, 1, noop, args, new Date(), new Error()];
    values.forEach((item) => {
      expect(isPlainObject(item)).toBe(false);
    });
  });

  it('对象包含一个只读的 `Symbol.toStringTag` 属性，返回 false', () => {
    const obj = {};
    Object.defineProperty(obj, Symbol.toStringTag, {
      // configurable: true,
      // enumerable: false,
      writable: false,
      value: 'a'
    });

    expect(isPlainObject(obj)).toBe(false);
  });

  it('没有突变的值', () => {
    const proto: any = {};
    proto[Symbol.toStringTag] = undefined;
    const obj = Object.create(proto);
    expect(isPlainObject(obj)).toBe(false);
  });
});

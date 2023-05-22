import { isEmpty } from '../../src';
import { args, toArgs, falsy, noop, symbol } from '../_utils';

describe('isEmpty', () => {
  it('corrent', () => {
    const values = [...falsy, [], {}];
    values.forEach((item) => {
      expect(isEmpty(item)).toBe(true);
    });

    expect(isEmpty(args)).toBe(true);
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(1)).toBe(true);
    expect(isEmpty(NaN)).toBe(true);
    expect(isEmpty(/x/)).toBe(true);
    expect(isEmpty(symbol)).toBe(true);
    // @ts-ignore
    expect(isEmpty()).toBe(true);
    expect(isEmpty(new Buffer(0))).toBe(true);
    expect(isEmpty(new Date())).toBe(true);
    expect(isEmpty(new Error())).toBe(true);
    expect(isEmpty(noop)).toBe(true);
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expect(isEmpty((a, b) => {})).toBe(true);
  });

  it('incorrent', () => {
    expect(isEmpty({ a: 1, b: 2 })).toBe(false);
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty('abc')).toBe(false);
    expect(isEmpty(new Buffer(1))).toBe(false);
    expect(isEmpty(toArgs([1, 2, 3]))).toBe(false);
  });

  it('对象带有 `length` 属性', () => {
    expect(isEmpty({ length: 0 })).toBe(false);
    expect(isEmpty({ length: '0' })).toBe(false);
  });

  it('原型对象', () => {
    function Foo() {}
    Foo.prototype = { constructor: Foo };

    expect(isEmpty(Foo.prototype)).toBe(true);

    Foo.prototype.a = 1;

    expect(isEmpty(Foo.prototype)).toBe(false);
  });

  it('Map/Set 对象', () => {
    const map = new Map();
    const set = new Set();

    expect(isEmpty(map)).toBe(true);
    expect(isEmpty(set)).toBe(true);

    map.set('a', 1);
    set.add(1);

    expect(isEmpty(map)).toBe(false);
    expect(isEmpty(set)).toBe(false);

    map.clear();
    set.clear();

    expect(isEmpty(map)).toBe(true);
    expect(isEmpty(set)).toBe(true);
  });

  it('对象的 `length` 属性值为负数 或 超出安全整数', () => {
    // 此处 new Foo 作为对象看待，而非类数组

    function Foo() {}
    Foo.prototype.length = -1;

    expect(isEmpty(new (Foo as any)())).toBe(true);

    Foo.prototype.length = Number.MAX_SAFE_INTEGER + 1;

    expect(isEmpty(new (Foo as any)())).toBe(true);
  });
});

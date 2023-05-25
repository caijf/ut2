/**
 * @jest-environment jsdom
 */
import { isElement } from '../src';
import { args, falsy, symbol, truthy } from './_utils';

describe('isElement', () => {
  it('corrent', () => {
    // console.log(document.b);
    expect(isElement(document.body)).toBe(true);
  });

  it('incorrent', () => {
    falsy.forEach((item) => {
      expect(isElement(item)).toBe(false);
    });

    truthy.forEach((item) => {
      expect(isElement(item)).toBe(false);
    });

    expect(isElement(args)).toBe(false);
    expect(isElement([1, 2, 3])).toBe(false);
    expect(isElement({ a: 1, b: 2 })).toBe(false);
    expect(isElement(new Error())).toBe(false);
    expect(isElement(/x/)).toBe(false);
    expect(isElement(symbol)).toBe(false);
  });

  it('非普通对象且 `nodeType=1`', () => {
    function Foo() {
      // @ts-ignore
      this.nodeType = 1;
    }

    expect(isElement(new (Foo as any)())).toBe(true);
  });

  it('普通对象', () => {
    expect(isElement({ nodeType: 1 })).toBe(false);
    expect(isElement({ nodeType: Object(1) })).toBe(false);
    expect(isElement({ nodeType: true })).toBe(false);
    expect(isElement({ nodeType: [1] })).toBe(false);
    expect(isElement({ nodeType: '1' })).toBe(false);
    expect(isElement({ nodeType: '001' })).toBe(false);
  });
});

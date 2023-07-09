import isPrototype from '../../../src/internals/isPrototype';

describe('isPrototype', () => {
  it('basic', () => {
    const obj = {};
    const func = function () {};

    expect(isPrototype(obj)).toBe(false);
    expect(isPrototype(func)).toBe(false);
    expect(isPrototype(Function.prototype)).toBe(false);

    expect(isPrototype(Object.prototype)).toBe(true);
    expect(isPrototype(func.prototype)).toBe(true);

    function Foo() {}
    expect(isPrototype(Foo.prototype)).toBe(true);
  });

  it('incorrect', () => {
    function Foo() {}
    Foo.prototype = {};
    Foo.prototype.constructor = undefined;
    expect(isPrototype(Foo.prototype)).toBe(false);
  });
});

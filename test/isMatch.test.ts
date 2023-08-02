import { isMatch, isString } from '../src';
import { noop, symbol } from './_utils';

describe('isMatch', () => {
  it('深比较', () => {
    const obj1 = { a: 1, b: 2, c: 3 };

    expect(isMatch(obj1, { a: 1 })).toBe(true);
    expect(isMatch(obj1, { b: 1 })).toBe(false);
    expect(isMatch(obj1, { a: 1, c: 3 })).toBe(true);
    expect(isMatch(obj1, { c: 3, d: 4 })).toBe(false);

    const obj2 = { a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 };
    expect(isMatch(obj2, { a: { b: { c: 1 } } })).toBe(true);

    const obj3 = { a: { b: [{ c: 1, d: 2 }, 3], e: { f: 3, g: 4 } } };
    expect(isMatch(obj3, { a: { b: [{ c: 1 }, 3], e: { f: 3 } } })).toBe(true);
    expect(isMatch(obj3, { a: { e: { g: 4 } } })).toBe(true);
    expect(isMatch(obj3, { a: { b: [{ c: 1 }] } })).toBe(false);

    const obj4 = { a: 1, b: -0 };
    expect(isMatch(obj4, { a: 1 })).toBe(true);
    expect(isMatch(obj4, { b: 0 })).toBe(true);
    expect(isMatch(obj4, { b: 0 }, undefined, true)).toBe(false);
    // 自定义比较
    function customizer(objValue: any, srcValue: any) {
      if (typeof objValue === 'string' && typeof srcValue === 'string') {
        return true;
      }
    }
    isMatch({ foo: 'a' }, { foo: 'b' }, customizer); // true
    isMatch({ foo: ['a'] }, { foo: ['b'] }, customizer); // true
    isMatch({ foo: 'a' }, { foo: 'b' }, customizer); // true
  });

  it('匹配继承的 `object` 属性', () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    expect(isMatch({ a: new (Foo as any)() }, { a: { b: 2 } }));
  });

  it('不匹配继承的 `source` 属性', () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    expect(isMatch({ a: 1 }, new (Foo as any)())).toBe(true);
  });

  it('函数，数组不是普通对象，不进行部分匹配', () => {
    function foo() {}
    foo.a = { b: 2, c: 3 };

    expect(isMatch(foo, { a: { b: 2 } })).toBe(false);
    expect(isMatch(foo, { a: { b: 2, c: 3 } })).toBe(false);

    const arr = [1, 2, 3];
    expect(isMatch(arr, [1])).toBe(false);
    expect(isMatch([{ a: { b: 2, c: 3 } }, 1], [{ a: { b: 2 } }])).toBe(false);
    expect(isMatch([{ a: { b: 2, c: 3 } }, 1], [{ a: { b: 2 } }, 1])).toBe(true);
  });

  it('匹配 `undefined` 值', () => {
    expect(isMatch({ a: 1 }, { b: undefined })).toBe(false);
    expect(isMatch({ a: 1, b: 1 }, { b: undefined })).toBe(false);
    expect(isMatch({ a: 1, b: undefined }, { b: undefined })).toBe(true);

    expect(isMatch({ a: { b: 2 } }, { a: { c: undefined } })).toBe(false);
    expect(isMatch({ a: { b: 2, c: 3 } }, { a: { c: undefined } })).toBe(false);
    expect(isMatch({ a: { b: 2, c: undefined } }, { a: { c: undefined } })).toBe(true);
  });

  it('非普通对象的对象类型中包含普通对象', () => {
    const obj1 = {
      a: [
        {
          a: {
            b: [1],
            c: 2
          },
          b: {
            c: 2
          }
        }
      ]
    };

    expect(isMatch(obj1, { a: [{ a: { b: [1] } }] })).toBe(true);
  });

  it('普通对象循环引用', () => {
    const obj1 = {};
    const obj2 = { o: obj1 };
    // @ts-ignore
    obj1.o = obj2;

    expect(isMatch(obj1, obj2)).toBe(true);
  });

  it('比较带有传递性的循环引用对象', () => {
    const obj1 = {};
    const obj2 = { a: obj1 };
    const obj3 = { a: obj2 };
    const obj4 = { a: obj3 };
    // @ts-ignore
    obj1.a = obj1;

    expect(isMatch(obj1, obj2)).toBe(true);
    expect(isMatch(obj2, obj3)).toBe(true);
    expect(isMatch(obj2, obj4)).toBe(true);
    expect(isMatch(obj3, obj4)).toBe(true);
    expect(isMatch(obj1, obj3)).toBe(true);
    expect(isMatch(obj1, obj4)).toBe(true);

    const a = {};
    // @ts-ignore
    a.a = a;

    expect(isMatch({ a: { a: { a: { a } } } }, obj4)).toBe(true);
    expect(isMatch(obj4, { a: { a: { a: { a } } } })).toBe(true);
  });

  it('空值匹配', () => {
    expect(isMatch({ a: 1 }, {})).toBe(true);
    expect(isMatch({ a: { b: 2 } }, {})).toBe(true);
    expect(isMatch({ a: [1] }, {})).toBe(true);

    // @ts-ignore
    expect(isMatch({}, null)).toBe(false);
    // @ts-ignore
    expect(isMatch(null, {})).toBe(false);
  });

  it('基本类型', () => {
    // @ts-ignore
    expect(isMatch(undefined, null)).toBe(false);
    // @ts-ignore
    expect(isMatch(null, undefined)).toBe(false);
    // @ts-ignore
    expect(isMatch(null, false)).toBe(false);
    // @ts-ignore
    expect(isMatch(1, '1')).toBe(false);
    // @ts-ignore
    expect(isMatch(0, 'a')).toBe(false);
    // @ts-ignore
    expect(isMatch(symbol, 'a')).toBe(false);

    // @ts-ignore
    expect(isMatch(null, null)).toBe(true);
    // @ts-ignore
    expect(isMatch(false, false)).toBe(true);
    // @ts-ignore
    expect(isMatch(undefined, undefined)).toBe(true);
    // @ts-ignore
    expect(isMatch(symbol, symbol)).toBe(true);
    // @ts-ignore
    expect(isMatch('a', 'a')).toBe(true);
    // @ts-ignore
    expect(isMatch(0, 0)).toBe(true);
  });

  it('自定义比较方法返回 `undefined`，处理匹配', () => {
    expect(isMatch({ a: 1 }, { a: 1 }, noop)).toBe(true);
    expect(isMatch({ a: 1 }, { a: 2 }, noop)).toBe(false);
  });

  it('自定义比较方法返回 `true`，不处理匹配', () => {
    function customizer(value: any) {
      return isString(value) || undefined;
    }
    expect(isMatch({ a: 'a' }, { a: 1 }, customizer)).toBe(true);
    expect(isMatch({ a: 'a' }, { a: [1, 2, 3] }, customizer)).toBe(true);
  });

  it('自定义比较方法返回 `false`，不处理匹配', () => {
    function customizer(value: any) {
      return isString(value) ? false : undefined;
    }
    expect(isMatch({ a: 'a' }, { a: 'a' }, customizer)).toBe(false);
  });

  it('自定义比较方法含有某个属性返回 `true`，不处理匹配', () => {
    function customizer(objValue: any, srcValue: any) {
      if (typeof objValue === 'object' && typeof srcValue === 'object' && 'a' in objValue && 'a' in srcValue) {
        return true;
      }
    }
    expect(isMatch({ a: 'a' }, { a: 'a' }, customizer)).toBe(true);
    expect(isMatch({ a: 'a' }, { a: 1 }, customizer)).toBe(true);
    expect(isMatch({ a: 'a' }, { a: [1, 2, 3] }, customizer)).toBe(true);
  });

  it('自定义比较方法不是一个函数，处理匹配', () => {
    expect(isMatch({ a: 'a' }, { a: 'a' }, false as any)).toBe(true);
    expect(isMatch({ a: 'a' }, { a: 1 }, false as any)).toBe(false);
    expect(isMatch({ a: 'a' }, { a: [1, 2, 3] }, false as any)).toBe(false);
  });

  it('自定义比较方法参数', () => {
    const argsList: any[] = [];
    const obj1: any = { a: [1, 2], b: null, c: 1 };
    const obj2: any = { a: [1, 2], b: null, c: 1 };

    const expected = [
      [obj1, obj2],
      [obj1.c, obj2.c, 'c', obj1, obj2],
      [obj1.b, obj2.b, 'b', obj1, obj2],
      [obj1.a, obj2.a, 'a', obj1, obj2],
      [obj1.a[1], obj2.a[1], 1, obj1.a, obj2.a],
      [obj1.a[0], obj2.a[0], 0, obj1.a, obj2.a]
    ];

    isMatch(obj1, obj2, function () {
      const length = arguments.length;
      // eslint-disable-next-line prefer-rest-params
      argsList.push(Array.from(arguments).slice(0, length - (length > 2 ? 2 : 0)));
    });

    expect(expected).toEqual(argsList);
  });

  it('不严格比较，部分值相等', () => {
    // 0 和 -0
    // @ts-ignore
    expect(isMatch(0, -0)).toBe(true);

    // 无效日期
    // @ts-ignore
    expect(isMatch(new Date(''), new Date(''))).toBe(true);
    // @ts-ignore
    expect(isMatch(new Date(''), new Date('abc'))).toBe(true);

    // 基本类型和包装基本类型
    // @ts-ignore
    expect(isMatch(1, Object(1))).toBe(true);
    // @ts-ignore
    expect(isMatch({ a: 1 }, { a: Object(1) })).toBe(true);
    // @ts-ignore
    expect(isMatch('a', Object('a'))).toBe(true);
  });

  it('严格比较，部分值不相等', () => {
    // -0 0不等于
    // @ts-ignore
    expect(isMatch(-0, 0, undefined, true)).toBe(false);
    expect(isMatch([-0], [0], undefined, true)).toBe(false);
    expect(isMatch({ a: -0 }, { a: 0 }, undefined, true)).toBe(false);

    // 无效日期不相等
    expect(isMatch(new Date(''), new Date(''), undefined, true)).toBe(false);
    expect(isMatch({ a: new Date('') }, { a: new Date('abc') }, undefined, true)).toBe(false);

    // 基本类型和包装基本类型不相等
    // @ts-ignore
    expect(isMatch(1, Object(1), undefined, true)).toBe(false);
    // @ts-ignore
    expect(isMatch({ a: 1 }, { a: Object(1) }, undefined, true)).toBe(false);
    // @ts-ignore
    expect(isMatch('abc', Object('abc'), undefined, true)).toBe(false);
    // @ts-ignore
    expect(isMatch(true, Object(true), undefined, true)).toBe(false);
    // @ts-ignore
    expect(isMatch(Symbol.for('a'), Object(Symbol.for('a')), undefined, true)).toBe(false);
  });
});

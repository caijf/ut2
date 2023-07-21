import { constant, difference, isEqual, isString } from '../src';
import { falsy, noop, symbol, toArgs, truthy } from './_utils';

describe('isEqual', () => {
  it('basic', () => {
    const value = { a: 1, b: -0 };
    const other = { a: 1, b: 0 };

    isEqual(value, other); // true
    value === other; // false

    // 严格比较
    isEqual(value, other, undefined, true); // false

    // 自定义比较
    function customizer(value: any, other: any) {
      if (typeof value === 'string' && typeof other === 'string') {
        return true;
      }
    }
    isEqual('a', 'b', customizer); // true
    isEqual(['a'], ['b'], customizer); // true
    isEqual({ foo: 'a' }, { foo: 'b' }, customizer); // true
  });

  it('比较基本类型', () => {
    // undefined null
    // @ts-ignore
    expect(isEqual()).toBe(true);
    // @ts-ignore
    expect(isEqual(undefined)).toBe(true);
    // @ts-ignore
    expect(isEqual(null)).toBe(false);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, null)).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);

    // number
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual(0, 0)).toBe(true);
    expect(isEqual(-0, 0)).toBe(true);
    expect(isEqual(Infinity, Infinity)).toBe(true);
    expect(isEqual(NaN, NaN)).toBe(true);
    expect(isEqual(0, NaN)).toBe(false);
    expect(isEqual(0, null)).toBe(false);
    expect(isEqual(0, undefined)).toBe(false);

    // string
    expect(isEqual('', '')).toBe(true);
    expect(isEqual('1', '1')).toBe(true);
    expect(isEqual('abc', 'abc')).toBe(true);
    expect(isEqual(1, '1')).toBe(false);
    expect(isEqual(-0, '0')).toBe(false);

    // boolean
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(true, 1)).toBe(false);
    expect(isEqual(false, 0)).toBe(false);

    // symbol
    expect(isEqual(Symbol.for('a'), Symbol.for('a'))).toBe(true);
    expect(isEqual(Symbol.iterator, Symbol.iterator)).toBe(true);
    expect(isEqual(Symbol('a'), Symbol('a'))).toBe(false);
    expect(isEqual(Symbol.for('a'), Symbol.for('b'))).toBe(false);
  });

  it('比较基本类型和包装基本类型', () => {
    // undefined null
    expect(isEqual(undefined, Object(undefined))).toBe(false);
    expect(isEqual(null, Object(null))).toBe(false);

    // number
    expect(isEqual(1, Object(1))).toBe(true);
    expect(isEqual(Object(1), 1)).toBe(true);
    expect(isEqual(Object(1), Object(1))).toBe(true);
    expect(isEqual(new Number(0), 0)).toBe(true);
    expect(isEqual(new Number(75), new Number(75))).toBe(true);
    expect(isEqual(new Number(75), new Number(100))).toBe(false);
    expect(isEqual(Infinity, Object(Infinity))).toBe(true);
    expect(isEqual(NaN, Object(NaN))).toBe(true);

    // string
    expect(isEqual('', Object(''))).toBe(true);
    expect(isEqual('1', Object('1'))).toBe(true);
    expect(isEqual(new String('1'), Object('1'))).toBe(true);
    expect(isEqual('abc', Object('abc'))).toBe(true);

    // boolean
    expect(isEqual(true, Object(true))).toBe(true);
    expect(isEqual(false, Object(false))).toBe(true);

    // symbol
    expect(isEqual(Symbol.for('a'), Object(Symbol.for('a')))).toBe(true);
  });

  it('比较数组', () => {
    expect(isEqual([], [])).toBe(true);
    expect(isEqual([], {})).toBe(false);
    expect(isEqual([{}], [{}])).toBe(true);
    expect(isEqual({ length: 0 }, [])).toBe(false);
    expect(isEqual([true, null, 1, 'a', undefined], [true, null, 1, 'a', undefined])).toBe(true);
    expect(isEqual([[1, 2, 3], new Date(2022, 10, 10), /x/, { a: 1 }], [[1, 2, 3], new Date(2022, 10, 10), /x/, { a: 1 }])).toBe(true);
    expect(isEqual([1, undefined, 3], [1, undefined, 3])).toBe(true);
    expect(isEqual([Object(1), false, Object('a'), /x/, new Date(2022, 10, 10), ['a', 'b', [Object('c')], { a: 1 }]], [1, Object(false), 'a', /x/, new Date(2022, 10, 10), ['a', Object('b'), ['c'], { a: 1 }]])).toBe(true);
    expect(isEqual([1, 2, 3], [3, 2, 1])).toBe(false);
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it('具有相同值的数组，非索引不同属性值', () => {
    let array1: any[] = [1, 2, 3],
      array2: any[] = [1, 2, 3];
    expect(isEqual(array1, array2)).toBe(true);

    // @ts-ignore
    array1.every = array1.filter = array1.forEach = array1.indexOf = array1.lastIndexOf = array1.map = array1.some = array1.reduce = array1.reduceRight = null;
    // @ts-ignore
    array2.concat = array2.join = array2.pop = array2.reverse = array2.shift = array2.slice = array2.sort = array2.splice = array2.unshift = null;
    expect(isEqual(array1, array2)).toBe(true);

    // @ts-ignore
    array1.a = 1;
    // @ts-ignore
    array2.b = 1;
    expect(isEqual(array1, array2)).toBe(true);

    // @ts-ignore
    array1 = /c/.exec('abcde');
    array2 = ['c'];
    expect(isEqual(array1, array2)).toBe(true);
  });

  it('比较简单数组', () => {
    const array = Array(1);
    expect(isEqual(array, Array(1))).toBe(true);
    expect(isEqual(array, [undefined])).toBe(true);
    expect(isEqual(array, Array(2))).toBe(false);
  });

  it('比较普通对象', () => {
    const obj1 = { a: true, b: null, c: 1, d: 'a', e: undefined };
    const obj2 = { a: true, b: null, c: 1, d: 'a', e: undefined };
    expect(isEqual(obj1, obj2)).toBe(true);

    const obj3 = { a: [1, 2, 3], b: new Date(2022, 10, 10), c: /x/, d: { e: 1 } };
    const obj4 = { a: [1, 2, 3], b: new Date(2022, 10, 10), c: /x/, d: { e: 1 } };
    expect(isEqual(obj3, obj4)).toBe(true);

    expect(isEqual({ a: 1, b: 2, c: 3 }, { a: 3, b: 2, c: 1 })).toBe(false);
    expect(isEqual({ a: 1, b: 2, c: 3 }, { d: 1, e: 2, f: 3 })).toBe(false);
  });

  it('比较对象无需考虑键的顺序', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { c: 3, a: 1, b: 2 };
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('比较嵌套对象', () => {
    const obj1 = {
      a: [1, 2, 3],
      b: true,
      c: Object(1),
      d: 'a',
      e: {
        f: ['a', Object('b'), 'c'],
        g: Object(false),
        h: new Date(2022, 10, 10),
        i: noop,
        j: 'a'
      }
    };
    const obj2 = {
      a: [1, 2, Object(3)],
      b: Object(true),
      c: 1,
      d: Object('a'),
      e: {
        f: ['a', 'b', 'c'],
        g: false,
        h: new Date(2022, 10, 10),
        i: noop,
        j: 'a'
      }
    };
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('比较对象实例', () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.a = 1;

    function Bar(this: any) {
      this.a = 1;
    }
    Bar.prototype.a = 1;

    expect(isEqual(new (Foo as any)(), new (Foo as any)())).toBe(true);
    expect(isEqual(new (Foo as any)(), new (Bar as any)())).toBe(false);
    expect(isEqual(new (Foo as any)(), { a: 1 })).toBe(false);
    expect(isEqual({ a: 1 }, new (Foo as any)())).toBe(false);
  });

  it('比较对象与构造函数属性', () => {
    expect(isEqual({ constructor: 1 }, { constructor: 1 })).toBe(true);
    expect(isEqual({ constructor: 1 }, { constructor: '1' })).toBe(false);
    expect(isEqual({ constructor: [1] }, { constructor: [1] })).toBe(true);
    expect(isEqual({ constructor: [1] }, { constructor: ['1'] })).toBe(false);
    expect(isEqual({ constructor: Object }, {})).toBe(false);
  });

  it('比较带有循环引用的数组', () => {
    const array1: any[] = [];
    const array2: any[] = [];
    array1.push(array1);
    array2.push(array2);
    expect(isEqual(array1, array2)).toBe(true);

    array1.push('a');
    array2.push('a');
    expect(isEqual(array1, array2)).toBe(true);

    array1.push('c');
    array2.push('d');
    expect(isEqual(array1, array2)).toBe(false);

    const array3: any[] = [1, 2, 3];
    array3[1] = array3;
    const array4: any[] = [1, [1, 2, 3], 3];
    expect(isEqual(array3, array4)).toBe(false);
  });

  it('比较带有传递性的循环引用数组', () => {
    const array1: any[] = [];
    const array2: any[] = [array1];
    const array3: any[] = [array2];
    const array4: any[] = [array3];
    array1[0] = array1;

    expect(isEqual(array1, array2)).toBe(true);
    expect(isEqual(array2, array3)).toBe(true);
    expect(isEqual(array2, array4)).toBe(false);
    expect(isEqual(array3, array4)).toBe(true);
    expect(isEqual(array1, array3)).toBe(false);
    expect(isEqual(array1, array4)).toBe(false);
  });

  it('比较循环引用对象', () => {
    const obj1: any = {};
    const obj2: any = {};
    obj1.a = obj1;
    obj2.a = obj2;
    expect(isEqual(obj1, obj2)).toBe(true);

    obj1.b = 0;
    obj2.b = Object(0);
    expect(isEqual(obj1, obj2)).toBe(true);

    const obj3: any = { a: 1, b: 2, c: 3 };
    obj3.b = obj3;
    const obj4: any = { a: 1, b: { a: 1, b: 2, c: 3 }, c: 3 };
    expect(isEqual(obj3, obj4)).toBe(false);
  });

  it('比较带有传递性的循环引用对象', () => {
    const obj1: any = {};
    const obj2 = { a: obj1 };
    const obj3 = { a: obj2 };
    const obj4 = { a: obj3 };
    obj1.a = obj1;

    expect(isEqual(obj1, obj2)).toBe(true);
    expect(isEqual(obj2, obj3)).toBe(true);
    expect(isEqual(obj2, obj4)).toBe(false);
    expect(isEqual(obj3, obj4)).toBe(true);
    expect(isEqual(obj1, obj3)).toBe(false);
    expect(isEqual(obj1, obj4)).toBe(false);
  });

  it('比较具有多个循环引用的对象', () => {
    const array1: any[] = [{}];
    const array2: any[] = [{}];

    array1[0].a = array1;
    array1.push(array1);
    array2[0].a = array1;
    array2.push(array1);
    expect(isEqual(array1, array2)).toBe(true);

    array1[0].b = 0;
    array2[0].b = Object(0);
    expect(isEqual(array1, array2)).toBe(true);

    array1[0].c = Object(1);
    array2[0].c = Object(2);
    expect(isEqual(array1, array2)).toBe(false);
  });

  it('比较具有复杂循环引用的对象', () => {
    const obj1 = {
      foo: { b: { c: { d: {} } } },
      bar: { a: 2 }
    };
    const obj2 = {
      foo: { b: { c: { d: {} } } },
      bar: { a: 2 }
    };
    expect(isEqual(obj1, obj2)).toBe(true);

    obj1.foo.b.c.d = obj1;
    // @ts-ignore
    obj1.bar.b = obj1.foo.b;
    obj2.foo.b.c.d = obj2;
    // @ts-ignore
    obj2.bar.b = obj2.foo.b;
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('比较具有共享属性值的对象', () => {
    const obj1 = {
      a: [1, 2]
    };
    const obj2 = {
      a: [1, 2],
      b: [1, 2]
    };
    // @ts-ignore
    obj1.b = obj1.a;
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('比较普通对象和`Object.create(null)`', () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.constructor = null;

    const obj1 = Object.create(null);
    obj1.a = 1;
    const obj2 = { a: 1 };

    expect(isEqual(obj1, obj2)).toBe(true);
    expect(isEqual(obj1, new (Foo as any)())).toBe(true);
    expect(isEqual(obj2, new (Foo as any)())).toBe(false);
  });

  it('比较 `Argumenrts`', () => {
    const arg1 = toArgs([]);
    const arg2 = toArgs([]);
    const arg3 = toArgs([1, 2]);
    expect(isEqual(arg1, arg2)).toBe(true);
    expect(isEqual(arg1, arg3)).toBe(false);
    expect(isEqual(arg3, { '0': 1, '1': 2 })).toBe(false);
    expect(isEqual(arg3, [1, 2])).toBe(false);
  });

  it('比较 `ArrayBuffer`', () => {
    if (ArrayBuffer) {
      const buffer = new Int8Array([-1]).buffer;
      expect(isEqual(buffer, new Uint8Array([255]).buffer)).toBe(true);
      expect(isEqual(buffer, new ArrayBuffer(1))).toBe(false);
    }
  });

  it('比较 `TypedArray`', () => {
    const array1 = [new Int8Array(8), new Uint8Array(8), new Int16Array(8), new Uint16Array(8), new Int32Array(8), new Uint32Array(8), new BigInt64Array(8), new BigUint64Array(8), new Float32Array(8), new Float64Array(8), new Uint8ClampedArray(8)];
    const array2 = [new Int8Array(8), new Uint8Array(8), new Int16Array(8), new Uint16Array(8), new Int32Array(8), new Uint32Array(8), new BigInt64Array(8), new BigUint64Array(8), new Float32Array(8), new Float64Array(8), new Uint8ClampedArray(8)];
    expect(isEqual(array1, array2)).toBe(true);
    expect(isEqual(new Uint8Array(8), new Uint16Array(8))).toBe(false);
    expect(isEqual(new Uint16Array([1, 2]), new Uint16Array([3]))).toBe(false);
    expect(isEqual(new Uint8Array(new ArrayBuffer(8), 2), new Uint8Array(new ArrayBuffer(10), 4)));

    const arrayBuffer = new ArrayBuffer(8);
    expect(isEqual(new Uint8Array(arrayBuffer, 2), new Uint8Array(arrayBuffer, 2)));
  });

  it('比较 `Buffer`', () => {
    if (Buffer) {
      const buffer = new Buffer([1]);
      expect(isEqual(buffer, new Buffer([1]))).toBe(true);
      expect(isEqual(buffer, new Buffer([2]))).toBe(false);
      expect(isEqual(buffer, new Uint8Array([1]))).toBe(false);
    }
  });

  it('比较 `DataView`', () => {
    if (DataView) {
      const dv1 = new DataView(new ArrayBuffer(8));
      const dv2 = new DataView(new ArrayBuffer(8));
      const dv3 = new DataView(new ArrayBuffer(8), 3);
      const dv4 = new DataView(new ArrayBuffer(10), 5);
      expect(isEqual(dv1, dv2)).toBe(true);
      expect(isEqual(dv1, dv3)).toBe(false);
      expect(isEqual(dv3, dv4)).toBe(false);
    }
  });

  it('比较 `Date`', () => {
    const date = new Date(2022, 10, 10);
    expect(isEqual(new Date('2022-10-10'), new Date('2022-10-10'))).toBe(true);
    expect(isEqual(date, new Date(2022, 10, 10))).toBe(true);
    expect(isEqual(new Date(''), new Date('abc'))).toBe(true);
    expect(isEqual(1668009600000, date)).toBe(false);
    expect(isEqual(date, { getTime: constant(+date) })).toBe(false);
  });

  it('比较 `Error`', () => {
    const err1 = new Error('abc');
    const err2 = new TypeError('abc');
    expect(isEqual(err1, err2)).toBe(false);
    expect(isEqual(err1, new Error('abc'))).toBe(true);
    expect(isEqual(err2, new TypeError('abc'))).toBe(true);
  });

  it('比较 `Function`', () => {
    expect(isEqual(noop, noop)).toBe(true);
    expect(
      isEqual(
        function () {
          return 'abc';
        },
        function () {
          return 'abc';
        }
      )
    ).toBe(false);
  });

  it('比较 `Map`', () => {
    const map1 = new Map();
    const map2 = new Map();
    expect(isEqual(map1, map2)).toBe(true);
    map1.set('a', 1);
    expect(isEqual(map1, map2)).toBe(false);
    map2.set('a', 1);
    expect(isEqual(map1, map2)).toBe(true);
    map1.set('b', map1);
    map2.set('b', map1);
    expect(isEqual(map1, map2)).toBe(true);
    map1.delete('a');
    map1.set('a', 1);
    expect(isEqual(map1, map2)).toBe(true);
  });

  it('比较 `Map` 相同的键值引用，不同的值', () => {
    const obj1 = { n: 1 };
    const obj2 = { n: 2 };
    const map1 = new Map([
      [obj1, 10],
      [obj2, 100]
    ]);
    const map2 = new Map([
      [obj2, 100],
      [obj1, 10]
    ]);

    expect(isEqual(map1, map2)).toBe(true);

    // 下面示例同传递性的循环引用
    const map3 = new Map([
      [obj1, 100],
      [obj2, 10]
    ]);
    expect(isEqual(map1, map3)).toBe(false);
    expect(isEqual(map2, map3)).toBe(false);

    // 同时存在 Symbol 类型的键和值没有排序，所以不相等。
    const sym1 = Symbol.for('a');
    const sym2 = Symbol('b');
    const map4 = new Map();
    const map5 = new Map();

    map4.set(sym1, Symbol.for('x'));
    map4.set(sym2, Symbol.for('y'));
    map5.set(sym2, Symbol.for('y'));
    map5.set(sym1, Symbol.for('x'));
    expect(isEqual(map4, map5)).toBe(false);

    // 只要键或值存在可排序字段，即可正常比较
    map4.set(sym1, 1);
    map5.set(sym1, 1);
    expect(isEqual(map4, map5)).toBe(true);
  });

  it('比较 `Promise`', () => {
    const promise1 = Promise.resolve(1);
    const promise2 = Promise.resolve(2);
    expect(isEqual(promise1, promise2)).toBe(false);
    expect(isEqual(promise1, Promise.resolve(1))).toBe(false);
    expect(isEqual(promise1, promise1)).toBe(true);
  });

  it('比较 `RegExp`', () => {
    expect(isEqual(/x/, /x/)).toBe(true);
    expect(isEqual(/x/gim, /x/gim)).toBe(true);
    expect(isEqual(/x/gim, /x/gim)).toBe(true);
    expect(isEqual(/x/g, /x/gi)).toBe(false);
    expect(isEqual(/x/, /y/)).toBe(false);
    expect(isEqual(/x/g, { global: true, ignoreCase: false, multiline: false, source: 'x' })).toBe(false);
  });

  it('比较 `Set`', () => {
    const set1 = new Set();
    const set2 = new Set();
    expect(isEqual(set1, set2)).toBe(true);

    set1.add(1);
    set2.add(2);
    expect(isEqual(set1, set2)).toBe(false);

    set1.add(2);
    set2.add(1);
    expect(isEqual(set1, set2)).toBe(true);

    set1.add(2);
    set2.add(1);
    expect(isEqual(set1, set2)).toBe(true);

    set1.delete(1);
    set1.add(1);
    expect(isEqual(set1, set2)).toBe(true);
  });

  it('比较对象 `Symbol` 属性', () => {
    const symbol1 = Symbol.for('a');
    const symbol2 = Symbol.for('b');
    const obj1 = {
      a: 1,
      [symbol1]: {
        a: { b: 2 }
      }
    };
    const obj2 = {
      a: 1,
      [symbol1]: {
        a: { b: 2 }
      }
    };
    expect(isEqual(obj1, obj2)).toBe(true);

    Object.defineProperty(obj2, symbol2, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: 2
    });
    expect(isEqual(obj1, obj2)).toBe(true);

    // @ts-ignore
    obj2[symbol1] = { a: 1 };
    expect(isEqual(obj1, obj2)).toBe(false);

    // @ts-ignore
    delete obj2[symbol1];
    // @ts-ignore
    obj2[Symbol('a')] = { a: { b: 2 } };
    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it('自定义比较方法参数', () => {
    const argsList: any[] = [];
    const obj1: any = { a: [1, 2], b: null };
    const obj2: any = { a: [1, 2], b: null };

    const expected = [
      [obj1, obj2],
      [obj1.b, obj2.b, 'b', obj1, obj2],
      [obj1.a, obj2.a, 'a', obj1, obj2],
      [obj1.a[1], obj2.a[1], 1, obj1.a, obj2.a],
      [obj1.a[0], obj2.a[0], 0, obj1.a, obj2.a]
    ];

    isEqual(obj1, obj2, function () {
      const length = arguments.length;
      // eslint-disable-next-line prefer-rest-params
      argsList.push(Array.from(arguments).slice(0, length - (length > 2 ? 2 : 0)));
    });

    expect(expected).toEqual(argsList);
  });

  it('循环引用的自定义比较方法参数', () => {
    const argsList: any[] = [];
    const obj1: any = { a: [1, 2], b: null };
    const obj2: any = { a: [1, 2], b: null };
    obj1.b = obj2;
    obj2.b = obj1;

    const expected = [
      [obj1, obj2],
      [obj1.b, obj2.b, 'b', obj1, obj2],
      [obj1.b, obj2.b, 'b', obj1, obj2],
      [obj1.a, obj2.a, 'a', obj1, obj2],
      [obj1.a[1], obj2.a[1], 1, obj1.a, obj2.a],
      [obj1.a[0], obj2.a[0], 0, obj1.a, obj2.a],
      [obj1.a, obj2.a, 'a', obj1, obj2],
      [obj1.a[1], obj2.a[1], 1, obj1.a, obj2.a],
      [obj1.a[0], obj2.a[0], 0, obj1.a, obj2.a]
    ];

    isEqual(obj1, obj2, function () {
      const length = arguments.length;
      // eslint-disable-next-line prefer-rest-params
      argsList.push(Array.from(arguments).slice(0, length - (length > 2 ? 2 : 0)));
    });

    expect(expected).toEqual(argsList);
  });

  it('自定义比较方法返回 `undefined` ，处理比较', () => {
    expect(isEqual('a', 'a', noop)).toBe(true);
    expect(isEqual(['a'], ['a'], noop)).toBe(true);
    expect(isEqual({ a: [1] }, { a: [1] }, noop)).toBe(true);
  });

  it('自定义比较方法返回 `true` ，不处理比较', () => {
    const customizer = (value: any) => (isString(value) ? true : undefined);
    expect(isEqual('a', 'b', customizer)).toBe(true);
    expect(isEqual(['a'], ['b'], customizer)).toBe(true);
    expect(isEqual({ a: 'a' }, { a: 'b' }, customizer)).toBe(true);
  });

  it('自定义比较方法返回 `false` ，不处理比较', () => {
    const customizer = (value: any) => (isString(value) ? false : undefined);
    expect(isEqual('a', 'a', customizer)).toBe(false);
    expect(isEqual(['a'], ['a'], customizer)).toBe(false);
    expect(isEqual({ a: 'a' }, { a: 'a' }, customizer)).toBe(false);
  });

  it('自定义比较方法有返回值，不处理比较', () => {
    const values = difference(falsy, [undefined]);
    values.forEach((item) => {
      expect(isEqual('a', 'a', constant(item as any))).toBe(false);
    });

    truthy.forEach((item) => {
      expect(isEqual('a', 'b', constant(item as any))).toBe(true);
    });
  });

  it('自定义比较方法开始和最后正确，中间部分错误', () => {
    expect(
      isEqual([1, 2, 3], [1, 'b', 3], (a, b) => {
        if (typeof a !== 'object') {
          return a === b;
        }
      })
    ).toBe(false);
  });

  it('自定义比较方法非函数，处理比较', () => {
    const values = [false, null, '', 'abc', 1, 0, NaN, {}, [], symbol];
    values.forEach((item) => {
      expect(isEqual('a', 'a', item as any)).toBe(true);
    });
  });

  it('strictCheck', () => {
    // -0 0不等于
    expect(isEqual(-0, 0, undefined, true)).toBe(false);
    expect(isEqual([-0], [0], undefined, true)).toBe(false);
    expect(isEqual({ a: [-0] }, { a: [0] }, undefined, true)).toBe(false);

    // 无效日期不相等
    expect(isEqual(new Date(''), new Date(''), undefined, true)).toBe(false);
    expect(isEqual(new Date(''), new Date('abc'), undefined, true)).toBe(false);

    // 基本类型和包装基本类型不相等
    expect(isEqual(1, Object(1), undefined, true)).toBe(false);
    expect(isEqual('abc', Object('abc'), undefined, true)).toBe(false);
    expect(isEqual(true, Object(true), undefined, true)).toBe(false);
    expect(isEqual(Symbol.for('a'), Object(Symbol.for('a')), undefined, true)).toBe(false);
  });
});

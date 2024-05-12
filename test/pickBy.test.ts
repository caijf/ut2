import { isString, pickBy } from '../src';
import { falsy, symbol } from './_utils';

describe('pickBy', () => {
  const obj = { name: 'jeff', age: 18, [symbol]: 'some val' };

  it('basic', () => {
    expect(pickBy(obj)).toEqual({});
    expect(pickBy(obj, isString)).toEqual({ name: 'jeff', [symbol]: 'some val' });

    expect(pickBy(null)).toEqual({});
    expect(pickBy(null, isString)).toEqual({});
  });

  it('可选继承属性', () => {
    function Foo(this: any) {
      this.name = 'jeff';
      this[Symbol.for('a')] = 'a';
    }
    Foo.prototype.age = 18;
    Foo.prototype[Symbol.for('b')] = 'b';

    expect(pickBy(new (Foo as any)(), (value) => value === 18 || value === 'b')).toEqual({
      age: 18,
      [Symbol.for('b')]: 'b'
    });
  });

  it('不支持不可枚举的键值', () => {
    const o = Object.defineProperties(
      {},
      {
        name: {
          value: 'jeff',
          enumerable: false
        },
        age: {
          get() {
            return 18;
          },
          enumerable: true
        }
      }
    );

    expect(pickBy(o)).toEqual({});
    expect(pickBy(o, (v, k) => k === 'age')).toEqual({ age: 18 });
    expect(pickBy(o, (v, k) => k === 'name')).toEqual({});
  });

  it('错误参数', () => {
    falsy.forEach((item) => {
      // @ts-expect-error
      expect(pickBy(item, (v) => v === 'a')).toEqual({});
    });
  });
});

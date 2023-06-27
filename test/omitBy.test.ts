import { isString, omitBy } from '../src';
import { symbol } from './_utils';

describe('omitBy', () => {
  const obj = { name: 'jeff', age: 18, [symbol]: 'some val' };

  it('basic', () => {
    expect(omitBy(obj)).toEqual({ name: 'jeff', age: 18, [symbol]: 'some val' });
    expect(omitBy(obj, isString)).toEqual({ age: 18 });
  });

  it('包含继承的可枚举属性', () => {
    function Foo(this: any) {
      this.name = 'jeff';
      this[Symbol.for('a')] = 'a';
    }
    Foo.prototype.age = 18;
    Foo.prototype[Symbol.for('b')] = 'b';

    expect(omitBy(new (Foo as any)())).toEqual({
      name: 'jeff',
      age: 18,
      [Symbol.for('a')]: 'a',
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

    expect(omitBy(o)).toEqual({ age: 18 });
    expect(omitBy(o, (v, k) => k === 'age')).toEqual({});
    expect(omitBy(o, (v, k) => k === 'name')).toEqual({ age: 18 });
  });
});

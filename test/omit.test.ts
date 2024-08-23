import { omit } from '../src';
import { symbol } from './_utils';

describe('omit', () => {
  const obj = { name: 'jeff', age: 18 };

  it('shallow copy', () => {
    const originObj = { name: 'jeff' };
    const copy = omit(originObj);

    expect(originObj).toEqual(copy);
    expect(originObj).not.toBe(copy);
  });

  it('包含继承的可枚举属性', () => {
    function Foo(this: any) {
      this.name = 'jeff';
      this[Symbol.for('a')] = 'a';
    }
    Foo.prototype.age = 18;
    Foo.prototype[Symbol.for('b')] = 'b';

    expect(omit(new (Foo as any)())).toEqual({
      name: 'jeff',
      age: 18,
      [Symbol.for('a')]: 'a',
      [Symbol.for('b')]: 'b'
    });
  });

  it('string', () => {
    expect(omit(obj, 'age')).toEqual({ name: 'jeff' });
    // 传入不存在的参数
    expect(omit(obj, 'age2' as any)).toEqual({ name: 'jeff', age: 18 });
  });

  it('array', () => {
    expect(omit(obj, ['age'])).toEqual({ name: 'jeff' });
    expect(omit(obj, ['age', 'age'])).toEqual({ name: 'jeff' });
  });

  it('支持 Symbol 类型的键值', () => {
    const o = { name: 'jeff', age: 18, [symbol]: 'some val' };

    expect(omit(o)).toEqual({ name: 'jeff', age: 18, [symbol]: 'some val' });
    expect(omit(o, symbol)).toEqual({ name: 'jeff', age: 18 });
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

    expect(omit(o)).toEqual({ age: 18 });
    expect(omit(o, 'age' as any)).toEqual({});
  });
});

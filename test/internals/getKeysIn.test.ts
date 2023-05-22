import getKeysIn from '../../src/internals/getKeysIn';

describe('getKeysIn', () => {
  it('结果同 `key in`', () => {
    const obj = { name: 'jeff', age: 18 };
    const expected = [];
    for (const key in obj) {
      expected.push(key);
    }
    expect(expected).toEqual(getKeysIn(obj));
  });

  it('如果 `constructor` 可枚举，也包含在内', () => {
    function Person(this: any, name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    Person.prototype = {
      getAge() {
        return this.age;
      }
    };
    Person.prototype.constructor = Person;

    const p1 = new (Person as any)('jeff', 18);
    const keys = [];
    for (const key in p1) {
      keys.push(key);
    }

    expect(keys).toEqual(['name', 'age', 'getAge', 'constructor']);
    expect(getKeysIn(p1)).toEqual(['name', 'age', 'getAge', 'constructor']);
  });

  it('仅包含可枚举属性', () => {
    const obj = Object.defineProperties(
      {},
      {
        a: {
          value: 1,
          enumerable: false
        },
        b: {
          get() {
            return 2;
          },
          enumerable: true
        }
      }
    );
    expect(obj).toEqual({ b: 2 });
    expect(getKeysIn(obj)).toEqual(['b']);
  });

  it('不包含 `Symbol` 属性', () => {
    const obj = {
      [Symbol.for('a')]: 1
    };

    expect(getKeysIn(obj)).toEqual([]);
  });
});

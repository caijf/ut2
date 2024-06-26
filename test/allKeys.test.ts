import { allKeys } from '../src';
import { symbol } from './_utils';

describe('allKeys', () => {
  it('返回对象自身的属性', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(allKeys(obj)).toEqual(['a', 'b', 'c']);
  });

  it('不包含原型链可枚举属性', () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.c = 3;
    expect(allKeys(new (Foo as any)())).toEqual(['a']);
  });

  it('包含 `Symbol` 属性', () => {
    const obj = { a: 1, [symbol]: 2 };
    expect(allKeys(obj)).toEqual(['a', symbol]);

    function Foo(this: any) {
      this.a = 1;
      this[Symbol.for('b')] = 2;
    }
    Foo.prototype.c = 3;
    Foo.prototype[Symbol.for('d')] = 4;

    const foo = new (Foo as any)();
    expect(Object.keys(foo)).toEqual(['a']);
    expect(allKeys(foo)).toEqual(['a', Symbol.for('b')]);
  });

  it('类对象', () => {
    const arr = ['a', 'b', 'c'];
    expect(allKeys(arr)).toEqual(['0', '1', '2']);

    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ]);
    expect(allKeys(map)).toEqual([]);

    const str = Object('a');
    expect(allKeys(str)).toEqual(['0']);

    const num = Object(1);
    expect(allKeys(num)).toEqual([]);
  });

  it('错误的参数', () => {
    const values = [null, [], 1, '', 'a', NaN, undefined];
    values.forEach((item) => {
      expect(allKeys(item)).toEqual([]);
    });
  });
});

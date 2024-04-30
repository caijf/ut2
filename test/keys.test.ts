import { keys } from '../src';
import { symbol } from './_utils';

describe('keys', () => {
  it('返回对象自身及继承的属性', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(keys(obj)).toEqual(['a', 'b', 'c']);
  });

  it('不包含原型链可枚举属性', () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.c = 3;
    expect(keys(new (Foo as any)())).toEqual(['a']);
  });

  it('不包含 `Symbol` 属性', () => {
    const obj = { a: 1, [symbol]: 2 };
    expect(keys(obj)).toEqual(['a']);

    function Foo(this: any) {
      this.a = 1;
      this[Symbol.for('b')] = 2;
    }
    Foo.prototype.c = 3;
    Foo.prototype[Symbol.for('d')] = 4;

    const foo = new (Foo as any)();
    expect(Object.keys(foo)).toEqual(['a']);
    expect(keys(foo)).toEqual(['a']);
  });

  it('类对象', () => {
    const arr = ['a', 'b', 'c'];
    expect(keys(arr)).toEqual(['0', '1', '2']);

    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ]);
    expect(keys(map)).toEqual([]);

    const str = Object('a');
    expect(keys(str)).toEqual(['0']);

    const num = Object(1);
    expect(keys(num)).toEqual([]);
  });

  it('错误的参数', () => {
    const values = [null, [], 1, '', 'a', NaN, undefined];
    values.forEach((item) => {
      expect(keys(item)).toEqual([]);
    });
  });
});

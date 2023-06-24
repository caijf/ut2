import { allKeys } from '../src';
import { symbol } from './_utils';

describe('allKeys', () => {
  it('返回对象自身的属性名', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(allKeys(obj)).toEqual(['a', 'b', 'c']);
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

  it('错误的参数', () => {
    const values = [null, [], 1, '', 'a', NaN, undefined];
    values.forEach((item) => {
      // @ts-ignore
      expect(allKeys(item)).toEqual([]);
    });
  });
});

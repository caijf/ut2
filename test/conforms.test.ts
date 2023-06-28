import { conforms, isNumber, isString } from '../src';

describe('conforms', () => {
  const objs = [
    { a: 1, b: 8 },
    { a: 2, b: 4 },
    { a: 3, b: 16 }
  ];

  it('basic', () => {
    const result1 = objs.filter(conforms({ b: (value) => value > 4 }));
    expect(result1).toEqual([
      { a: 1, b: 8 },
      { a: 3, b: 16 }
    ]);

    const result2 = objs.filter(conforms({ b: (value) => value > 4, a: (value) => value > 1 }));
    expect(result2).toEqual([{ a: 3, b: 16 }]);

    const result3 = objs.filter(conforms({ b: (value) => value === 4 }));
    expect(result3).toEqual([{ a: 2, b: 4 }]);

    const result4 = objs.filter(conforms({}));
    expect(result4).toEqual([
      { a: 1, b: 8 },
      { a: 2, b: 4 },
      { a: 3, b: 16 }
    ]);
  });

  it('不匹配 `source` 继承属性', () => {
    function Foo(this: any) {
      this.a = (value: number) => value > 1;
    }
    Foo.prototype.b = (value: number) => value > 8;

    const result = objs.filter(conforms(new (Foo as any)()));
    expect(result).toEqual([
      { a: 2, b: 4 },
      { a: 3, b: 16 }
    ]);
  });

  it('`object` 缺失属性，不执行 `source` 断言函数', () => {
    let count = 0;
    const par = conforms({
      a() {
        count++;
        return true;
      }
    });

    expect(par({})).toBe(false);
    expect(count).toBe(0);
  });

  it('`object` 支持函数对象', () => {
    function Foo() {}
    Foo.a = 1;

    function Bar() {}
    Bar.a = 2;

    const par = conforms({ a: (value) => value > 1 });

    expect(par(Foo)).toBe(false);
    expect(par(Bar)).toBe(true);
  });

  it('`source` 支持函数对象', () => {
    function Foo() {}
    Foo.a = (value: number) => value > 1;

    const result = objs.filter(conforms(Foo));
    expect(result).toEqual([
      { a: 2, b: 4 },
      { a: 3, b: 16 }
    ]);
  });

  it('`object` 非普通对象', () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const par = conforms({ b: (value) => value > 1 });

    expect(par(new (Foo as any)())).toBe(true);
  });

  it('包含 `Symbol` 属性', () => {
    const object = {
      [Symbol.for('a')]: 1,
      [Symbol.for('b')]: 'b'
    };
    const par = conforms({ [Symbol.for('a')]: isNumber, [Symbol.for('b')]: isString });
    expect(par(object)).toBe(true);
  });

  it('`object` 为 null', () => {
    const par1 = conforms({});

    // @ts-ignore
    // 无符合属性断言时，返回 true
    expect(par1(null)).toBe(true);
    // @ts-ignore
    expect(par1(undefined)).toBe(true);

    const par2 = conforms({ a: (value: any) => !!value });

    // @ts-ignore
    // 有符合属性断言时，返回 false
    expect(par2(null)).toBe(false);
    // @ts-ignore
    expect(par2(undefined)).toBe(false);
  });
});

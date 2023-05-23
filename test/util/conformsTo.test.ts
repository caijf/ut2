import { conformsTo } from '../../src';

describe('conformsTo', () => {
  const objs = [
    { a: 1, b: 8 },
    { a: 2, b: 4 },
    { a: 3, b: 16 }
  ];

  it('basic', () => {
    const result1 = objs.filter((item) => conformsTo(item, { b: (value) => value > 4 }));
    expect(result1).toEqual([
      { a: 1, b: 8 },
      { a: 3, b: 16 }
    ]);

    const result2 = objs.filter((item) =>
      conformsTo(item, { b: (value) => value > 4, a: (value) => value > 1 })
    );
    expect(result2).toEqual([{ a: 3, b: 16 }]);

    const result3 = objs.filter((item) => conformsTo(item, { b: (value) => value === 4 }));
    expect(result3).toEqual([{ a: 2, b: 4 }]);

    const result4 = objs.filter((item) => conformsTo(item, {}));
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

    const result = objs.filter((item) => conformsTo(item, new (Foo as any)()));
    expect(result).toEqual([
      { a: 2, b: 4 },
      { a: 3, b: 16 }
    ]);
  });

  it('`object` 缺失属性，不执行 `source` 断言函数', () => {
    let count = 0;
    const source = {
      a() {
        count++;
        return true;
      }
    };

    expect(conformsTo({}, source)).toBe(false);
    expect(count).toBe(0);
  });

  it('`object` 支持函数对象', () => {
    function Foo() {}
    Foo.a = 1;

    function Bar() {}
    Bar.a = 2;

    expect(conformsTo(Foo, { a: (value) => value > 1 })).toBe(false);
    expect(conformsTo(Bar, { a: (value) => value > 1 })).toBe(true);
  });

  it('`source` 支持函数对象', () => {
    function Foo() {}
    Foo.a = (value: number) => value > 1;

    const result = objs.filter((item) => conformsTo(item, Foo));
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

    expect(conformsTo(new (Foo as any)(), { b: (value) => value > 1 })).toBe(true);
  });

  it('`object` 为 null', () => {
    // 无符合属性断言时，返回 true
    expect(conformsTo(null, {})).toBe(true);
    expect(conformsTo(undefined, {})).toBe(true);

    // 有符合属性断言时，返回 false
    expect(conformsTo(null, { a: (value: any) => !!value })).toBe(false);
    expect(conformsTo(undefined, { a: (value: any) => !!value })).toBe(false);
  });
});

import { identity, partial } from '../src';

describe('partial', () => {
  it('basic', () => {
    const fn = partial(identity, 'a');
    expect(fn()).toBe('a');

    function abc(a: number, b: string, c: object) {
      return [a, b, c];
    }
    const args = [1, 'a', {}] as const;
    const fn1 = partial(abc);
    expect(fn1(...args)).toEqual(abc(...args));

    const fn2 = partial(abc, 1);
    expect(fn2('a', {})).toEqual(abc(...args));

    const fn3 = partial(abc, 1, 'a');
    expect(fn3({})).toEqual(abc(...args));

    const fn4 = partial(abc, ...args);
    expect(fn4()).toEqual(abc(...args));

    const fn5 = partial(identity<string>, '1');
    expect(fn5()).toBe('1');
  });

  it('创建一个函数，并添加参数', () => {
    const fn = function (a: string, b: string) {
      return [a, b];
    };
    const par = partial(fn, 'a');
    expect(par('b')).toEqual(['a', 'b']);
  });

  it('`arguments` 数量 ', () => {
    const fn = partial(function () {
      return arguments.length;
    });

    // @ts-ignore
    expect(fn()).toBe(0);
    // @ts-ignore
    expect(fn(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)).toBe(12);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fn1 = partial(function (a: any, b: any, c: any) {});
    expect(fn1.length).toBe(0);
  });

  it('克隆已创建的函数的元数据', () => {
    function greet(greeting: string, name: string) {
      return greeting + ' ' + name;
    }

    const per1 = partial(greet, 'hi');
    const per2 = partial(per1, 'cai');
    const per3 = partial(per1, 'jeff');

    expect(per1('a')).toBe('hi a');
    expect(per2()).toBe('hi cai');
    expect(per3()).toBe('hi jeff');

    const per11 = partial(greet, partial._, 'jeff');
    const per22 = partial(per11, 'hi');
    const per33 = partial(per11, 'hello');
    expect(per11('a')).toBe('a jeff');
    expect(per22()).toBe('hi jeff');
    expect(per33()).toBe('hello jeff');
  });

  it('参数占位符', () => {
    function abc(a: string, b: number, c: boolean) {
      return [a, b, c];
    }
    const abcPartial1 = partial(abc, partial._, partial.placeholder, false);
    const abcPartial2 = partial(abcPartial1, partial._, 1);
    const abcPartial3 = partial(abcPartial2, 'a');

    expect(abcPartial3()).toEqual(['a', 1, false]);
  });
});

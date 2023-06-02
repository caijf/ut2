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
  });

  it('测试 `arguments` 数量 ', () => {
    const fn = partial(function () {
      return arguments.length;
    });

    // @ts-ignore
    expect(fn()).toBe(0);
    // @ts-ignore
    expect(fn(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)).toBe(12);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fn1 = partial(function (a, b, c) {});
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
  });
});

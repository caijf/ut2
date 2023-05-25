import { identity } from '../src';

describe('identity', () => {
  it('返回第一个参数', () => {
    const firstArg = identity('a', 1);
    expect(firstArg).toBe('a');

    const obj = { a: 1, b: 2 };
    expect(identity(obj)).toBe(obj);
  });

  it('无参数返回undefined', () => {
    expect(identity()).toBeUndefined();
  });
});

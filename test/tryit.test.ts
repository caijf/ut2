import { tryit } from '../src';

describe('tryit', () => {
  it('异步函数带参数', async () => {
    const fn = tryit(async (n: number) => {
      return n + 1234;
    });
    const [err, data] = await fn(1);
    expect(err).toBeNull();
    if (!err) {
      // 此处 data 的类型为 number
      expect(data).toBe(1235);
    }
  });

  it('异步函数无参数无返回值', async () => {
    const fn = tryit(async () => {});
    const [err, data] = await fn();
    expect(err).toBeNull();
    expect(data).toBeUndefined();
  });

  it('异步函数报错，返回错误信息', async () => {
    const fn = tryit(async () => {
      throw new Error('error message');
    });
    const [err, result] = await fn();
    expect(err).not.toBeNull();
    expect(result).toBeUndefined();
    expect(err?.message).toBe('error message');
  });

  it('同步函数带参数', async () => {
    const fn = tryit((name: string) => {
      return 'hello ' + name;
    });
    const [err, result] = fn('jeff');
    expect(err).toBeNull();
    expect(result).toBe('hello jeff');
  });

  it('同步函数无参数无返回值', async () => {
    const fn = tryit(() => {});
    const [err, result] = fn();
    expect(err).toBeNull();
    expect(result).toBeUndefined();
  });

  it('同步函数报错，返回错误信息', () => {
    const f = () => {
      // 此处如果没有返回值，该函数会被判定为异步函数
      if (Math.random() > 1) {
        return '';
      }
      throw new Error('error message');
    };
    const fn = tryit(f);
    const [err, result] = fn();
    expect(err).not.toBeNull();
    expect(err?.message).toBe('error message');
    expect(result).toBeUndefined();
  });
});

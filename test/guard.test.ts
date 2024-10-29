import { guard } from '../src';

describe('guard', () => {
  it('basic', async () => {
    const resule1 = guard(() => 42);
    const result2 = await guard(() => Promise.resolve(42));
    const result3 = guard(() => {
      throw new Error();
    });
    const result4 = await guard(() => Promise.reject());

    expect(resule1).toBe(42);
    expect(result2).toBe(42);
    expect(result3).toBeUndefined();
    expect(result4).toBeUndefined();
  });

  it('返回同步函数的结果', () => {
    const result = guard(() => 42);
    expect(result).toBe(42);
  });

  it('返回异步函数的结果', async () => {
    const result = await guard(() => Promise.resolve(42));
    expect(result).toBe(42);
  });

  it('在没有错误时不调用 shouldGuard', () => {
    const shouldGuard = jest.fn(() => true);
    const result = guard(() => 42, shouldGuard);
    expect(result).toBe(42);
    expect(shouldGuard).not.toHaveBeenCalled();
  });

  it('在同步函数抛出错误时，函数守卫返回 `undefined`', () => {
    expect(
      guard(() => {
        throw new Error('error');
      })
    ).toBeUndefined();
  });

  it('在同步函数抛出错误时调用 shouldGuard', () => {
    const shouldGuard = jest.fn(() => false);
    expect(() =>
      guard(() => {
        throw new Error('error');
      }, shouldGuard)
    ).toThrow('error');
    expect(shouldGuard).toHaveBeenCalled();
  });

  it('在异步函数返回拒绝时，函数守卫返回 `undefined`', async () => {
    const res = await guard(() => Promise.reject(new Error('error')));
    expect(res).toBeUndefined();
  });

  it('在异步函数返回拒绝时调用 shouldGuard', async () => {
    const shouldGuard = jest.fn(() => false);
    await expect(guard(() => Promise.reject(new Error('error')), shouldGuard)).rejects.toThrow('error');
    expect(shouldGuard).toHaveBeenCalled();
  });
});

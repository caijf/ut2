import { retry } from '../src';

describe('retry', () => {
  it('basic', async () => {
    let count = 1;
    const fn = () => (++count < 3 ? Promise.reject('error') : Promise.resolve('success'));
    const result = await retry(fn);
    expect(result).toBe('success');
    expect(count).toBe(3);

    const mockFn = jest.fn().mockRejectedValue('error');
    await expect(retry(mockFn)).rejects.toBe('error');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('第一次返回结果', async () => {
    const mockFn = jest.fn().mockResolvedValue('success');
    const result = await retry(mockFn);
    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('第二次返回结果', async () => {
    const mockFn = jest.fn().mockRejectedValueOnce('error').mockResolvedValue('success');
    const result = await retry(mockFn);
    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('第三次返回结果', async () => {
    const mockFn = jest.fn().mockRejectedValueOnce('error').mockRejectedValueOnce('error').mockResolvedValue('success');
    const result = await retry(mockFn);
    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('超出重试次数抛出错误', async () => {
    const mockFn = jest.fn().mockRejectedValue('error');
    await expect(retry(mockFn, { times: 3 })).rejects.toEqual('error');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('满足退出条件，立即退出重试，并抛出错误', async () => {
    const mockFn = jest.fn().mockRejectedValue('error').mockRejectedValueOnce('error');
    const exitCondition = jest.fn().mockReturnValue(true).mockReturnValueOnce(false);
    await expect(retry(mockFn, { times: 3, exit: exitCondition })).rejects.toEqual('error');
    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(exitCondition).toHaveBeenCalledTimes(2);
  });

  it('调用指数后退延迟', async () => {
    const mockFn = jest.fn().mockRejectedValue('error');
    const backoff = jest.fn().mockReturnValue(100);
    const start = Date.now();

    await expect(retry(mockFn, { times: 3, backoff })).rejects.toEqual('error');
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(200); // 2次重试，100ms 延迟
    expect(backoff).toHaveBeenCalledTimes(2);
  });

  it('等待延迟', async () => {
    const mockFn = jest.fn().mockRejectedValue('error');
    const delay = 100;
    const start = Date.now();

    await expect(retry(mockFn, { times: 3, delay })).rejects.toEqual('error');
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(200); // 2次重试，100ms 延迟
  });
});

import { limit } from '../src';

describe('limit function', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('应该在指定的时间间隔内只调用一次函数', () => {
    const mockFn = jest.fn();
    const limitedFn = limit(mockFn, 1000);
    limitedFn();
    limitedFn(); // 第二次调用应该被忽略
    expect(mockFn).toHaveBeenCalledTimes(1); // 验证 mockFn 只被调用一次
    jest.advanceTimersByTime(1000); // 快进时间到 1000ms
    limitedFn(); // 现在可以调用了
    expect(mockFn).toHaveBeenCalledTimes(2); // 验证 mockFn 现在被调用了两次
  });
  it('在时间间隔内不应调用函数', () => {
    const mockFn = jest.fn();
    const limitedFn = limit(mockFn, 500);
    limitedFn();
    limitedFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(400);
    limitedFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(100);
    limitedFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
  it('应该正确处理没有参数的情况', () => {
    const mockFn = jest.fn();
    const limitedFn = limit(mockFn, 1000);
    limitedFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    limitedFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
  it('应该处理边界情况', () => {
    const mockFn = jest.fn();
    const limitedFn = limit(mockFn, 0);
    limitedFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1);
    limitedFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
  it('在高负载情况下应保持性能', () => {
    const mockFn = jest.fn();
    const limitedFn = limit(mockFn, 1000);
    for (let i = 0; i < 100; i++) {
      limitedFn();
    }
    expect(mockFn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    limitedFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});

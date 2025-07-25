import { delay } from '../src';

describe('delay', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('basic', () => {
    const fn = jest.fn();
    delay(fn, 100);
    expect(fn).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('取消定时器', () => {
    const fn = jest.fn();
    const timerId = delay(fn, 100);
    expect(fn).toHaveBeenCalledTimes(0);

    clearTimeout(timerId);
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it('延迟 0 毫秒', () => {
    const fn = jest.fn();
    delay(fn, 0);
    expect(fn).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('测试参数', () => {
    let sum = 0;
    const fn = jest.fn((a: number, b: number) => (sum = a + b));
    delay(fn, 100, 1, 2);

    expect(sum).toBe(0);
    jest.advanceTimersByTime(100);
    expect(sum).toBe(3);
  });

  it('非函数报异常', () => {
    const errorFunc = function () {
      // @ts-ignore
      return delay(1, 'a');
    };
    expect(errorFunc).toThrow('Expected a function');
  });
});

import { throttle } from '../src';

describe('throttle', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('节流', () => {
    const fn = jest.fn((value: string) => value);
    const throttled = throttle(fn, 100);

    const result1 = [throttled('a'), throttled('b'), throttled('c')];

    expect(fn).toBeCalledTimes(1);
    expect(result1).toEqual(['a', 'a', 'a']);

    jest.advanceTimersByTime(100);

    expect(fn).toBeCalledTimes(2);

    const result2 = [throttled('d'), throttled('e'), throttled('f')];
    expect(result2).toEqual(['d', 'd', 'd']);

    expect(fn).toBeCalledTimes(3);
    jest.advanceTimersByTime(100);
    expect(fn).toBeCalledTimes(4);
    expect(throttled('g')).toBe('g');
    expect(fn).toBeCalledTimes(5);
  });

  it('等待时间内调用', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled();
    expect(fn).toBeCalledTimes(1);

    jest.advanceTimersByTime(50);
    throttled();
    expect(fn).toBeCalledTimes(1);

    throttled();
    expect(fn).toBeCalledTimes(1);

    jest.advanceTimersByTime(50);
    expect(fn).toBeCalledTimes(2);

    jest.advanceTimersByTime(100);
    expect(fn).toBeCalledTimes(2);

    throttled();
    expect(fn).toBeCalledTimes(3);

    jest.advanceTimersByTime(80);
    throttled();
    expect(fn).toBeCalledTimes(3);

    jest.advanceTimersByTime(20);
    expect(fn).toBeCalledTimes(4);
  });

  it('`wait` 毫秒内执行一次', () => {
    const fn = jest.fn((value: string) => value);
    const throttled = throttle(fn, 100);

    expect(fn).toBeCalledTimes(0);

    let result = throttled('a');
    expect(fn).toBeCalledTimes(1);
    expect(result).toBe('a');

    result = throttled('b');
    expect(fn).toBeCalledTimes(1);
    expect(result).toBe('a');

    jest.advanceTimersByTime(99);

    expect(fn).toBeCalledTimes(1);
    expect(result).toBe('a');

    result = throttled('c');
    expect(fn).toBeCalledTimes(1);
    expect(result).toBe('a');

    jest.advanceTimersByTime(1);

    expect(fn).toBeCalledTimes(2);
    expect(result).toBe('a');

    result = throttled('d');
    result = throttled('e');
    result = throttled('f');
    expect(result).toBe('c');
    expect(fn).toBeCalledTimes(2);

    jest.advanceTimersByTime(100);
    expect(result).toBe('c');
    expect(fn).toBeCalledTimes(3);

    // 立即执行
    result = throttled('g');
    expect(fn).toBeCalledTimes(4);
    expect(result).toBe('g');
  });

  it('返回最后一次执行的结果', () => {
    const fn = jest.fn((value: string) => value);
    const throttled = throttle(fn, 100);

    let result = throttled('a');
    result = throttled('b');

    expect(result).toBe('a');
    jest.advanceTimersByTime(100);
  });

  it('延迟时间为 `0` 没有节流效果', () => {
    const fn = jest.fn((value: string) => value);
    const throttled = throttle(fn);

    throttled('a');
    throttled('a');
    throttled('a');
    expect(fn).toBeCalledTimes(3);

    jest.advanceTimersByTime(1);
    throttled('a');
    throttled('a');
    expect(fn).toBeCalledTimes(5);
  });

  it('延迟时间为 `0` ，不立即执行', () => {
    const fn = jest.fn((value: string) => value);
    const throttled = throttle(fn, 0, false);

    throttled('a');
    throttled('a');
    throttled('a');
    expect(fn).toBeCalledTimes(0);

    jest.advanceTimersByTime(1);
    expect(fn).toBeCalledTimes(1);

    throttled('a');
    throttled('a');

    jest.advanceTimersByTime(1);
    expect(fn).toBeCalledTimes(2);
  });

  it('延迟时间不为 `0` ，不立即执行', () => {
    const fn = jest.fn((value: string) => value);
    const throttled = throttle(fn, 100, false);

    throttled('a');
    expect(fn).toBeCalledTimes(0);

    jest.advanceTimersByTime(100);
    expect(fn).toBeCalledTimes(1);

    throttled('b');
    throttled('c');
    expect(fn).toBeCalledTimes(1);

    jest.advanceTimersByTime(100);
    expect(fn).toBeCalledTimes(2);
  });

  it('测试 `flush` `cancel` `pending` 方法', () => {
    const fn = jest.fn((value: string) => value);
    const throttled = throttle(fn, 100);

    let result = throttled('a');

    expect(result).toBe('a');
    expect(fn).toBeCalledTimes(1);

    expect(throttled.pending()).toBe(false);
    // 再次执行 flush 直接返回之前的结果
    result = throttled.flush();
    expect(throttled.pending()).toBe(false);
    expect(result).toBe('a');
    expect(fn).toBeCalledTimes(1);

    result = throttled('b');
    expect(throttled.pending()).toBe(true);
    result = throttled.flush();
    expect(throttled.pending()).toBe(false);
    expect(result).toBe('b');
    expect(fn).toBeCalledTimes(2);

    result = throttled('c');
    expect(throttled.pending()).toBe(true);
    expect(result).toBe('b');
    expect(fn).toBeCalledTimes(2);

    // 取消执行延迟函数
    throttled.cancel();
    expect(throttled.pending()).toBe(false);
    jest.advanceTimersByTime(100);
    expect(result).toBe('b');
    expect(fn).toBeCalledTimes(2);
  });

  it('非函数报异常', () => {
    const errorFunc = function () {
      // @ts-ignore
      return throttle(1, 'a');
    };
    expect(errorFunc).toThrow('Expected a function');
  });
});

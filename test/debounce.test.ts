import { debounce } from '../src';

describe('debounce', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('防抖动', () => {
    const fn = jest.fn((value: string) => value);
    const debounced = debounce(fn, 100);

    const result1 = [debounced('a'), debounced('b'), debounced('c')];

    expect(fn).toBeCalledTimes(0);
    expect(result1).toEqual([undefined, undefined, undefined]);

    jest.advanceTimersByTime(100);

    expect(fn).toBeCalledTimes(1);
    expect(result1).toEqual([undefined, undefined, undefined]);

    // 返回上一次执行的结果
    const result2 = [debounced('d'), debounced('e'), debounced('f')];
    expect(result2).toEqual(['c', 'c', 'c']);

    jest.advanceTimersByTime(100);
    expect(fn).toBeCalledTimes(2);
    expect(debounced('g')).toBe('f');
  });

  it('延迟前调用', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100, true);

    expect(fn).toBeCalledTimes(0);
    debounced();
    expect(fn).toBeCalledTimes(1);

    debounced();
    expect(fn).toBeCalledTimes(1);

    jest.advanceTimersByTime(50);
    expect(fn).toBeCalledTimes(1);

    jest.advanceTimersByTime(50);
    expect(fn).toBeCalledTimes(2);
  });

  it('上一次调用的 `wait` 后执行', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    expect(fn).toBeCalledTimes(0);

    debounced();
    expect(fn).toBeCalledTimes(0);

    jest.advanceTimersByTime(99);
    expect(fn).toBeCalledTimes(0);

    debounced('a');
    expect(fn).toBeCalledTimes(0);

    jest.advanceTimersByTime(99);
    expect(fn).toBeCalledTimes(0);

    jest.advanceTimersByTime(1);
    expect(fn).toBeCalledTimes(1);
  });

  it('返回最后一次执行的结果', () => {
    const fn = jest.fn((value: string) => value);
    const debounced = debounce(fn, 100);

    let result = debounced('a');

    expect(result).toBeUndefined();
    jest.advanceTimersByTime(100);

    result = debounced('b');
    expect(result).toBe('a');

    jest.advanceTimersByTime(100);
    result = debounced('c');
    expect(result).toBe('b');
  });

  it('延迟时间为 `0`', () => {
    const fn = jest.fn((value: string) => value);
    const debounced = debounce(fn);

    debounced('a');
    debounced('a');
    expect(fn).toBeCalledTimes(0);

    jest.advanceTimersByTime(1);
    expect(fn).toBeCalledTimes(1);
  });

  it('延迟开始前调用', () => {
    const fn = jest.fn((value: string) => value);
    const debounced = debounce(fn, 100, true);

    debounced('a');

    expect(fn).toBeCalledTimes(1);

    jest.advanceTimersByTime(100);
    debounced('b');
    debounced('c');

    expect(fn).toBeCalledTimes(2);
    jest.advanceTimersByTime(100);
    expect(fn).toBeCalledTimes(3);
  });

  it('测试 `flush` `cancel` `pending` 方法', () => {
    const fn = jest.fn((value: string) => value);
    const debounced = debounce(fn, 100);

    let result = debounced('a');

    expect(result).toBeUndefined();
    expect(fn).toBeCalledTimes(0);

    expect(debounced.pending()).toBe(true);
    result = debounced.flush();
    expect(debounced.pending()).toBe(false);
    expect(result).toBe('a');
    expect(fn).toBeCalledTimes(1);

    // 再次执行 flush 直接返回之前的结果
    expect(debounced.pending()).toBe(false);
    result = debounced.flush();
    expect(debounced.pending()).toBe(false);
    expect(result).toBe('a');
    expect(fn).toBeCalledTimes(1);

    result = debounced('b');
    expect(debounced.pending()).toBe(true);
    expect(result).toBe('a');
    expect(fn).toBeCalledTimes(1);

    // 取消执行延迟函数
    debounced.cancel();
    expect(debounced.pending()).toBe(false);
    jest.advanceTimersByTime(100);
    expect(result).toBe('a');
    expect(fn).toBeCalledTimes(1);
  });

  it('非函数报异常', () => {
    const errorFunc = function () {
      // @ts-ignore
      return debounce(1, 'a');
    };
    expect(errorFunc).toThrow('Expected a function');
  });
});

import { sleep } from '../src';

describe('sleep', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('promise', () => {
    const start = Date.now();
    sleep().then(() => {
      const end = Date.now();
      const elapsedTime = end - start;
      expect(elapsedTime).toBe(1000);
    });

    jest.advanceTimersByTime(1000);
  });

  it('async/await', async () => {
    const start = Date.now();
    jest.advanceTimersByTimeAsync(1000);
    await sleep();
    const end = Date.now();
    const elapsedTime = end - start;
    expect(elapsedTime).toBe(1000);
  });

  it('自定义时间 promise', () => {
    const time = 300;

    const start = Date.now();
    sleep(time).then(() => {
      const end = Date.now();
      const elapsedTime = end - start;
      expect(elapsedTime).toBe(time);
    });

    jest.advanceTimersByTimeAsync(time);
  });

  it('自定义时间 async/await', async () => {
    const time = 300;

    const start = Date.now();
    jest.advanceTimersByTimeAsync(time);
    await sleep(time);
    const end = Date.now();
    const elapsedTime = end - start;
    expect(elapsedTime).toBe(time);
  });
});

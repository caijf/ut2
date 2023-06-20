import { randomInt, times, isInteger } from '../src';

describe('randomInt', () => {
  it('默认生成 `0` 到 `1` 之间的随机数', () => {
    const arr = times(100);
    const min = 0;
    const max = 1;
    arr.forEach(() => {
      const rand = randomInt();
      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThanOrEqual(max);
      expect(isInteger(rand)).toBe(true);
    });
  });

  it('指定范围的随机整数', () => {
    const arr = times(100);
    const min = 2;
    const max = 6;

    arr.forEach(() => {
      const rand = randomInt(min, max);
      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThanOrEqual(max);
      expect(isInteger(rand)).toBe(true);
    });

    arr.forEach(() => {
      const rand = randomInt(0.5, 2.2);
      expect(rand).toBeGreaterThanOrEqual(0);
      expect(rand).toBeLessThanOrEqual(2);
      expect(isInteger(rand)).toBe(true);
    });
  });

  it('上下限参数交换', () => {
    const arr = times(100);
    const min = 2;
    const max = 6;

    arr.forEach(() => {
      const rand = randomInt(max, min);
      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThanOrEqual(max);
      expect(isInteger(rand)).toBe(true);
    });

    arr.forEach(() => {
      const rand = randomInt(2.2, 0.5);
      expect(rand).toBeGreaterThanOrEqual(1);
      expect(rand).toBeLessThanOrEqual(2);
      expect(isInteger(rand)).toBe(true);
    });
  });

  it('上限与下限相等，返回该值', () => {
    expect(randomInt(0, 0)).toBe(0);
    expect(randomInt(1, 1)).toBe(1);
    expect(randomInt(-1, -1)).toBe(-1);
    expect(randomInt(NaN, NaN)).toBe(0);
    // @ts-ignore
    expect(randomInt('0', NaN)).toBe(0);
    // @ts-ignore
    expect(randomInt(NaN, '0')).toBe(0);
  });

  it('如果指定范围小于 `1` ，上下限取整数值相等', () => {
    const arr = times(100);

    arr.forEach(() => {
      const rand = randomInt(1.5, 2.1);
      expect(rand).toBe(2);
    });
  });

  it('如果指定范围小于 `1` ，上下限取整数值不相等', () => {
    const arr = times(100);

    arr.forEach(() => {
      const rand = randomInt(1.2, 1.3);
      expect(rand).toBeGreaterThanOrEqual(1);
      expect(rand).toBeLessThanOrEqual(2);
      expect(isInteger(rand)).toBe(true);
    });
  });

  it('错误的参数', () => {
    // @ts-ignore
    expect(randomInt('a', 'b')).toBe(0);
    expect(randomInt(NaN, 5)).toBeLessThanOrEqual(5);
    expect(randomInt(NaN, 5)).toBeGreaterThanOrEqual(0);

    expect(randomInt(5, NaN)).toBeLessThanOrEqual(5);
    expect(randomInt(5, NaN)).toBeGreaterThanOrEqual(0);

    // @ts-ignore
    expect(randomInt(Symbol(), {})).toBe(0);
  });
});

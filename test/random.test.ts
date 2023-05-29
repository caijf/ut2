import { random, times } from '../src';

describe('random', () => {
  it('默认生成 `0` 到 `1` 之间的随机数', () => {
    const arr = times(100);
    const min = 0;
    const max = 1;
    arr.forEach(() => {
      const rand = random();
      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThanOrEqual(max);
    });
  });
  it('指定范围的随机数', () => {
    const arr = times(100);
    const min = 2;
    const max = 6;

    arr.forEach(() => {
      const rand = random(min, max);
      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThanOrEqual(max);
    });

    arr.forEach(() => {
      const rand = random(1.5, 1.6);
      expect(rand).toBeGreaterThanOrEqual(1.5);
      expect(rand).toBeLessThanOrEqual(1.6);
    });
  });
  it('指定范围的随机整数', () => {
    const arr = times(100);
    const min = 2;
    const max = 6;

    arr.forEach(() => {
      const rand = random(min, max, false);
      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThanOrEqual(max);
      expect(rand).toBe(Math.floor(rand));
    });

    arr.forEach(() => {
      const rand = random(0.5, 2.2, false);
      expect(rand).toBeGreaterThanOrEqual(0.5);
      expect(rand).toBeLessThanOrEqual(2.2);
      expect(rand).toBe(Math.floor(rand));
    });
  });
  it('上限与下限相等，返回该值', () => {
    expect(random(0, 0)).toBe(0);
    expect(random(1, 1)).toBe(1);
    expect(random(-1, -1)).toBe(-1);
    expect(random(0.2, 0.2)).toBe(0.2);
    expect(random(NaN, NaN)).toBe(0);
    // @ts-ignore
    expect(random('0', NaN)).toBe(0);
    // @ts-ignore
    expect(random(NaN, '0')).toBe(0);
  });
  it('如果指定范围小于 `1` ，强制返回随机浮点数', () => {
    const arr = times(100);
    const min = 1.5;
    const max = 2.1;

    arr.forEach(() => {
      const rand = random(min, max, false);
      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThanOrEqual(max);
      expect(rand).not.toBe(Math.floor(rand));
      expect(rand).not.toBe(Math.ceil(rand));
    });
  });
  it('错误的参数', () => {
    // @ts-ignore
    expect(random('a', 'b')).toBe(0);
    expect(random(NaN, 5)).toBeLessThanOrEqual(5);
    expect(random(NaN, 5)).toBeGreaterThanOrEqual(0);

    expect(random(5, NaN)).toBeLessThanOrEqual(5);
    expect(random(5, NaN)).toBeGreaterThanOrEqual(0);
  });
});

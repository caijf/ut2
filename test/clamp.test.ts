import { clamp } from '../src';

describe('clamp', () => {
  it('限制整数范围', () => {
    expect(clamp(10, -5, 5)).toBe(5);
    expect(clamp(-10, -5, 5)).toBe(-5);
    expect(clamp(-Infinity, -5, 5)).toBe(-5);
  });
  it('限制小数范围', () => {
    expect(clamp(10.2, -5.2, 5.2)).toBe(5.2);
    expect(clamp(Infinity, -5.2, 5.2)).toBe(5.2);
  });
  it('仅限制上限', () => {
    expect(clamp(10, 5)).toBe(5);
    expect(clamp(-10, 5)).toBe(-10);
    expect(clamp(-Infinity, 5)).toBe(-Infinity);
    expect(clamp(10.2, 5.2)).toBe(5.2);
    expect(clamp(Infinity, 5.2)).toBe(5.2);
  });
  it('返回 `0`', () => {
    expect(clamp(0, -5, 5)).toBe(0);
    expect(clamp(-10, 0, 5)).toBe(0);
    expect(clamp(10, -5, 0)).toBe(0);

    expect(clamp(10, -5, NaN)).toBe(0);
    expect(clamp(-10, NaN, 0)).toBe(0);
  });
  it('错误的参数', () => {
    expect(clamp(NaN, -5, 5)).toBeNaN();
    // @ts-ignore
    expect(clamp('a', -5, 5)).toBeNaN();
    // @ts-ignore
    expect(clamp(-10, 'a', 'a')).toBe(0);
    // @ts-ignore
    expect(clamp(-10, -5, 'a')).toBe(-5);
    // @ts-ignore
    expect(clamp(-10, 'a', 5)).toBe(0);
    // @ts-ignore
    expect(clamp('a', 'a', 'a')).toBeNaN();
  });
});

import { round } from '../src';

describe('round', () => {
  it('返回一个舍入的数字', () => {
    expect(round(4.006)).toBe(4);
  });

  it('显式设置精度为 `0` ，返回一个舍入的数字', () => {
    expect(round(4.006, 0)).toBe(4);
  });

  it('正向精度', () => {
    expect(round(4.006, 2)).toBe(4.01);
    expect(round(4.1, 2)).toBe(4.1);
  });

  it('反向精度', () => {
    expect(round(4160, -2)).toBe(4200);
    expect(round(51, -1)).toBe(50);
    expect(round(-55.59, -1)).toBe(-50);
    expect(round(-59, -1)).toBe(-50);
  });

  it('精度不是一个整数', () => {
    expect(round(4.006, NaN)).toBeNaN();
    expect(round(4.006, 1.1)).toBeNaN();
    // @ts-ignore
    expect(round(4.006, '+2')).toBe(4);
  });

  it('使用指数符号和精度', () => {
    expect(round(5e1, 2)).toBe(50);
    // @ts-ignore
    expect(round('5e1', 1)).toBe(50);
    // @ts-ignore
    expect(round('5e', 1)).toBeNaN();
    // @ts-ignore
    expect(round('5e1e1', 2)).toBeNaN();
  });

  it('保留 `0` 的符号', () => {
    expect(round(0)).toBe(0);
    expect(round(-0)).toBe(-0);
    // @ts-ignore
    expect(round('0')).toBe(0);
    // @ts-ignore
    expect(round('-0')).toBe(-0);
    expect(round(0, 1)).toBe(0);
    expect(round(-0, 1)).toBe(-0);
    // @ts-ignore
    expect(round('0', 1)).toBe(0);
    // @ts-ignore
    expect(round('-0', 1)).toBe(-0);
  });

  it('精度过大返回 `NaN`', () => {
    expect(round(10, 1000)).toBeNaN();
    expect(round(Number.MAX_SAFE_INTEGER, 293)).toBeNaN();
  });
});

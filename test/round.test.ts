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
    expect(round(-55.59, -1)).toBe(-60);
    expect(round(-59, -1)).toBe(-60);
  });

  it('精度不是一个整数', () => {
    expect(round(4.006, NaN)).toBe(4);
    expect(round(4.006, 1.1)).toBe(4);
    // @ts-ignore
    expect(round(4.006, '+2')).toBe(4.01);
  });

  it('使用指数符号和精度', () => {
    expect(round(5e1, 2)).toBe(50);
    // @ts-ignore
    expect(round('5e1', 1)).toBe(50);
    // @ts-ignore
    expect(round('5e', 1)).toBeNaN();
    // @ts-ignore
    expect(round('5e1e1', 2)).toBeNaN();
    expect(round(2.2e-7, 2)).toBe(0);
    expect(round(1.1111111111111111e21, 2)).toBe(1.1111111111111111e21);
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

  it('精度过大', () => {
    expect(round(10, 1000)).toBe(10);
    expect(round(Number.MAX_SAFE_INTEGER, 293)).toBe(Number.MAX_SAFE_INTEGER - 1);
  });

  it('错误的参数', () => {
    // @ts-ignore
    expect(round(Symbol())).toBeNaN();
    // @ts-ignore
    expect(round({})).toBeNaN();
  });
});

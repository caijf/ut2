import { floor } from '../src';

describe('floor', () => {
  it('返回一个舍入的数字', () => {
    expect(floor(4.006)).toBe(4);
  });

  it('显式设置精度为 `0` ，返回一个舍入的数字', () => {
    expect(floor(4.006, 0)).toBe(4);
  });

  it('正向精度', () => {
    expect(floor(4.006, 2)).toBe(4);
    expect(floor(4.1, 2)).toBe(4.1);
  });

  it('反向精度', () => {
    expect(floor(4160, -2)).toBe(4100);
    expect(floor(51, -1)).toBe(50);
    expect(floor(-55.59, -1)).toBe(-60);
    expect(floor(-59, -1)).toBe(-60);
  });

  it('精度不是一个整数', () => {
    expect(floor(4.006, NaN)).toBe(4);
    expect(floor(4.006, 1.1)).toBe(4);
    // @ts-ignore
    expect(floor(4.006, '+2')).toBe(4);
  });

  it('使用指数符号和精度', () => {
    expect(floor(5e1, 2)).toBe(50);
    // @ts-ignore
    expect(floor('5e1', 1)).toBe(50);
    // @ts-ignore
    expect(floor('5e', 1)).toBeNaN();
    // @ts-ignore
    expect(floor('5e1e1', 2)).toBeNaN();
    expect(floor(2.2e-7, 2)).toBe(0);
    expect(floor(1.1111111111111111e21, 2)).toBe(1.1111111111111111e21);
  });

  it('保留 `0` 的符号', () => {
    expect(floor(0)).toBe(0);
    expect(floor(-0)).toBe(-0);
    // @ts-ignore
    expect(floor('0')).toBe(0);
    // @ts-ignore
    expect(floor('-0')).toBe(-0);
    expect(floor(0, 1)).toBe(0);
    expect(floor(-0, 1)).toBe(-0);
    // @ts-ignore
    expect(floor('0', 1)).toBe(0);
    // @ts-ignore
    expect(floor('-0', 1)).toBe(-0);
  });

  it('精度过大返回 `NaN`', () => {
    expect(floor(10, 1000)).toBe(10);
    expect(floor(Number.MAX_SAFE_INTEGER, 293)).toBe(Number.MAX_SAFE_INTEGER - 1);
  });

  it('错误的参数', () => {
    // @ts-ignore
    expect(floor(Symbol())).toBeNaN();
    // @ts-ignore
    expect(floor({})).toBeNaN();
  });
});

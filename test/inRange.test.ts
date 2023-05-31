import { inRange } from '../src';

describe('inRange', () => {
  it('basic', () => {
    expect(inRange(1, 1, 5)).toBe(true);
    expect(inRange(3, 1, 5)).toBe(true);
    expect(inRange(0, 1, 5)).toBe(false);
    expect(inRange(5, 1, 5)).toBe(false);

    expect(inRange(0.5, 0.2, 1.5)).toBe(true);
    expect(inRange(1.2, 1.1, 1.5)).toBe(true);
    expect(inRange(3.2, 1.5, 2.5)).toBe(false);
    expect(inRange(0.5, 1, 1.5)).toBe(false);
  });
  it('开始范围小于结束范围，正常执行', () => {
    expect(inRange(1, 5, 1)).toBe(true);
    expect(inRange(3, 5, 1)).toBe(true);
    expect(inRange(0, 5, 1)).toBe(false);
    expect(inRange(5, 5, 1)).toBe(false);
  });
  it('开始范围和结束范围一样，始终返回 `false`', () => {
    expect(inRange(1, 1, 1)).toBe(false);
    expect(inRange(0, 0, 0)).toBe(false);
    expect(inRange(0.1, 0.1, 0.1)).toBe(false);
    expect(inRange(0.3, 0.3, 0.3)).toBe(false);
    expect(inRange(1.1, 1.1, 1.1)).toBe(false);
  });
  it('仅限制一个范围', () => {
    expect(inRange(1, 5)).toBe(true);
    expect(inRange(3, 5)).toBe(true);
    expect(inRange(0, 5)).toBe(true);
    expect(inRange(5, 5)).toBe(false);

    expect(inRange(0.5, 1.5)).toBe(true);
    expect(inRange(1.2, 1.5)).toBe(true);
    expect(inRange(3.2, 2.5)).toBe(false);
    expect(inRange(0.5, 1.5)).toBe(true);

    expect(inRange(1, -5)).toBe(false);
    expect(inRange(3, -5)).toBe(false);
    expect(inRange(0, -5)).toBe(false);
    expect(inRange(5, -5)).toBe(false);

    expect(inRange(0.5, -1.5)).toBe(false);
    expect(inRange(1.2, -1.5)).toBe(false);
    expect(inRange(3.2, -2.5)).toBe(false);
    expect(inRange(0.5, -1.5)).toBe(false);
  });
  it('错误的参数', () => {
    // @ts-ignore
    expect(inRange(false, 0, 1)).toBe(true);
    // @ts-ignore
    expect(inRange(null, 0, 1)).toBe(true);
    // @ts-ignore
    expect(inRange('', 0, 1)).toBe(true);
    // @ts-ignore
    expect(inRange(NaN, 0, 1)).toBe(false);
    // @ts-ignore
    expect(inRange(true, 0, 1)).toBe(false);
    // @ts-ignore
    expect(inRange('1', 0, 1)).toBe(false);
    // @ts-ignore
    expect(inRange('1', NaN, 1)).toBe(false);
    // @ts-ignore
    expect(inRange('1', 0, NaN)).toBe(false);
  });
});

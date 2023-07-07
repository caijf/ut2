import { eq } from '../src';
import { symbol } from './_utils';

describe('eq', () => {
  it('使用 `SameValueZero` 对两个值进行比较', () => {
    // @ts-ignore
    expect(eq()).toBe(true);
    // @ts-ignore
    expect(eq(undefined)).toBe(true);
    expect(eq(0, +0)).toBe(true);
    expect(eq(0, -0)).toBe(true);
    expect(eq(-0, +0)).toBe(true);
    expect(eq(0n, -0n)).toBe(true);
    expect(eq(NaN, NaN)).toBe(true);
    expect(eq(1, 1)).toBe(true);
    expect(eq('a', 'a')).toBe(true);
    expect(eq(false, false)).toBe(true);
    expect(eq('', '')).toBe(true);

    // @ts-ignore
    expect(eq(null)).toBe(false);
    expect(eq(null, undefined)).toBe(false);
    expect(eq(1, Object(1))).toBe(false);
    expect(eq(1, '1')).toBe(false);

    const obj = { a: 1 };
    expect(eq(obj, obj)).toBe(true);
    expect(eq(obj, { a: 1 })).toBe(false);
  });

  it('`Symbol` 值', () => {
    expect(eq(symbol, 1)).toBe(false);
    expect(eq(symbol, {})).toBe(false);
    expect(eq(symbol, [])).toBe(false);
    expect(eq(symbol, null)).toBe(false);
    expect(eq(symbol, symbol)).toBe(true);
  });

  it('strictCheck', () => {
    expect(eq(0, +0, true)).toBe(true);
    expect(eq(0n, -0n, true)).toBe(true);
    expect(eq(NaN, NaN, true)).toBe(true);

    expect(eq(0, -0, true)).toBe(false);
    expect(eq(-0, +0, true)).toBe(false);
  });
});

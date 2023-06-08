import { eq } from '../src';

describe('eq', () => {
  it('使用 `SameValueZero` 对两个值进行比较', () => {
    // @ts-ignore
    expect(eq()).toBe(true);
    // @ts-ignore
    expect(eq(undefined)).toBe(true);
    expect(eq(0, -0)).toBe(true);
    expect(eq(0, +0)).toBe(true);
    expect(eq(-0, +0)).toBe(true);
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
});

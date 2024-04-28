import { isBigInt } from '../src';
import { args, falsy, noop, symbol, truthy } from './_utils';

describe('isBigInt', () => {
  it('检测 bigint 值，返回 true', () => {
    expect(isBigInt(0n)).toBe(true);
    expect(isBigInt(1n)).toBe(true);
    expect(isBigInt(BigInt(1))).toBe(true);
    expect(isBigInt(BigInt('1'))).toBe(true);
    expect(isBigInt(Object(1n))).toBe(true);
    expect(isBigInt(BigInt('9007199254740991'))).toBe(true);
    expect(isBigInt(BigInt('0x1fffffffffffff'))).toBe(true);
    expect(isBigInt(BigInt('0o377777777777777777'))).toBe(true);
    expect(isBigInt(BigInt('0b11111111111111111111111111111111111111111111111111111'))).toBe(true);
  });

  it('非 bigint 值', () => {
    falsy.forEach((item) => {
      expect(isBigInt(item)).toBe(item === 0n);
    });
    truthy.forEach((item) => {
      expect(isBigInt(item)).toBe(item === 12n);
    });

    expect(isBigInt(args)).toBe(false);
    expect(isBigInt(noop())).toBe(false);
    expect(isBigInt([1, 2, 3])).toBe(false);
    expect(isBigInt(new Date())).toBe(false);
    expect(isBigInt(new Error())).toBe(false);
    expect(isBigInt({ a: 1, b: 2 })).toBe(false);
    expect(isBigInt(1)).toBe(false);
    expect(isBigInt('a')).toBe(false);
    expect(isBigInt(/x/)).toBe(false);
    expect(isBigInt(symbol)).toBe(false);
  });

  it('BigInt 与 Number', () => {
    // 比较
    // @ts-expect-error
    expect(1n === 1).toBe(false);
    // @ts-expect-error
    expect(1n == 1).toBe(true);
    // @ts-expect-error
    expect(0n === 0).toBe(false);
    // @ts-expect-error
    expect(0n == 0).toBe(true);
    expect(1n < 2).toBe(true);
    expect(2n > 1).toBe(true);
    expect(2n > 2).toBe(false);
    expect(2n >= 2).toBe(true);
    expect([4n, 6, -12n, 10, 4, 0, 0n].sort()).toEqual([-12n, 0, 0n, 10, 4n, 4, 6]);
    expect(0n === Object(0n)).toBe(false);
    expect(Object(0n) === Object(0n)).toBe(false);
    const o = Object(0n);
    expect(o === o).toBe(true);

    // 条件
    expect(0n || 12n).toBe(12n);
    expect(0n && 12n).toBe(0n);
    expect(Boolean(0n)).toBe(false);
    expect(Boolean(12n)).toBe(true);
    expect(!!0n).toBe(false);
    expect(!!12n).toBe(true);

    // 转化
    // expect(JSON.stringify(BigInt(1))).toBe('1'); // Uncaught TypeError: Do not know how to serialize a BigInt
    // @ts-expect-error
    BigInt.prototype.toJSON = function () {
      return this.toString();
    };
    expect(JSON.stringify(BigInt(1))).toBe('"1"');
  });
});

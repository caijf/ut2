import { isTypedArray } from '../src';
import { args, falsy, symbol } from './_utils';

describe('isTypedArray', () => {
  it('corrent', () => {
    const typedArrays = [
      new Float32Array(new ArrayBuffer(24)),
      new Float64Array(new ArrayBuffer(24)),
      new Int8Array(new ArrayBuffer(24)),
      new Int16Array(new ArrayBuffer(24)),
      new Int32Array(new ArrayBuffer(24)),
      new Uint8Array(new ArrayBuffer(24)),
      new Uint8ClampedArray(new ArrayBuffer(24)),
      new Uint16Array(new ArrayBuffer(24)),
      new Uint32Array(new ArrayBuffer(24)),
      new BigInt64Array(new ArrayBuffer(8)),
      new BigUint64Array(new ArrayBuffer(8))
    ];

    typedArrays.forEach((item) => {
      expect(isTypedArray(item)).toBe(true);
    });
  });

  it('incorrent', () => {
    falsy.forEach((item) => {
      expect(isTypedArray(item)).toBe(false);
    });

    expect(isTypedArray(args)).toBe(false);
    expect(isTypedArray([1, 2, 3])).toBe(false);
    expect(isTypedArray({ a: 1, b: 2 })).toBe(false);
    expect(isTypedArray(new Date())).toBe(false);
    expect(isTypedArray(new Error())).toBe(false);
    expect(isTypedArray(/x/)).toBe(false);
    expect(isTypedArray(symbol)).toBe(false);
    expect(isTypedArray('a')).toBe(false);
    expect(isTypedArray(1)).toBe(false);
    expect(isTypedArray(true)).toBe(false);
  });
});

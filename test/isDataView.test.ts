import { isDataView } from '../src';
import { args, falsy, symbol } from './_utils';

describe('isDataView', () => {
  it('correct', () => {
    if (typeof DataView !== 'undefined') {
      const dv = new DataView(new ArrayBuffer(8));
      expect(isDataView(dv)).toBe(true);
    }
  });

  it('incorrect', () => {
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
      expect(isDataView(item)).toBe(false);
    });

    falsy.forEach((item) => {
      expect(isDataView(item)).toBe(false);
    });

    expect(isDataView(args)).toBe(false);
    expect(isDataView([1, 2, 3])).toBe(false);
    expect(isDataView({ a: 1, b: 2 })).toBe(false);
    expect(isDataView(new Date())).toBe(false);
    expect(isDataView(new Error())).toBe(false);
    expect(isDataView(/x/)).toBe(false);
    expect(isDataView(symbol)).toBe(false);
    expect(isDataView('a')).toBe(false);
    expect(isDataView(1)).toBe(false);
    expect(isDataView(true)).toBe(false);
  });
});

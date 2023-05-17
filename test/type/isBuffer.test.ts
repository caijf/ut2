import { isBuffer } from '../../src';
import { args, falsy, symbol, truthy } from '../_utils';

describe('isBuffer', () => {
  it('corrent', () => {
    expect(isBuffer(new Buffer(2))).toBe(true);
  });

  it('incorrent', () => {
    falsy.forEach((item) => {
      expect(isBuffer(item)).toBe(false);
    });

    truthy.forEach((item) => {
      expect(isBuffer(item)).toBe(false);
    });

    expect(isBuffer(args)).toBe(false);
    expect(isBuffer([1, 2, 3])).toBe(false);
    expect(isBuffer({ a: 1, b: 2 })).toBe(false);
    expect(isBuffer(new Date())).toBe(false);
    expect(isBuffer(new Error())).toBe(false);
    expect(isBuffer(/x/)).toBe(false);
    expect(isBuffer(symbol)).toBe(false);
  });

  it('如果不存在 `Buffer`', () => {
    // @ts-ignore
    const spyBuffer = jest.spyOn(globalThis, 'Buffer').mockImplementation(() => undefined);

    expect(isBuffer(new Buffer(2))).toBe(false);

    spyBuffer.mockRestore();
  });
});

import { isBuffer } from '../src';
import { args, falsy, symbol, truthy } from './_utils';

describe('isBuffer', () => {
  const buf1 = Buffer.alloc(2);
  const buf2 = Buffer.from([1]);

  it('correct', () => {
    expect(isBuffer(buf1)).toBe(true);
    expect(isBuffer(buf2)).toBe(true);
  });

  it('incorrect', () => {
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

    expect(isBuffer(buf1)).toBe(false);
    expect(isBuffer(buf2)).toBe(false);

    spyBuffer.mockRestore();
  });
});

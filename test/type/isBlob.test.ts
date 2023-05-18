/**
 * @jest-environment jsdom
 */
import { isBlob } from '../../src';
import { falsy, symbol, truthy } from '../_utils';

describe('isBlob', () => {
  it('correct', () => {
    expect(isBlob(new Blob())).toBe(true);
    expect(isBlob(new Blob(['1']))).toBe(true);
    expect(isBlob(new Blob(['<a>html</a>'], { type: 'html/plain' }))).toBe(true);
    expect(isBlob(new Blob([new ArrayBuffer(8)]))).toBe(true);

    expect(isBlob(new File([], ''))).toBe(true);
  });

  it('incorrect', () => {
    falsy.forEach((item) => {
      expect(isBlob(item)).toBe(false);
    });

    truthy.forEach((item) => {
      expect(isBlob(item)).toBe(false);
    });

    expect(isBlob('abc')).toBe(false);
    expect(isBlob(1)).toBe(false);
    expect(isBlob([1])).toBe(false);
    expect(isBlob(['a'])).toBe(false);
    expect(isBlob(symbol)).toBe(false);
    expect(isBlob(new ArrayBuffer(8))).toBe(false);
    expect(isBlob(new Date())).toBe(false);
    expect(isBlob(new Error())).toBe(false);
    expect(isBlob(/x/)).toBe(false);
  });
});

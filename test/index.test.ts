import * as ut2 from '../src';
import pkg from '../package.json';

describe('index', () => {
  it('should be defined', () => {
    Object.keys(ut2).forEach((item) => {
      expect(ut2[item as keyof typeof ut2]).toBeDefined();
    });
  });

  it('const', () => {
    expect(ut2.VERSION).toBe(pkg.version);
    expect(ut2.MAX_ARRAY_LENGTH).toBe(4294967295);
    expect(ut2.MAX_SAFE_INTEGER).toBe(9007199254740991);
    expect(ut2.MIN_SAFE_INTEGER).toBe(-9007199254740991);
  });
});

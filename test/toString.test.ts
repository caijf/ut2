import { toString } from '../src';

describe('toString', () => {
  it('字符串', () => {
    const values = ['a', '', '_'];
    values.forEach((item) => {
      expect(toString(item)).toBe(item);
    });
  });

  it('数字', () => {
    const values = [1, 2, 3];
    values.forEach((item) => {
      expect(toString(item)).toBe('' + item);
    });
  });

  it('`null` `undefined` 转为空字符串', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    values.forEach((item) => {
      expect(toString(item)).toBe('');
    });
  });

  it('`null` `undefined` 在数组中正常返回 `null` `undefined`', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(toString([, null, undefined])).toBe(',null,undefined');
  });

  it('带符号的 `0`', () => {
    const values = [-0, Object(-0), 0, Object(0), +0, '+0'];
    const result = ['-0', '-0', '0', '0', '0', '+0'];
    values.forEach((item, i) => {
      expect(toString(item)).toBe(result[i]);
    });
  });

  it('带符号的 `0` 在数组中', () => {
    expect(toString([-0, Object(-0), 0, Object(0), +0, '+0'])).toBe('-0,-0,0,0,0,+0');
  });

  it('`Symbol` 类型转字符串', () => {
    expect(toString(Symbol('a'))).toBe('Symbol(a)');
    expect(toString(Symbol.for('a'))).toBe('Symbol(a)');
  });
});

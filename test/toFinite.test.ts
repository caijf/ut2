import { toFinite } from '../src';
import { symbol } from './_utils';

describe('toFinite', () => {
  it('basic', () => {
    expect(toFinite(3.2)).toBe(3.2);
    expect(toFinite('3.2')).toBe(3.2);
    expect(toFinite(-0)).toBe(-0);
    expect(toFinite('-0')).toBe(-0);
    expect(toFinite('0')).toBe(0);
    expect(toFinite(NaN)).toBe(0);
    expect(toFinite(Infinity)).toBe(Number.MAX_VALUE);
    expect(toFinite(-Infinity)).toBe(-Number.MAX_VALUE);
  });

  it('带符号的 `0`', () => {
    expect(toFinite(0)).toBe(0);
    expect(toFinite(-0)).toBe(-0);
    expect(toFinite('0')).toBe(0);
    expect(toFinite('-0')).toBe(-0);
  });

  it('原始数字类型', () => {
    const values = [0, 1, 1.2, -1, -1.2, NaN, Infinity, -Infinity, Number.MIN_VALUE];
    const result = [0, 1, 1.2, -1, -1.2, 0, Number.MAX_VALUE, -Number.MAX_VALUE, Number.MIN_VALUE];
    values.forEach((item, i) => {
      expect(toFinite(item)).toBe(result[i]);
    });
  });

  it('字符串转数字', () => {
    const values = ['10', '1.234567890', Number.MAX_SAFE_INTEGER + '', '1e+308', '1e308', '1E308', '5e-324', '5E-324', 'Infinity', 'NaN'];
    const result = [10, 1.23456789, Number.MAX_SAFE_INTEGER, 1e308, 1e308, 1e308, 5e-324, 5e-324, Number.MAX_VALUE, 0];
    values.forEach((item, i) => {
      expect(toFinite(item)).toBe(result[i]);
    });
  });

  it('二/八/十六进制转十进制', () => {
    const values = ['0b101010', '0B101010', '0b101', '0o12345', '0O12345', '0o1', '0x1a2b3c', '0X1a2b3c', '-0X1a2b3c'];
    const result = [42, 42, 5, 5349, 5349, 1, 1715004, 1715004, 0];
    values.forEach((item, i) => {
      expect(toFinite(item)).toBe(result[i]);
    });
  });

  it('`Symbol` 类型转为 `0`', () => {
    expect(toFinite(symbol)).toBe(0);
  });

  it('空字符、空格、undefined、null转数字', () => {
    expect(toFinite('')).toBe(0);
    expect(toFinite(' ')).toBe(0);
    expect(toFinite(undefined)).toBe(0);
    // @ts-ignore
    expect(toFinite()).toBe(0);
    expect(toFinite(null)).toBe(0);
  });

  it('隐式转换', () => {
    const values1: any[] = [{}, [], [1], [1, 2]];
    const result1 = [0, 0, 1, 0];
    values1.forEach((item, i) => {
      expect(toFinite(item)).toBe(result1[i]);
    });

    const values2: any[] = [
      { valueOf: '1.1' },
      {
        valueOf: '1.1',
        toString() {
          return '2.2';
        }
      },
      {
        valueOf() {
          return '1.1';
        },
        toString: '2.2'
      },
      {
        valueOf() {
          return '1.1';
        },
        toString() {
          return '2.2';
        }
      },
      {
        valueOf() {
          return '-0x1a2b3c';
        }
      },
      {
        toString() {
          return '-0x1a2b3c';
        }
      },
      {
        valueOf() {
          return '0x1a2b3c';
        }
      },
      {
        toString() {
          return '0x1a2b3c';
        }
      },
      {
        valueOf() {
          return '0o12345';
        }
      },
      {
        toString() {
          return '0o12345';
        }
      },
      {
        valueOf() {
          return '0b101010';
        }
      },
      {
        toString() {
          return '0b101010';
        }
      }
    ];
    const result2 = [0, 2.2, 1.1, 1.1, 0, 0, 1715004, 1715004, 5349, 5349, 42, 42];
    values2.forEach((item, i) => {
      expect(toFinite(item)).toBe(result2[i]);
    });
  });
});

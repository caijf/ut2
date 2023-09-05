jest.mock('../../src/internals/native.ts', () => {
  const originalModule = jest.requireActual('../../src/internals/native.ts');

  return {
    ...originalModule,
    symbolProto: undefined
  };
});

import { toString } from '../../src';

describe('toString 不支持 Symbol 转字符串', () => {
  it('`Symbol` 类型转字符串', () => {
    expect(toString(Symbol('a'))).toBe('');
    expect(toString(Symbol.for('a'))).toBe('');
  });
});

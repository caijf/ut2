/**
 * @jest-environment jsdom
 */
const nativeActual = jest.requireActual('../../src/internals/native.ts');
jest.mock('../../src/internals/native.ts', () => ({
  ...nativeActual,
  symbolProto: undefined
}));
import { isEqual } from '../../src';

// import '../isEqual.test';

describe('isEqual inspect', () => {
  it('比较 DOM 元素', () => {
    const element1 = document.createElement('div');
    const element2 = element1.cloneNode(true);
    const element3 = document.createElement('div');

    expect(isEqual(element1, element2)).toBe(true);
    expect(isEqual(element1, element3)).toBe(true);
    expect(isEqual(element1, document.createElement('span'))).toBe(false);
  });

  it('symbol 包装类型', () => {
    expect(isEqual(Symbol.for('a'), Object(Symbol.for('a')))).toBe(false);
  });
});

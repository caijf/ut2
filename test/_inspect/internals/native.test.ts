import { toSource, initSource } from '../../../src/internals/native';

describe('toSource', () => {
  it('incorrent', () => {
    expect(toSource(null)).toBe('');
    expect(toSource(undefined)).toBe('undefined');

    const obj = {
      toString() {
        throw new Error('some error');
      }
    };
    expect(toSource(obj)).toBe('');
  });
});

describe('initSource', () => {
  it('non exited', () => {
    expect(initSource(false, 'abc')).toBe('');
  });
});

describe('MAX_SAFE_INTEGER, MIN_SAFE_INTEGER', () => {
  // @ts-ignore
  const spyNumber = jest.spyOn(globalThis, 'Number').mockImplementation(() => ({
    MAX_SAFE_INTEGER: undefined,
    MIN_SAFE_INTEGER: undefined
  }));

  const { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } = jest.createMockFromModule<any>(
    '../../../src/internals/native'
  );

  expect(MAX_SAFE_INTEGER).toBe(9007199254740991);
  expect(MIN_SAFE_INTEGER).toBe(-9007199254740991);

  spyNumber.mockRestore();
});

const sym = Symbol;
// @ts-ignore
// eslint-disable-next-line no-global-assign
Symbol = undefined;

describe('symbol', () => {
  afterAll(() => {
    // @ts-ignore
    // eslint-disable-next-line no-global-assign
    Symbol = sym;
  });

  it('symbol is undefined', () => {
    expect(Symbol).toBeUndefined();
  });
});

describe('MAX_SAFE_INTEGER, MIN_SAFE_INTEGER', () => {
  // @ts-ignore
  const spyNumber = jest.spyOn(globalThis, 'Number').mockImplementation(() => ({
    MAX_SAFE_INTEGER: undefined,
    MIN_SAFE_INTEGER: undefined
  }));

  const { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } = jest.createMockFromModule<any>('../../../src/internals/native');

  expect(MAX_SAFE_INTEGER).toBe(9007199254740991);
  expect(MIN_SAFE_INTEGER).toBe(-9007199254740991);

  spyNumber.mockRestore();
});

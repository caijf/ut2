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
  // jest-mock >= 30.5 创建 mock 时访问 Symbol.dispose，调用 jest API 前需恢复全局 Symbol
  // @ts-ignore
  // eslint-disable-next-line no-global-assign
  Symbol = sym;
  // @ts-ignore
  const spyNumber = jest.spyOn(globalThis, 'Number').mockImplementation(() => ({
    MAX_SAFE_INTEGER: undefined,
    MIN_SAFE_INTEGER: undefined
  }));
  // @ts-ignore
  // eslint-disable-next-line no-global-assign
  Symbol = undefined;
  // 在无 Symbol、无 MAX/MIN_SAFE_INTEGER 的环境下真实求值，结果会被 jest 模块注册表缓存
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('../../../src/internals/native');
  // @ts-ignore
  // eslint-disable-next-line no-global-assign
  Symbol = sym;

  const { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } = jest.createMockFromModule<any>('../../../src/internals/native');

  expect(MAX_SAFE_INTEGER).toBe(9007199254740991);
  expect(MIN_SAFE_INTEGER).toBe(-9007199254740991);

  spyNumber.mockRestore();
  // 恢复无 Symbol 场景，供上方 symbol describe 的用例执行时断言
  // @ts-ignore
  // eslint-disable-next-line no-global-assign
  Symbol = undefined;
});

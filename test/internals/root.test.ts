import root from '../../src/internals/root';

describe('root', () => {
  it('should be defined', () => {
    expect(root).toBeDefined();
  });

  it('equal globalThis', () => {
    expect(root).toBe(globalThis);
  });
});

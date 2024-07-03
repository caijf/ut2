import { VERSION, isBrowser, root } from '../../src';
import pkg from '../../package.json';

describe('helpers', () => {
  it('VERSION', () => {
    expect(VERSION).toBe(pkg.version);
  });

  it('isBrowser', () => {
    expect(isBrowser).toBe(false);
  });

  it('root', () => {
    expect(root).toBe(globalThis);
  });
});

import { VERSION } from '../../src/internals/helpers';
import pkg from '../../package.json';

describe('helpers', () => {
  it('VERSION', () => {
    expect(VERSION).toBe(pkg.version);
  });
});

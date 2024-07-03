/**
 * @jest-environment jsdom
 */
import { root, isBrowser } from '../../../src';
import { toSource } from '../../../src/internals/helpers';

describe('helpers inspect', () => {
  it('toSource incorrect', () => {
    expect(toSource(null)).toBe('');
    expect(toSource(undefined)).toBe('undefined');

    const obj = {
      toString() {
        throw new Error('some error');
      }
    };
    expect(toSource(obj)).toBe('');
  });

  it('isBrowser', () => {
    expect(isBrowser).toBe(true);
  });

  it('root', () => {
    expect(root).toBe(globalThis);
    expect(root).toBe(window);
    expect(root).toBe(self);
  });
});

import { toSource } from '../../../src/internals/helpers';

describe('toSource', () => {
  it('incorrect', () => {
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

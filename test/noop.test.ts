import { noop } from '../src';

describe('noop', () => {
  it('返回 `undeinfed`', () => {
    expect(noop()).toBeUndefined();
  });
});

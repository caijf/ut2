import { defaultTo } from '../src';
import { falsy } from './_utils';

describe('defaultTo', () => {
  it('basic', () => {
    const expected = falsy.map((item) => (item == null || item !== item ? 1 : item));
    const actual = falsy.map((item) => defaultTo(item, 1));

    expect(expected).toEqual(actual);

    expect(defaultTo(undefined, null)).toBeNull();
    expect(defaultTo(null, null)).toBeNull();
    expect(defaultTo(NaN, null)).toBeNull();

    expect(defaultTo(undefined, undefined)).toBeUndefined();
    expect(defaultTo(null, undefined)).toBeUndefined();
    expect(defaultTo(NaN, undefined)).toBeUndefined();

    expect(defaultTo(undefined, NaN)).toBeNaN();
    expect(defaultTo(null, NaN)).toBeNaN();
    expect(defaultTo(NaN, NaN)).toBeNaN();
  });
});

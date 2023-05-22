import { isString, pickBy } from '../../src';
import { symbol } from '../_utils';

describe('pickBy', () => {
  const obj = { name: 'jeff', age: 18, [symbol]: 'some val' };

  it('basic', () => {
    expect(pickBy(obj)).toEqual({});
    expect(pickBy(obj, isString)).toEqual({ name: 'jeff', [symbol]: 'some val' });

    // @ts-ignore
    expect(pickBy(null)).toEqual({});
    // @ts-ignore
    expect(pickBy(null, isString)).toEqual({});
  });

  it('不支持不可枚举的键值', () => {
    const o = Object.defineProperties(
      {},
      {
        name: {
          value: 'jeff',
          enumerable: false
        },
        age: {
          get() {
            return 18;
          },
          enumerable: true
        }
      }
    );

    expect(pickBy(o)).toEqual({});
    expect(pickBy(o, (v, k) => k === 'age')).toEqual({ age: 18 });
    expect(pickBy(o, (v, k) => k === 'name')).toEqual({});
  });
});

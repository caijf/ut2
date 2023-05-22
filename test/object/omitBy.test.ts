import { isString, omitBy } from '../../src';
import { symbol } from '../_utils';

describe('omitBy', () => {
  const obj = { name: 'jeff', age: 18, [symbol]: 'some val' };

  it('basic', () => {
    expect(omitBy(obj)).toEqual({});
    expect(omitBy(obj, isString)).toEqual({ age: 18 });
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

    expect(omitBy(o)).toEqual({});
    expect(omitBy(o, (v, k) => k === 'age')).toEqual({});
    expect(omitBy(o, (v, k) => k === 'name')).toEqual({ age: 18 });
  });
});

import { min } from '../src';

describe('min', () => {
  it('basic', () => {
    const array = [1, 2, 3];
    const expected1 = min(array);
    expect(expected1).toBe(1);

    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];
    const expected2 = min(objects, (item) => item.a);
    expect(expected2).toEqual({ a: 1 });

    const expected3 = min(objects, 'a');
    expect(expected3).toEqual({ a: 1 });
  });

  it('日期比较', () => {
    const date1 = new Date();
    const date2 = new Date(0); // 1970-01-01T00:00:00.000Z

    const array = [date1, date2];
    const objects = [{ d: date1 }, { d: date2 }];

    expect(min(array)).toBe(date2);
    expect(min(objects, (item) => item.d)).toEqual({ d: date2 });
    expect(min(objects, 'd')).toEqual({ d: date2 });
  });

  it('字符串比较', () => {
    const array = ['a', 'b'];
    const objects = [{ n: 'a' }, { n: 'b' }];

    expect(min(array)).toBe('a');
    expect(min(objects, (item) => item.n)).toEqual({ n: 'a' });
    expect(min(objects, 'n')).toEqual({ n: 'a' });
  });

  it('错误的参数', () => {
    const values = [null, undefined, '', {}, NaN, 1, true, false];

    values.forEach((item) => {
      // @ts-ignore
      expect(min(item)).toBeUndefined();
    });
  });
});

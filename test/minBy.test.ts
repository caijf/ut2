import { minBy } from '../src';

describe('minBy', () => {
  it('basic', () => {
    const array = [1, 2, 3];
    expect(minBy(array)).toBe(1);

    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];
    expect(minBy(objects, (item) => item.a)).toEqual({ a: 1 });

    expect(minBy(objects, 'a')).toEqual({ a: 1 });
  });

  it('日期比较', () => {
    const date1 = new Date();
    const date2 = new Date(0); // 1970-01-01T00:00:00.000Z

    const array = [date1, date2];
    const objects = [{ d: date1 }, { d: date2 }];

    expect(minBy(array)).toBe(date2);
    expect(minBy(objects, (item) => item.d)).toEqual({ d: date2 });
    expect(minBy(objects, 'd')).toEqual({ d: date2 });
  });

  it('字符串比较', () => {
    const array = ['a', 'b'];
    const objects = [{ n: 'a' }, { n: 'b' }];

    expect(minBy(array)).toBe('a');
    expect(minBy(objects, (item) => item.n)).toEqual({ n: 'a' });
    expect(minBy(objects, 'n')).toEqual({ n: 'a' });
  });

  it('错误的参数', () => {
    const values = [null, undefined, '', {}, NaN, 1, true, false];

    values.forEach((item) => {
      // @ts-ignore
      expect(minBy(item)).toBeUndefined();
    });
  });
});

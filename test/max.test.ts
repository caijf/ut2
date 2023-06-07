import { max } from '../src';

describe('max', () => {
  it('basic', () => {
    const array = [1, 2, 3];
    expect(max(array)).toBe(3);

    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];
    expect(max(objects, (item) => item.a)).toEqual({ a: 3 });

    expect(max(objects, 'a')).toEqual({ a: 3 });
  });

  it('日期比较', () => {
    const date1 = new Date();
    const date2 = new Date(0); // 1970-01-01T00:00:00.000Z

    const array = [date1, date2];
    const objects = [{ d: date1 }, { d: date2 }];

    expect(max(array)).toBe(date1);
    expect(max(objects, (item) => item.d)).toEqual({ d: date1 });
    expect(max(objects, 'd')).toEqual({ d: date1 });
  });

  it('字符串比较', () => {
    const array = ['a', 'b'];
    const objects = [{ n: 'a' }, { n: 'b' }];

    expect(max(array)).toBe('b');
    expect(max(objects, (item) => item.n)).toEqual({ n: 'b' });
    expect(max(objects, 'n')).toEqual({ n: 'b' });
  });

  it('错误的参数', () => {
    const values = [null, undefined, '', {}, NaN, 1, true, false];

    values.forEach((item) => {
      // @ts-ignore
      expect(max(item)).toBeUndefined();
    });
  });
});

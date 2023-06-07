import { uniq } from '../src';

describe('uniq', () => {
  it('basic', () => {
    const array = [2, 1, 2, 'a'];
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }];

    expect(uniq(array)).toEqual([2, 1, 'a']);
    expect(uniq(objects, 'a')).toEqual([{ a: 2 }, { a: 3 }, { a: 1 }]);
    expect(uniq(objects, (item) => item.a)).toEqual([{ a: 2 }, { a: 3 }, { a: 1 }]);
  });

  it('包含 `NaN`', () => {
    const array = [NaN, 1, 2, NaN, 3, 2, NaN];
    expect(uniq(array)).toEqual([NaN, 1, 2, 3]);
  });

  it('包含引用数据', () => {
    const obj = { a: 1 };
    const array = [obj, 1, 2, [], {}, obj, { a: 1 }];

    expect(uniq(array)).toEqual([obj, 1, 2, [], {}, { a: 1 }]);
  });

  it('错误的参数', () => {
    const values = [null, false, true, 1, '', { a: 1 }];
    values.forEach((item) => {
      // @ts-ignore
      expect(uniq(item)).toEqual([]);
    });
  });
});

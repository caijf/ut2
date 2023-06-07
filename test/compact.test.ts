import { compact } from '../src';
import { falsy } from './_utils';

describe('compact', () => {
  it('排除假值', () => {
    const array = ['0', '1', '2'];
    expect(compact(array.concat(...(falsy as any[])))).toEqual(array);
  });

  it('错误的参数', () => {
    const values = [1, NaN, null, {}, false, true, ''];

    values.forEach((item) => {
      // @ts-ignore
      expect(compact(item)).toEqual([]);
    });
  });
});

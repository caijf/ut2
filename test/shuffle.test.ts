import { shuffle, list } from '../src';
import { symbol } from './_utils';

describe('shuffle', () => {
  const array = [1, 2, 3];

  it('返回一个新数组', () => {
    expect(shuffle(array)).not.toBe(array);
  });

  it('返回一个包含所有值的数组', () => {
    expect(shuffle(array).sort()).toEqual(array);
  });

  it('打乱最小的数组', () => {
    const smallArray = [1, 2];
    list(1000, () => shuffle(smallArray)).forEach((item) => {
      expect(item).toEqual(item[0] === 1 ? [1, 2] : [2, 1]);
    });
  });

  it('错误的参数', () => {
    const values = [1, '', 'a', { a: 1 }, null, undefined, NaN, symbol];
    values.forEach((item) => {
      // @ts-ignore
      expect(shuffle(item)).toEqual([]);
    });
  });
});

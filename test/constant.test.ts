import { constant } from '../src';
import { falsy } from './_utils';

describe('constant', () => {
  it('basic', () => {
    const obj = { a: 1 };

    const constantObj = constant(obj);
    expect(constantObj()).toBe(obj);

    const values = [{}, [], true, 1, 'a'];
    values.forEach((item) => {
      const tmp = constant(item);
      expect(tmp()).toBe(item);
    });
  });

  it('错误的值正常返回', () => {
    falsy.forEach((item) => {
      const tmp = constant(item);
      expect(tmp()).toBe(item);
    });
  });
});

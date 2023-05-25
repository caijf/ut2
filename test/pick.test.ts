import { pick } from '../src';
import { symbol, toArgs } from './_utils';

describe('pick', () => {
  const obj = { name: 'jeff', age: 18 };
  const args = toArgs(['name', 'age']);

  it('string', () => {
    expect(pick(obj, 'name')).toEqual({ name: 'jeff' });
    expect(pick(obj, 'age')).toEqual({ age: 18 });
  });

  it('array', () => {
    expect(pick(obj, ['name'])).toEqual({ name: 'jeff' });
    expect(pick(obj, ['name', 'age'])).toEqual({ name: 'jeff', age: 18 });

    // arguments 参数转数组
    expect(pick(obj, [...args])).toEqual({ name: 'jeff', age: 18 });
  });

  it('忽略不存在的属性', () => {
    expect(pick(obj)).toEqual({});
    // @ts-ignore
    expect(pick(obj, '')).toEqual({});
  });

  it('多个重复的属性', () => {
    expect(pick(obj, ['name', 'name'])).toEqual({ name: 'jeff' });
  });

  it('支持 Symbol 类型的键值', () => {
    const o = { name: 'jeff', age: 18, [symbol]: 'some val' };

    expect(pick(o, symbol)).toEqual({ [symbol]: 'some val' });
    expect(pick(o, [symbol, 'name', 'age'])).toEqual({
      name: 'jeff',
      age: 18,
      [symbol]: 'some val'
    });
  });

  it('允许选取不可枚举的属性', () => {
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

    expect(o).toEqual({ age: 18 });
    // @ts-ignore
    expect(pick(o, 'name')).toEqual({ name: 'jeff' });
  });
});

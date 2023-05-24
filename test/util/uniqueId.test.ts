import { uniqueId } from '../../src';

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

describe('uniqueId', () => {
  it('返回字符串id', () => {
    expect(typeof uniqueId()).toBe('string');
  });

  it('生成不重复的id', () => {
    const uids = new Array(1000).fill(1).map(() => uniqueId());
    expect(uniq(uids).length).toBe(uids.length);
  });

  it('自定义前缀', () => {
    expect(uniqueId('a').indexOf('a')).toBe(0);
    expect(uniqueId('abc').indexOf('abc')).toBe(0);
    expect(uniqueId('abc_').indexOf('abc_')).toBe(0);
  });

  it('前缀会自动转为string', () => {
    const obj = {
      toString() {
        return 123;
      }
    };

    expect(/^123.*$/.test(uniqueId(obj as any))).toBe(true);
    expect(uniqueId(null as any).indexOf('null')).toBe(0);
    expect(uniqueId(123 as any).indexOf('123')).toBe(0);

    // undefined 会使用默认的前缀 ''
    expect(uniqueId(undefined).indexOf('undefined')).toBe(-1);
  });
});

import { once } from '../src';

describe('once', () => {
  it('只执行一次', () => {
    let count = 0;
    function add() {
      return ++count;
    }
    const addOnce = once(add);
    expect(count).toBe(0);

    expect(addOnce()).toBe(1);
    expect(addOnce()).toBe(1);
    expect(count).toBe(1);
  });

  it('忽略递归调用', () => {
    let count = 0;
    const addOnce = once(() => {
      addOnce();
      return ++count;
    });
    expect(count).toBe(0);

    expect(addOnce()).toBe(1);
    expect(addOnce()).toBe(1);
    expect(count).toBe(1);
  });

  it('执行上下文', () => {
    const o1 = {
      name: 'foo'
    };
    const o2 = {
      name: 'bar'
    };
    const getName = function (this: any) {
      return this.name;
    };
    const getO1name = once(getName);
    expect(getO1name.call(o1)).toBe('foo');
    expect(getO1name.call(o2)).toBe('foo');

    const getO2name = once(getName);
    expect(getO2name.call(o2)).toBe('bar');
    expect(getO2name.call(o1)).toBe('bar');
  });

  it('抛出异常最多触发一次', () => {
    const onceThrowError = once(() => {
      throw new Error();
    });

    expect(onceThrowError).toThrow();
    expect(onceThrowError()).toBeUndefined();
  });
});

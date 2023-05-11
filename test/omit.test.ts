import omit from '../src/omit';

describe('omit', () => {

  it('shallow copy', () => {
    const originObj = { name: 'jeff' };
    const copy = omit(originObj);

    expect(originObj).toEqual(copy);
    expect(originObj).not.toBe(copy);
  });

  it('string', () => {
    expect(omit({ name: 'jeff', age: 18 }, 'age')).toEqual({ name: 'jeff' });
    // @ts-ignore
    expect(omit({ name: 'jeff', age: 18 }, '')).toEqual({ name: 'jeff', age: 18 });
  });

  it('array', () => {
    expect(omit({ name: 'jeff', age: 18 }, ['age'])).toEqual({ name: 'jeff' });
    expect(omit({ name: 'jeff', age: 18 }, ['age', 'age'])).toEqual({ name: 'jeff' });
  });
});

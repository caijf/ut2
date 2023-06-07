import isArray from '../isArray';
import isSymbol from '../isSymbol';

function createExtremum<T, F extends (item: T) => any, K extends keyof T>(
  array: T[],
  iteratee: F | K,
  comparator: (value: any, other: any) => boolean
) {
  if (!isArray(array)) {
    return;
  }

  const length = array.length;
  let index = -1;
  let result: T | undefined, computed: number | undefined;

  const internalIteratee =
    typeof iteratee === 'function' ? iteratee : (value: any) => value[iteratee];

  while (++index < length) {
    const value = array[index];
    const current = internalIteratee(value);

    if (
      current != null &&
      (computed === undefined
        ? current === current && !isSymbol(current)
        : comparator(current, computed))
    ) {
      computed = current;
      result = value;
    }
  }

  return result;
}

export default createExtremum;

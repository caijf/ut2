import isArray from '../isArray';
import isSymbol from '../isSymbol';
import createIteratee from './createIteratee';

function createExtremum<T, F extends (item: T) => any, K extends keyof T>(
  array: T[],
  iteratee: F | K,
  comparator: (value: any, other: any) => boolean
) {
  if (!isArray(array)) {
    return;
  }

  let result: T | undefined, computed: number | undefined;

  const internalIteratee = createIteratee<T, F, K>(iteratee);

  array.forEach((value) => {
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
  });

  return result;
}

export default createExtremum;

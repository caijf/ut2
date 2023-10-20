import isArray from '../isArray';
import isSymbol from '../isSymbol';
import isUndefined from '../isUndefined';
import createIteratee from './createIteratee';

function createExtremum<T, F extends (item: T) => any, K extends keyof T>(array: T[], comparator: (value: any, other: any) => boolean, iteratee?: F | K) {
  if (!isArray(array)) {
    return;
  }

  let result: T | undefined, computed: number | undefined;

  if (isUndefined(iteratee)) {
    array.forEach((value) => {
      if (value != null && (result === undefined ? value === value && !isSymbol(value) : comparator(value, result))) {
        result = value;
      }
    });
  } else {
    const internalIteratee = createIteratee<T, F, K>(iteratee);

    array.forEach((value) => {
      const current = internalIteratee(value);
      if (current != null && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
        computed = current;
        result = value;
      }
    });
  }

  return result;
}

export default createExtremum;

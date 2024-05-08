import isArray from '../isArray';
import isSymbol from '../isSymbol';
import createIteratee from './createIteratee';
import { nativeUndefined } from './native';
import { IterateeParam } from './types';

function createExtremum<T>(array: T[], comparator: (value: any, other: any) => boolean, iteratee?: IterateeParam<T>) {
  if (!isArray(array)) {
    return;
  }

  let result: T | undefined, computed: number | undefined;
  const internalIteratee = createIteratee<T>(iteratee);

  array.forEach((value) => {
    const current = internalIteratee(value);
    if (current != null && (computed === nativeUndefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
      computed = current;
      result = value;
    }
  });

  return result;
}

export default createExtremum;

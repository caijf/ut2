import isArray from '../isArray';
import isSymbol from '../isSymbol';
import createIteratee from './createIteratee';
import { nativeUndefined } from './native';
import { IterateeParam, WithNullable } from './types';

function createExtremum<T>(array: WithNullable<T[]>, comparator: (value: any, other: any) => boolean, iteratee?: IterateeParam<T>) {
  if (!isArray(array)) {
    return;
  }

  let result: T | undefined, computed: number | undefined;
  const internalIteratee = createIteratee<T>(iteratee);

  array.forEach((value, index) => {
    const current = internalIteratee(value, index, array);
    if (current != null && (computed === nativeUndefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
      computed = current;
      result = value;
    }
  });

  return result;
}

export default createExtremum;

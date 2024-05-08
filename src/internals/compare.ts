import isSymbol from '../isSymbol';
import toString from '../toString';

export function compareAsc(value: any, other: any) {
  const valueIsSymbol = isSymbol(value);
  const otherIsSymbol = isSymbol(other);
  const valueStr = toString(value);
  const otherStr = toString(other);

  if (!otherIsSymbol && (valueIsSymbol || valueStr > otherStr)) {
    return 1;
  }
  if (!valueIsSymbol && (otherIsSymbol || valueStr < otherStr)) {
    return -1;
  }
  return 0;
}

export function compareDesc(value: any, other: any) {
  const valueIsSymbol = isSymbol(value);
  const otherIsSymbol = isSymbol(other);
  const valueStr = toString(value);
  const otherStr = toString(other);

  if (!otherIsSymbol && (valueIsSymbol || valueStr > otherStr)) {
    return -1;
  }
  if (!valueIsSymbol && (otherIsSymbol || valueStr < otherStr)) {
    return 1;
  }
  return 0;
}

export type CompareOrderData<T> = {
  criteria: any[];
  index: number;
  value: T;
};
export type CompareOrderBase = 'asc' | 'desc';
export type CompareOrder = CompareOrderBase | ((a: any, b: any) => number);

export function compareMultiple<T>(object: CompareOrderData<T>, other: CompareOrderData<T>, orders: CompareOrder[]) {
  const objCriteria = object.criteria;
  const othCriteria = other.criteria;
  const length = objCriteria.length;
  let index = -1;

  while (++index < length) {
    const order = orders[index];
    const cmpFn = typeof order === 'function' ? order : order === 'desc' ? compareDesc : compareAsc;
    const result = cmpFn(objCriteria[index], othCriteria[index]);
    if (result) {
      return result;
    }
  }

  return object.index - other.index;
}

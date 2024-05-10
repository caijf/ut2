import isNumber from '../isNumber';
import isSymbol from '../isSymbol';
import toString from '../toString';

function createCompare(dir: 1 | 0) {
  const asc = dir === 1;
  function wrapper(value: any, other: any) {
    const valueIsSymbol = isSymbol(value);
    const otherIsSymbol = isSymbol(other);
    const isNeedConvertString = !valueIsSymbol && !otherIsSymbol && !(isNumber(value) && isNumber(other));
    const _value = isNeedConvertString ? toString(value) : value;
    const _other = isNeedConvertString ? toString(other) : other;

    if (!otherIsSymbol && (valueIsSymbol || _value > _other)) {
      return asc ? 1 : -1;
    }
    if (!valueIsSymbol && (otherIsSymbol || _value < _other)) {
      return asc ? -1 : 1;
    }
    return 0;
  }
  return wrapper;
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
    const cmpFn = typeof order === 'function' ? order : order === 'desc' ? createCompare(0) : createCompare(1);
    const result = cmpFn(objCriteria[index], othCriteria[index]);
    if (result) {
      return result;
    }
  }

  return object.index - other.index;
}

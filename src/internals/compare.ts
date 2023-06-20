import isSymbol from '../isSymbol';

export function compareAsc(value: any, other: any) {
  if (isSymbol(value) || isSymbol(other)) {
    return 0;
  }

  if (value > other) {
    return 1;
  } else if (value < other) {
    return -1;
  }
  return 0;
}

export function compareDesc(value: any, other: any) {
  if (isSymbol(value) || isSymbol(other)) {
    return 0;
  }

  if (value > other) {
    return -1;
  } else if (value < other) {
    return 1;
  }
  return 0;
}

export type OrderData<T> = {
  criteria: any[];
  index: number;
  value: T;
};
export type Order = 'asc' | 'desc' | ((a: any, b: any) => number);

export function compareMultiple<T>(object: OrderData<T>, other: OrderData<T>, orders: Order[]) {
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

export function compare(value: any, other: any, order: 'asc' | 'desc' = 'asc') {
  const asc = order === 'asc';
  if (value > other) {
    return asc ? 1 : -1;
  } else if (value < other) {
    return asc ? -1 : 1;
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
    let result: number;
    if (typeof order === 'function') {
      result = order(objCriteria[index], othCriteria[index]);
    } else {
      result = compare(objCriteria[index], othCriteria[index], order);
    }

    if (result) {
      return result;
    }
  }

  return object.index - other.index;
}

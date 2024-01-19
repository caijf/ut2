import identity from './identity';
import createIteratee from './internals/createIteratee';
import { compareMultiple, Order, OrderBase, OrderData } from './internals/compare';
import isArray from './isArray';
import forEach from './forEach';
import { CollectionList, CollectionObject, IterateeParam, Many } from './internals/types';

function orderBy<T>(collection: CollectionList<T>, iteratee?: Many<IterateeParam<T>>, orders?: Many<Order>): T[];
function orderBy<T extends object, V extends T[keyof T]>(collection: CollectionObject<T>, iteratee?: Many<IterateeParam<V>>, orders?: Many<Order>): V[];

/**
 * 创建一个元素数组，以迭代函数处理的结果排序。如果没有指定排序，默认为升序排序。
 *
 * `asc` 升序， `desc` 降序，默认执行稳定排序，也就是说相同元素会保持原始排序。
 *
 * `iteratee` 调用时会传入 1 个参数 `value` 。
 *
 * @static
 * @alias module:Collection.orderBy
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort | sort}
 * @param {ArrayLike<any> | Object} collection 一个用来迭代的集合。
 * @param {Function | string | Array} [iteratees] 排序的迭代函数。
 * @param {'asc' | 'desc' | Array} [orders] 迭代函数的排序顺序。
 * @returns {Array} 排序后的新数组。
 * @example
 *
 * const array = [2, 1, 3, 5, 4];
 *
 * orderBy(array);; // [1, 2, 3, 4, 5]
 *
 * orderBy(array, item=>item, 'desc');; // [5, 4, 3, 2, 1]
 *
 * const objects = [
 *   { a: 'x', b: 3 },
 *   { a: 'y', b: 4 },
 *   { a: 'x', b: 1 },
 *   { a: 'y', b: 2 }
 * ];
 *
 * orderBy(objects, 'b');
 * // [{ a: 'x', b: 1 },{ a: 'y', b: 2 },{ a: 'x', b: 3 },{ a: 'y', b: 4 }]
 *
 * // 迭代函数可以直接写入属性。
 * orderBy(objects, ['a', 'b'], ['asc', 'desc']);
 * // [{ a: 'x', b: 3 },{ a: 'x', b: 1 },{ a: 'y', b: 4 },{ a: 'y', b: 2 }]
 *
 */
function orderBy<T>(collection: any, iteratees?: any, orders?: Many<Order>) {
  const result: OrderData<T>[] = [];

  iteratees = (isArray(iteratees) ? iteratees : iteratees !== undefined ? [iteratees] : [identity]) as IterateeParam<T>[];
  orders = (isArray(orders) ? orders : orders !== undefined ? [orders] : []) as OrderBase[];

  let index = -1;
  forEach(collection, (item) => {
    const criteria = (iteratees as IterateeParam<T>[]).map((iteratee) => createIteratee<T>(iteratee)(item));
    result.push({
      criteria,
      index: ++index,
      value: item
    });
  });

  return result.sort((a, b) => compareMultiple<T>(a, b, orders as Order[])).map((item) => item.value);
}

export default orderBy;

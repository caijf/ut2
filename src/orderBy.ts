import identity from './identity';
import createIteratee from './internals/createIteratee';
import { compareMultiple, CompareOrder, CompareOrderBase, CompareOrderData } from './internals/compare';
import isArray from './isArray';
import forEach from './forEach';
import { ArrayLikeIterator, CollectionList, CollectionObject, IterateeParam, Many, ObjectIterator, PropertyName } from './internals/types';
import { nativeUndefined } from './internals/native';

interface OrderBy {
  <T extends object>(collection: CollectionList<T>, iteratee?: Many<ArrayLikeIterator<T, any> | keyof T>, orders?: Many<CompareOrder>): T[];
  <T>(collection: CollectionList<T>, iteratee?: Many<ArrayLikeIterator<T, any> | PropertyName>, orders?: Many<CompareOrder>): T[];
  <T extends object, V extends T[keyof T]>(collection: CollectionObject<T>, iteratee?: Many<ObjectIterator<T, any> | keyof T>, orders?: Many<CompareOrder>): V[];
  <T extends object, V extends T[keyof T]>(collection: CollectionObject<T>, iteratee?: Many<PropertyName>, orders?: Many<CompareOrder>): V[];
}

/**
 * 创建一个元素数组，以迭代函数处理的结果排序。如果没有指定排序，默认为升序排序。
 *
 * `asc` 升序， `desc` 降序，默认执行稳定排序，也就是说相同元素会保持原始排序。
 *
 * `iteratee` 调用时会传入三个参数 `value` `index|key` `collection`。
 *
 * @function
 * @alias module:Collection.orderBy
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort | sort}
 * @param {ArrayLike<any> | Object} collection 一个用来迭代的集合。
 * @param {Function | string | number | Symbol | Array} [iteratees] 排序的迭代函数。
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
const orderBy: OrderBy = function <T>(collection: any, iteratees?: any, orders?: Many<CompareOrder>) {
  const result: CompareOrderData<T>[] = [];

  iteratees = (isArray(iteratees) ? iteratees : iteratees !== nativeUndefined ? [iteratees] : [identity]) as IterateeParam<T>[];
  orders = (isArray(orders) ? orders : orders !== nativeUndefined ? [orders] : []) as CompareOrderBase[];

  let index = -1;
  forEach(collection, (item, key, arr) => {
    const criteria = (iteratees as IterateeParam<T>[]).map((iteratee) => createIteratee<T>(iteratee)(item, key, arr));
    result.push({
      criteria,
      index: ++index,
      value: item
    });
  });

  return result.sort((a, b) => compareMultiple<T>(a, b, orders as CompareOrder[])).map((item) => item.value);
};

export default orderBy;

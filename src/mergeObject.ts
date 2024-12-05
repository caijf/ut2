import merge from './merge';

interface MergeObject {
  <T1, T2>(t1: T1, t2: T2): T1 & T2;
  <T1, T2, T3>(t1: T1, t2: T2, t3: T3): T1 & T2 & T3;
  <T1, T2, T3, T4>(t1: T1, t2: T2, t3: T3, t4: T4): T1 & T2 & T3 & T4;
  <T1, T2, T3, T4, T5>(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): T1 & T2 & T3 & T4 & T5;
  <T1, T2, T3, T4, T5, T6>(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): T1 & T2 & T3 & T4 & T5 & T6;
  <T1, T2, T3, T4, T5, T6, T7>(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7): T1 & T2 & T3 & T4 & T5 & T6 & T7;
  <T1, T2, T3, T4, T5, T6, T7, T8>(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8): T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9>(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8, t9: T9): T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8, t9: T9, t10: T10): T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10;
  <T1, T2, T>(t1: T1, t2: T2, ...args: T[]): T1 & T2 & T;
}

/**
 * 递归合并 `source` 来源对象自身的可枚举属性（包含 `Symbol` 属性）到 `object` 目标对象。
 *
 * 与 `merge` 方法的区别：
 *
 * 1. 不合并数组，如果只传入 `2` 个参数，同 `merge(obj, src, merge.NOT_MERGE_ARRAYS)`
 * 2. 不支持自定义赋值函数和获取对象键，但支持多个来源对象参数
 *
 * @alias module:Object.mergeObject
 * @since 1.15.0
 * @param {Object | Array} object 目标对象。
 * @param {...object} args 来源对象。
 * @returns 目标对象。
 * @example
 *
 * mergeObject({c: 3}, {e: 5}); // { c: 3, e: 5 }
 * mergeObject({ a: 1 }, { a: undefined, b: undefined }); // { a: 1, b: undefined }
 * mergeObject({ a: 1 }, { a: undefined, b: undefined }, {c:'x'}); // { a: 1, b: undefined, c: 'x' }
 *
 * const source = {
 *   a: [{b: 2}, {d: 4}]
 * }
 * const otherSource = {
 *   a: [{c: 3},{e: 5}]
 * }
 * mergeObject({}, source, otherSource); // { a: [{c: 3}, {e: 5}] }
 */
const mergeObject: MergeObject = <TObject, TSource, TArgs>(object: TObject, source: TSource, ...args: TArgs[]) => {
  if (args.length > 0) {
    const [arg1, ...restArgs] = args;
    const obj = merge(object, source, merge.NOT_MERGE_ARRAYS);
    return mergeObject(obj, arg1, ...restArgs);
  }
  return merge(object, source, merge.NOT_MERGE_ARRAYS);
};

export default mergeObject;

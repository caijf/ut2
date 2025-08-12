import shallowEqual from './shallowEqual';

/**
 * 比较两个类数组的值是否相等。常用于参数对象比较。
 *
 * @deprecated 即将废弃，请使用 `shallowEqual` 替代。
 * @private
 * @alias module:Util.equalArrayLike
 * @since 1.18.0
 */
const equalArrayLike = shallowEqual;

export default equalArrayLike;

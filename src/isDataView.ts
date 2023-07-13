import isType from './internals/isType';

/**
 * 检查值是否为 `DataView` 对象。
 *
 * @static
 * @alias module:Language.isDataView
 * @since 1.2.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `DataView` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isDataView(new DataView(new ArrayBuffer(8))); // true
 *
 */
function isDataView(value: any) {
  return isType(value, 'DataView');
}

export default isDataView;

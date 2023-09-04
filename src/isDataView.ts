import getTagWithBugfix from './internals/getTagWithBugfix';
import { dataViewTag } from './internals/native';

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
function isDataView(value: any): value is DataView {
  return getTagWithBugfix(value) === dataViewTag;
}

export default isDataView;

import { Many, TPath } from './types';
import isNil from '../isNil';
import toPath from '../toPath';

type HasFunc = (object: object, key: TPath) => boolean;

/**
 * 判断对象是否包含路径属性。
 *
 * @private
 * @param {*} object 要查询的对象。
 * @param {string | number | symbol | Array} path 属性路径字符串或数组。
 * @param {Function} hasFunc 对象包含属性的函数。
 * @returns {boolean} 对象是否包含路径属性。
 */
function hasPath(object: object, key: Many<TPath>, hasFunc: HasFunc) {
  const paths = toPath(key, object);
  const length = paths.length;
  let index = 0;
  let result = true;

  while (!isNil(object) && index < length) {
    const key = paths[index];
    result = hasFunc(object, key);

    if (!result) {
      break;
    }

    object = (object as Record<string | symbol, any>)[key];
    index++;
  }
  return !!index && index === length && result;
}

export default hasPath;

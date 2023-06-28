import allKeys from './allKeys';

function conformsTo<T extends object, K extends keyof T>(
  object: T,
  source: Record<K, (value: T[K]) => any>
): boolean;
function conformsTo<T extends object | null | undefined>(
  object: T,
  source: Record<string | symbol, (value: any) => any>
): boolean;
/**
 * 通过调用断言 `source` 的属性与 `object` 的相应属性值，检查 `object` 是否符合 `source` 。
 *
 * @static
 * @alias module:Util.conformsTo
 * @since 1.0.0
 * @param {Object} object 要检查的对象。
 * @param {Object} source 要断言属性是否符合的对象。
 * @returns {boolean} 如果 `object` 符合，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * const object = { a: 1, b: 2 }
 *
 * conformsTo(object, { b: value => value > 1 }); // true
 *
 * conformsTo(object, { b: value => value > 2 }); // false
 *
 */
function conformsTo<T extends object, K extends keyof T>(
  object: T,
  source: Record<K, (value: T[K]) => any>
) {
  const props = allKeys(source) as unknown as K[];
  const length = props.length;

  if (object == null) {
    return !length;
  }

  if (length === 0) {
    return true;
  }

  for (let i = 0; i < length; i++) {
    const key = props[i];
    const predicate = source[key];
    const value = object[key];

    if ((value === undefined && !(key in object)) || !predicate(value)) {
      return false;
    }
  }

  return true;
}

export default conformsTo;

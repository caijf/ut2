import isArray from './isArray';
import isObject from './isObject';
import isObjectLike from './isObjectLike';

type Customizer = (objValue: any, srcValue: any, key: string, object: any, source: any) => any;

// 内部处理合并和循环引用
function baseMerge<TObject, TSource>(
  object: TObject,
  source: TSource,
  customizer?: Customizer,
  storage = new WeakMap()
) {
  const obj = Object(object);

  if (!isObject(source) || obj === source) {
    return obj;
  }

  for (const key in source) {
    const srcValue = source[key];
    let newValue =
      typeof customizer === 'function'
        ? customizer(obj[key], srcValue as any, key as any, obj, source)
        : undefined;

    if (newValue === undefined) {
      newValue = srcValue;
    }

    // 递归处理对象和数组
    if (isObjectLike(newValue) && key in obj && !storage.has(newValue as object)) {
      storage.set(newValue as object, true);

      const objValue = obj[key];
      let newObjValue: any;

      if (isArray(newValue)) {
        newObjValue = isArray(objValue) ? objValue : [];
      } else {
        newObjValue = isObjectLike(objValue) ? objValue : {};
      }

      obj[key] = baseMerge(newObjValue, newValue as any, customizer, storage);
    } else {
      if (newValue !== undefined || (newValue === undefined && !(key in obj))) {
        obj[key] = newValue;
      }
    }
  }

  return obj;
}

function merge<TObject, TSource>(
  object: TObject,
  source: TSource,
  customizer?: Customizer
): TObject & TSource {
  return baseMerge(object, source, customizer);
}

export default merge;

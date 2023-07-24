import getTag from './getTag';

// 检测值的 `Object.prototype.toString` 类型。
export function checkType(value: any, tag: string) {
  return getTag(value) === tag;
}

// 检测值的 `Object.prototype.toString` 符合类型之一。
export function checkTypes(value: any, tags: string[]) {
  const tag = getTag(value);
  return tags.some((item) => tag === item);
}

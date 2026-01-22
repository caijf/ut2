/**
 * 数组切片
 * @param array 类数组
 * @param start 开始索引
 * @param end 结束索引
 * @returns 数组切片
 */
function baseSlice<T>(array: ArrayLike<T>, start: number, end: number) {
  let index = -1,
    length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : (end - start) >>> 0;
  start >>>= 0;

  const result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
export default baseSlice;

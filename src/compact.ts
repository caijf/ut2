import isArray from './isArray';

function compact<T>(array: T[]) {
  return isArray(array) ? array.filter((item) => !!item) : [];
}

export default compact;

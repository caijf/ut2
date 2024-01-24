/**
 * 工具辅助类型
 */
export type Many<T> = T | T[];
export type WithNullable<T> = T | null | undefined;

/**
 * 迭代参数
 */
export type IterateeParam<T> = ((value: T, ...args: any[]) => any) | keyof T;

/**
 * 迭代方法
 */
export type StringIterator<R> = (char: string, index: number, string: string) => R;
export type ArrayIterator<T, R> = (item: T, index: number, list: T[]) => R;
export type ArrayLikeIterator<T, R> = (item: T, index: number, list: ArrayLike<T>) => R;
export type ObjectIterator<T, R> = (value: T[keyof T], key: string, object: T) => R;

export type ReduceStringIterator<R> = (accumulator: R, currentValue: string, currentIndex: number, string: string) => R;
export type ReduceArrayIterator<T, R> = (accumulator: R, currentValue: T, currentIndex: number, list: T[]) => R;
export type ReduceArrayLikeIterator<T, R> = (accumulator: R, currentValue: T, currentIndex: number, list: ArrayLike<T>) => R;
export type ReduceObjectIterator<T, R> = (accumulator: R, currentValue: T[keyof T], currentKey: string, object: T) => R;

/**
 * 集合类数组
 */
export type CollectionList<T> = WithNullable<ArrayLike<T>>;

/**
 * 集合对象
 */
export type CollectionObject<T extends object> = WithNullable<T>;

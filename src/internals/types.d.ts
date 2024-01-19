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
export type StringIterator<Result> = (char: string, index: number, string: string) => Result;
export type ArrayIterator<T, Result> = (item: T, index: number, collection: T[]) => Result;
export type ArrayLikeIterator<T, Result> = (item: T, index: number, collection: ArrayLike<T>) => Result;
export type ObjectIterator<T, Result> = (value: T[keyof T], key: string, collection: T) => Result;

/**
 * 集合类数组
 */
export type CollectionList<T> = WithNullable<ArrayLike<T>>;

/**
 * 集合对象
 */
export type CollectionObject<T extends object> = WithNullable<T>;

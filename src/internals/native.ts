const objectProto = Object.prototype;

export const objectToString = objectProto.toString;

export const hasOwnProperty = objectProto.hasOwnProperty;

export const propertyIsEnumerable = objectProto.propertyIsEnumerable;

export const functionToString = Function.prototype.toString;

export const objectCtorString = functionToString.call(Object);

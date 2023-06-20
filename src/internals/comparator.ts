import toNumber from '../toNumber';

type Comparator = (value: any, other: any) => boolean;

export function createOperation(comparator: Comparator) {
  return function (value: any, other: any) {
    if (!(typeof value === 'string' && typeof other === 'string')) {
      value = toNumber(value);
      other = toNumber(other);
    }
    return comparator(value, other);
  };
}

export const baseGt: Comparator = (value, other) => {
  return value > other;
};

export const baseGte: Comparator = (value, other) => {
  return value >= other;
};

export const baseLt: Comparator = (value, other) => {
  return value < other;
};

export const baseLte: Comparator = (value, other) => {
  return value <= other;
};

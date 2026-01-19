import chunk from './chunk.js';
import compact from './compact.js';
import difference from './difference.js';
import differenceBy from './differenceBy.js';

export const testCases = [
  {
    category: 'Array',
    list: [
      {
        method: 'chunk',
        cases: chunk
      },
      {
        method: 'compact',
        cases: compact
      },
      {
        method: 'difference',
        cases: difference
      },
      {
        method: 'differenceBy',
        cases: differenceBy
      }
    ]
  }
];

const createScriptWithSrc = (src) => `\x3Cscript src="${src}">\x3C/script>`;
const createScriptWithText = (text) => `\x3Cscript>
${text}
\x3C/script>`;

const preCodeScript = `${createScriptWithSrc('https://cdn.jsdelivr.net/npm/underscore@1')}
${createScriptWithText(`  var underscore = _.noConflict();`)}
${createScriptWithSrc('https://cdn.jsdelivr.net/npm/lodash@4')}
${createScriptWithSrc('https://cdn.jsdelivr.net/npm/ut2@1')}`;

const preCodeFoo = createScriptWithText(`  function Foo() {
    this.a = 1;
    this[Symbol.for('b')] = 2;
  }
  Foo.prototype.c = 3;
  Foo.prototype[Symbol.for('d')] = 4;`);

const preCodeScriptWithFoo = `${preCodeScript}
${preCodeFoo}`;

export const libConfig = [
  {
    name: 'ut2'
  },
  {
    name: 'underscore'
  },
  {
    name: 'lodash',
    alias: '_'
  }
];

export const testCases = [
  {
    category: 'Array',
    list: [
      {
        method: 'chunk',
        initHTML: preCodeScriptWithFoo,
        cases: [
          {
            params: `['a', 'b', 'c', 'd'], 2`
          },
          {
            params: `['a', 'b', 'c', 'd'], 3`
          },
          {
            params: `['a', 'b', 'c', 'd'], 7`
          }
        ]
      },
      {
        method: 'compact',
        cases: [
          {
            params: `[0, 1, 2]`
          },
          {
            params: `[0, 1, false, '', 2]`
          }
        ]
      },
      {
        method: 'difference',
        cases: [
          {
            params: `[1, 2, 3, 4, 5], [5, 2, 10]`
          },
          {
            params: `['a', 'b', 'c'], ['a', 1]`
          },
          {
            params: `[{ x: 2 }, { x: 1 }], [{ x: 1 }], function (item) {
  return item.x;
}`,
            lodash: {
              method: 'differenceBy'
            },
            underscore: {
              existed: false
            }
          },
          {
            params: `[{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x'`,
            lodash: {
              method: 'differenceBy'
            },
            underscore: {
              existed: false
            }
          },
          {
            params: `[2.1, 2.3, 3, 4.5], [2, 4], function (item) {
  return Math.floor(item);
}`,
            lodash: {
              method: 'differenceBy'
            },
            underscore: {
              existed: false
            }
          }
        ]
      },
      {
        method: 'intersection',
        cases: [
          {
            params: `[1, 2, 3, 4, 5], [5, 2, 10]`
          },
          {
            params: `['a', 'b', 'c'], ['a', 1]`
          },
          {
            params: `[{ x: 2 }, { x: 1 }], [{ x: 1 }], function (item) {
  return item.x;
}`,
            lodash: {
              method: 'intersectionBy'
            },
            underscore: {
              existed: false
            }
          },
          {
            params: `[{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x'`,
            lodash: {
              method: 'intersectionBy'
            },
            underscore: {
              existed: false
            }
          },
          {
            params: `[2.1, 2.3, 3, 4.5], [2, 4], function (item) {
  return Math.floor(item);
}`,
            lodash: {
              method: 'intersectionBy'
            },
            underscore: {
              existed: false
            }
          }
        ]
      },
      {
        method: 'nth',
        cases: [
          {
            params: `['a', 'b', 'c', 'd'], 1`
          },
          {
            params: `['a', 'b', 'c', 'd'], -2`
          },
          {
            params: `"abcd", 1`
          }
        ],
        underscore: {
          existed: false
        }
      },
      {
        method: 'shuffle',
        cases: [
          {
            params: `[1, 2]`
          },
          {
            params: `[1, 2, 3, 4]`
          }
        ]
      },
      {
        method: 'union',
        cases: [
          {
            params: `[1, 2, 3, 4, 5], [5, 2, 10]`
          },
          {
            params: `['a', 'b', 'c'], ['a', 1]`
          },
          {
            params: `[{ x: 2 }, { x: 1 }], [{ x: 1 }], function (item) {
  return item.x;
}`,
            lodash: {
              method: 'unionBy'
            },
            underscore: {
              existed: false
            }
          },
          {
            params: `[{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x'`,
            lodash: {
              method: 'unionBy'
            },
            underscore: {
              existed: false
            }
          },
          {
            params: `[2.1, 2.3, 3, 4.5], [2, 4], function (item) {
  return Math.floor(item);
}`,
            lodash: {
              method: 'unionBy'
            },
            underscore: {
              existed: false
            }
          }
        ]
      },
      {
        method: 'uniq',
        cases: [
          {
            params: `[1, 2, 1, 4, 1, 3, 0, -0]`
          },
          {
            params: `['a', NaN, 2, 1, NaN, 'a', 1]`
          },
          {
            params: `[{ x: 1 }, { x: 2 }, { x: 1 }], function (item) {
  return item.x;
}`,
            lodash: {
              method: 'uniqBy'
            }
          }
        ]
      },
      {
        method: 'unzip',
        cases: [
          {
            params: `[['barney', 'fred'], [36, 40]]`
          },
          {
            params: `[['barney', 'fred'], [36, 40], [true, false]]`
          }
        ]
      },
      {
        method: 'xor',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `[1, 2, 3, 4, 5], [5, 2, 10]`
          },
          {
            params: `['a', 'b', 'c'], ['a', 1]`
          },
          {
            params: `[{ x: 2 }, { x: 1 }], [{ x: 1 }], function (item) {
  return item.x;
}`,
            lodash: {
              method: 'xorBy'
            }
          },
          {
            params: `[{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x'`,
            lodash: {
              method: 'xorBy'
            }
          },
          {
            params: `[2.1, 2.3, 3, 4.5], [2, 4], function (item) {
  return Math.floor(item);
}`,
            lodash: {
              method: 'xorBy'
            }
          }
        ]
      },
      {
        method: 'zip',
        cases: [
          {
            params: `['barney', 'fred'], [36, 40]`
          },
          {
            params: `['barney', 'fred'], [36, 40], [true, false]`
          }
        ]
      }
    ]
  },
  {
    category: 'Collection',
    list: [
      {
        method: 'countBy',
        cases: [
          {
            params: `[6, 4, 6]`
          },
          {
            params: `[{ n: 6.1 }, { n: 4.2 }, { n: 6.3 }], function (item) {
  return Math.floor(item.n);
}`
          }
        ]
      },
      {
        method: 'every',
        cases: [
          {
            params: `[1, 2, 3], (item) => item`
          },
          {
            params: `[1, 2, 3], (item) => item !== 2`
          },
          {
            params: `[1, null, undefined, false, 2, 3], (item) => item`
          },
          {
            params: `{ a: 1, b: 2, c: 3 }, (item) => item`
          },
          {
            params: `{ a: 1, b: false, c: 3 }, (item) => item`
          }
        ]
      },
      {
        method: 'find',
        cases: [
          {
            params: `[1, 2, 3], (item) => item`
          },
          {
            params: `[1, 2, 3], (item) => item !== 2`
          },
          {
            params: `[1, null, undefined, false, 2, 3], (item) => item`
          },
          {
            params: `{ a: 1, b: 2, c: 3 }, (item) => item`
          },
          {
            params: `{ a: 1, b: false, c: 3 }, (item) => item`
          }
        ]
      },
      {
        method: 'filter',
        cases: [
          {
            params: `[1, 2, 3], (item) => item`
          },
          {
            params: `[1, 2, 3], (item) => item !== 2`
          },
          {
            params: `[1, null, undefined, false, 2, 3], (item) => item`
          },
          {
            params: `{ a: 1, b: 2, c: 3 }, (item) => item`
          },
          {
            params: `{ a: 1, b: false, c: 3 }, (item) => item`
          }
        ]
      },
      {
        method: 'forEach',
        underscore: {
          method: 'each'
        },
        cases: [
          {
            params: `[1, 2, 3], (item) => item`
          },
          {
            params: `[1, 2, 3], (item) => item !== 2`
          },
          {
            params: `[1, null, undefined, false, 2, 3], (item) => item`
          },
          {
            params: `{ a: 1, b: 2, c: 3 }, (item) => item`
          },
          {
            params: `{ a: 1, b: false, c: 3 }, (item) => item`
          }
        ]
      },
      {
        method: 'forEachRight',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `[1, 2, 3], (item) => item`
          },
          {
            params: `[1, 2, 3], (item) => item !== 2`
          },
          {
            params: `[1, null, undefined, false, 2, 3], (item) => item`
          },
          {
            params: `{ a: 1, b: 2, c: 3 }, (item) => item`
          },
          {
            params: `{ a: 1, b: false, c: 3 }, (item) => item`
          }
        ]
      },
      {
        method: 'groupBy',
        cases: [
          {
            params: `[6, 4, 6]`
          },
          {
            params: `[{ n: 6.1 }, { n: 4.2 }, { n: 6.3 }], function (item) {
  return Math.floor(item.n);
}`
          }
        ]
      },
      {
        method: 'keyBy',
        underscore: {
          method: 'indexBy'
        },
        cases: [
          {
            params: `[6, 4, 6]`
          },
          {
            params: `[{ n: 6.1 }, { n: 4.2 }, { n: 6.3 }], function (item) {
  return Math.floor(item.n);
}`
          }
        ]
      },
      {
        method: 'map',
        cases: [
          {
            params: `[1, 2, 3], (item) => item`
          },
          {
            params: `[1, 2, 3], (item) => item !== 2`
          },
          {
            params: `[1, null, undefined, false, 2, 3], (item) => item`
          },
          {
            params: `{ a: 1, b: 2, c: 3 }, (item) => item`
          },
          {
            params: `{ a: 1, b: false, c: 3 }, (item) => item`
          }
        ]
      },
      {
        method: 'orderBy',
        underscore: {
          method: 'sortBy'
        },
        cases: [
          {
            params: `[2, 1, 3, 5, 4]`
          },
          {
            params: `[{ a: 'x', b: 3 }, { a: 'y', b: 4 }, { a: 'x', b: 1 }, { a: 'y', b: 2 }], function (item) {
  return item.b;
}`
          }
        ]
      },
      {
        method: 'partition',
        cases: [
          {
            params: `[{ user: 'barney', age: 36, active: false }, { user: 'fred', age: 40, active: true }, { user: 'pebbles', age: 1, active: false }], function (item) {
  return item.active;
}`
          }
        ]
      },
      {
        method: 'reduce',
        cases: [
          {
            params: `[1, 2, 3], function (accumulator, current) {
  return accumulator + current;
}`
          },
          {
            params: `[1, 2, 3], function (accumulator, current) {
  return accumulator + current;
}, 0`
          }
        ]
      },
      {
        method: 'reduceRight',
        cases: [
          {
            params: `[1, 2, 3], function (accumulator, current) {
  return accumulator + current;
}`
          },
          {
            params: `[1, 2, 3], function (accumulator, current) {
  return accumulator + current;
}, 0`
          }
        ]
      },
      {
        method: 'some',
        cases: [
          {
            params: `[1, 2, 3], (item) => item`
          },
          {
            params: `[1, 2, 3], (item) => item !== 2`
          },
          {
            params: `[1, null, undefined, false, 2, 3], (item) => item`
          },
          {
            params: `{ a: 1, b: 2, c: 3 }, (item) => item`
          },
          {
            params: `{ a: 1, b: false, c: 3 }, (item) => item`
          }
        ]
      }
    ]
  },
  {
    category: 'Language',
    list: [
      {
        method: 'isArguments',
        cases: [
          {
            params: `(function () {
  return arguments;
})()`
          },
          {
            params: `[1, 2, 3]`
          }
        ]
      },
      {
        method: 'isArray',
        cases: [
          {
            params: `[1, 2, 3]`
          },
          {
            params: `'abc'`
          }
        ]
      },
      {
        method: 'isArrayLike',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `[1, 2, 3]`
          },
          {
            params: `'abc'`
          }
        ]
      },
      {
        method: 'isArrayLikeObject',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `[1, 2, 3]`
          },
          {
            params: `'abc'`
          }
        ]
      },
      {
        method: 'isBigInt',
        lodash: {
          existed: false
        },
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `1n`
          },
          {
            params: `1`
          }
        ]
      },
      {
        method: 'isBoolean',
        cases: [
          {
            params: `false`
          },
          {
            params: `null`
          }
        ]
      },
      {
        method: 'isDate',
        cases: [
          {
            params: `new Date()`
          },
          {
            params: `'123'`
          }
        ]
      },
      {
        method: 'isEmpty',
        cases: [
          {
            params: `{}`
          },
          {
            params: `[]`
          },
          {
            params: `null`
          },
          {
            params: `undefined`
          },
          {
            params: `1`
          },
          {
            params: `'abc'`
          }
        ]
      },
      {
        method: 'isEqual',
        cases: [
          {
            params: `{ name: 'moe', luckyNumbers: [13, 27, 34] }, { name: 'moe', luckyNumbers: [13, 27, 34] }`
          },
          {
            params: `{ a: 1, b: -0 }, { a: 1, b: 0 }`
          },
          {
            params: `{ a: [1, 2, 3], b: 0 }, { a: [1, 2, 3], b: 0 }`
          }
        ]
      },
      {
        method: 'isError',
        cases: [
          {
            params: `new Error()`
          },
          {
            params: `'abc'`
          }
        ]
      },
      {
        method: 'isFinite',
        cases: [
          {
            params: `1`
          },
          {
            params: `NaN`
          },
          {
            params: `Infinity`
          }
        ]
      },
      {
        method: 'isFunction',
        cases: [
          {
            params: `function () {}`
          },
          {
            params: `/x/`
          }
        ]
      },
      {
        method: 'isInteger',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `1`
          },
          {
            params: `NaN`
          },
          {
            params: `Infinity`
          }
        ]
      },
      {
        method: 'isLength',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `1`
          },
          {
            params: `NaN`
          },
          {
            params: `Infinity`
          }
        ]
      },
      {
        method: 'isMap',
        cases: [
          {
            params: `new Map()`
          },
          {
            params: `new WeakMap()`
          }
        ]
      },
      {
        method: 'isMatch',
        cases: [
          {
            params: `{ a: 1, b: 0 }, { a: 1 }`
          },
          {
            params: `{ a: 1, b: -0 }, { b: 0 }`
          },
          {
            params: `{ a: [1, 2, 3], b: 0 }, { a: [1, 2, 3] }`
          },
          {
            params: `{ a: [{ b: [{ c: 0, d: 1 }], e: 2 }], f: 3 }, { a: [{ b: [{ c: 0 }] }] }`
          }
        ]
      },
      {
        method: 'isNaN',
        cases: [
          {
            params: `1`
          },
          {
            params: `NaN`
          },
          {
            params: `Infinity`
          }
        ]
      },
      {
        method: 'isNil',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `undefined`
          },
          {
            params: `null`
          },
          {
            params: `''`
          },
          {
            params: `{}`
          }
        ]
      },
      {
        method: 'isNull',
        cases: [
          {
            params: `undefined`
          },
          {
            params: `null`
          },
          {
            params: `''`
          },
          {
            params: `{}`
          }
        ]
      },
      {
        method: 'isNumber',
        cases: [
          {
            params: `1`
          },
          {
            params: `NaN`
          },
          {
            params: `Infinity`
          },
          {
            params: `new Number(1)`
          }
        ]
      },
      {
        method: 'isObject',
        cases: [
          {
            params: `{}`
          },
          {
            params: `[1, 2, 3]`
          },
          {
            params: `function () {}`
          },
          {
            params: `null`
          }
        ]
      },
      {
        method: 'isObjectLike',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `{}`
          },
          {
            params: `[1, 2, 3]`
          },
          {
            params: `function () {}`
          },
          {
            params: `null`
          }
        ]
      },
      {
        method: 'isPlainObject',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `{}`
          },
          {
            params: `[1, 2, 3]`
          },
          {
            params: `function () {}`
          },
          {
            params: `null`
          }
        ]
      },
      {
        method: 'isRegExp',
        cases: [
          {
            params: `/abc/`
          },
          {
            params: `'/abc/'`
          }
        ]
      },
      {
        method: 'isSet',
        cases: [
          {
            params: `new Set()`
          },
          {
            params: `new WeakSet()`
          }
        ]
      },
      {
        method: 'isString',
        cases: [
          {
            params: `'abc'`
          },
          {
            params: `1`
          },
          {
            params: `new String('abc')`
          }
        ]
      },
      {
        method: 'isSymbol',
        cases: [
          {
            params: `Symbol()`
          },
          {
            params: `Symbol.iterator`
          },
          {
            params: `'abc'`
          }
        ]
      },
      {
        method: 'isTypedArray',
        cases: [
          {
            params: `new Int8Array(8)`
          },
          {
            params: `[]`
          },
          {
            params: `[null]`
          }
        ]
      },
      {
        method: 'isUndefined',
        cases: [
          {
            params: `undefined`
          },
          {
            params: `null`
          },
          {
            params: `1`
          }
        ]
      },
      {
        method: 'isWeakMap',
        cases: [
          {
            params: `new WeakMap()`
          },
          {
            params: `new Map()`
          }
        ]
      },
      {
        method: 'isWeakSet',
        cases: [
          {
            params: `new WeakSet()`
          },
          {
            params: `new Set()`
          }
        ]
      }
    ]
  },
  {
    category: 'Math',
    list: [
      {
        method: 'ceil',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `4.16`
          },
          {
            params: `4.16, 1`
          }
        ]
      },
      {
        method: 'floor',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `4.16`
          },
          {
            params: `4.16, 1`
          }
        ]
      },
      {
        method: 'min',
        cases: [
          {
            params: `[10, 5, 100, 2, 1000]`
          },
          {
            params: `[{ n: 1 }, { n: 2 }], function (item) {
  return item.n;
}`,
            lodash: {
              method: 'minBy'
            }
          },
          {
            params: `[{ n: 1 }, { n: 2 }], 'n'`,
            lodash: {
              method: 'minBy'
            }
          }
        ]
      },
      {
        method: 'max',
        cases: [
          {
            params: `[10, 5, 100, 2, 1000]`
          },
          {
            params: `[{ n: 1 }, { n: 2 }], function (item) {
  return item.n;
}`,
            lodash: {
              method: 'maxBy'
            }
          },
          {
            params: `[{ n: 1 }, { n: 2 }], 'n'`,
            lodash: {
              method: 'maxBy'
            }
          }
        ]
      },
      {
        method: 'round',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `4.16`
          },
          {
            params: `4.16, 1`
          }
        ]
      }
    ]
  },
  {
    category: 'Number',
    list: [
      {
        method: 'clamp',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `-10, -5, 5`
          },
          {
            params: `-10, 0, 5`
          },
          {
            params: `10, -5, 5`
          },
          {
            params: `10, 5`
          },
          {
            params: `-10, 5`
          }
        ]
      },
      {
        method: 'inRange',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `3, 2, 4`
          },
          {
            params: `2.2, 0.5, 1.5`
          },
          {
            params: `-2, -2, 4`
          },
          {
            params: `1, 2`
          },
          {
            params: `1, -2`
          }
        ]
      },
      {
        method: 'random',
        cases: [
          {
            params: ``
          },
          {
            params: `2, 4`
          },
          {
            params: `1.2, 2.4`
          }
        ]
      },
      {
        method: 'randomInt',
        underscore: {
          existed: false
        },
        lodash: {
          existed: false
        },
        cases: [
          {
            params: ``
          },
          {
            params: `2, 4`
          },
          {
            params: `1.2, 2.4`
          }
        ]
      }
    ]
  },
  {
    category: 'Object',
    list: [
      {
        method: 'allKeys',
        underscore: {
          existed: false
        },
        lodash: {
          existed: false
        },
        cases: [
          {
            params: `{ a: 1, b: 2, c: 3 }`
          },
          {
            params: `{ a: 1, [Symbol.for('b')]: 2 }`
          },
          {
            initHTML: preCodeScriptWithFoo,
            params: `new Foo()`
          },
          {
            params: `null`
          }
        ]
      },
      {
        method: 'allKeysIn',
        underscore: {
          existed: false
        },
        lodash: {
          existed: false
        },
        cases: [
          {
            params: `{ a: 1, b: 2, c: 3 }`
          },
          {
            params: `{ a: 1, [Symbol.for('b')]: 2 }`
          },
          {
            initHTML: preCodeScriptWithFoo,
            params: `new Foo()`
          },
          {
            params: `null`
          }
        ]
      },
      {
        method: 'invert',
        cases: [
          {
            params: `{ a: 1, b: 2, c: 3 }`
          },
          {
            params: `{ a: 1, [Symbol.for('b')]: 2 }`
          },
          {
            initHTML: preCodeScriptWithFoo,
            params: `new Foo()`
          },
          {
            params: `null`
          }
        ]
      },
      {
        method: 'keys',
        cases: [
          {
            params: `{ a: 1, b: 2, c: 3 }`
          },
          {
            params: `{ a: 1, [Symbol.for('b')]: 2 }`
          },
          {
            initHTML: preCodeScriptWithFoo,
            params: `new Foo()`
          },
          {
            params: `null`
          }
        ]
      },
      {
        method: 'keysIn',
        underscore: {
          method: 'allKeys'
        },
        cases: [
          {
            params: `{ a: 1, b: 2, c: 3 }`
          },
          {
            params: `{ a: 1, [Symbol.for('b')]: 2 }`
          },
          {
            initHTML: preCodeScriptWithFoo,
            params: `new Foo()`
          },
          {
            params: `null`
          }
        ]
      },
      {
        method: 'merge',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `{ a: 1 }, { a: undefined, b: undefined }`
          },
          {
            params: `{ a: undefined, b: undefined }, { a: 1 }`
          },
          {
            params: `[{ a: 1, b: { c: [{ d: 2 }] } }], [{ a: 3, b: { c: [{ d: 4 }, { d: 5 }] } }]`
          },
          {
            params: `{}, { [Symbol('a')]: 1 }`
          },
          {
            initHTML: preCodeScriptWithFoo,
            params: `{}, new Foo()`
          }
        ]
      },
      {
        method: 'omit',
        cases: [
          {
            params: `{ name: 'jeff', age: 18 }`
          },
          {
            initHTML: preCodeScriptWithFoo,
            params: `new Foo()`
          },
          {
            params: `{ name: 'jeff', age: 18 }, 'name'`
          },
          {
            params: `{ name: 'jeff', age: 18 }, ['name', 'age']`
          }
        ]
      },
      {
        method: 'omitBy',
        underscore: {
          method: 'omit'
        },
        cases: [
          {
            params: `{ name: 'jeff', age: 18 }`
          },
          {
            initHTML: preCodeScriptWithFoo,
            params: `new Foo()`
          },
          {
            params: `{ name: 'jeff', age: 18 }, function (value) {
  return typeof value === 'string';
}`
          },
          {
            params: `{ name: 'jeff', age: 18 }, function (value, key) {
  return key === 'age';
}`
          }
        ]
      },
      {
        method: 'pick',
        cases: [
          {
            params: `{ name: 'jeff', age: 18 }`
          },
          {
            initHTML: preCodeScriptWithFoo,
            params: `new Foo()`
          },
          {
            params: `{ name: 'jeff', age: 18 }, 'name'`
          },
          {
            params: `{ name: 'jeff', age: 18 }, ['name', 'age']`
          }
        ]
      },
      {
        method: 'pickBy',
        underscore: {
          method: 'pick'
        },
        cases: [
          {
            params: `{ name: 'jeff', age: 18 }`
          },
          {
            initHTML: preCodeScriptWithFoo,
            params: `new Foo()`
          },
          {
            params: `{ name: 'jeff', age: 18 }, function (value) {
  return typeof value === 'string';
}`
          },
          {
            params: `{ name: 'jeff', age: 18 }, function (value, key) {
  return key === 'age';
}`
          }
        ]
      }
    ]
  },
  {
    category: 'String',
    list: [
      {
        method: 'camelCase',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `'foo bar'`
          },
          {
            params: `'foo-bar'`
          },
          {
            params: `'Foo Bar'`
          },
          {
            params: `'FOO BAR'`
          },
          {
            params: `'--FOO-BAR--'`
          },
          {
            params: `'__FOO_BAR__'`
          }
        ]
      },
      {
        method: 'capitalize',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `'foo bar'`
          },
          {
            params: `'foo-bar'`
          },
          {
            params: `'Foo Bar'`
          },
          {
            params: `'FOO BAR'`
          },
          {
            params: `'--FOO-BAR--'`
          },
          {
            params: `'__FOO_BAR__'`
          }
        ]
      },
      {
        method: 'escape',
        cases: [
          {
            params: `'<script></script>'`
          },
          {
            params: `'&'`
          }
        ]
      },
      {
        method: 'escapeRegExp',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `'\\\\'`
          },
          {
            params: `'-+='`
          },
          {
            params: `'[foo]'`
          },
          {
            params: `'http://example.com'`
          }
        ]
      },
      {
        method: 'kebabCase',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `'foo bar'`
          },
          {
            params: `'foo-bar'`
          },
          {
            params: `'Foo Bar'`
          },
          {
            params: `'FOO BAR'`
          },
          {
            params: `'--FOO-BAR--'`
          },
          {
            params: `'__FOO_BAR__'`
          }
        ]
      },
      {
        method: 'lowerCase',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `'foo bar'`
          },
          {
            params: `'foo-bar'`
          },
          {
            params: `'Foo Bar'`
          },
          {
            params: `'FOO BAR'`
          },
          {
            params: `'--FOO-BAR--'`
          },
          {
            params: `'__FOO_BAR__'`
          }
        ]
      },
      {
        method: 'lowerFirst',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `'foo bar'`
          },
          {
            params: `'foo-bar'`
          },
          {
            params: `'Foo Bar'`
          },
          {
            params: `'FOO BAR'`
          },
          {
            params: `'--FOO-BAR--'`
          },
          {
            params: `'__FOO_BAR__'`
          }
        ]
      },
      {
        method: 'snakeCase',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `'foo bar'`
          },
          {
            params: `'foo-bar'`
          },
          {
            params: `'Foo Bar'`
          },
          {
            params: `'FOO BAR'`
          },
          {
            params: `'--FOO-BAR--'`
          },
          {
            params: `'__FOO_BAR__'`
          }
        ]
      },
      {
        method: 'pascalCase',
        lodash: {
          existed: false
        },
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `'foo bar'`
          },
          {
            params: `'foo-bar'`
          },
          {
            params: `'Foo Bar'`
          },
          {
            params: `'FOO BAR'`
          },
          {
            params: `'--FOO-BAR--'`
          },
          {
            params: `'__FOO_BAR__'`
          }
        ]
      },
      {
        method: 'unescape',
        cases: [
          {
            params: `'&lt;script&gt;&lt;/script&gt;'`
          },
          {
            params: `'&amp;'`
          }
        ]
      },
      {
        method: 'upperFirst',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `'foo bar'`
          },
          {
            params: `'foo-bar'`
          },
          {
            params: `'Foo Bar'`
          },
          {
            params: `'FOO BAR'`
          },
          {
            params: `'--FOO-BAR--'`
          },
          {
            params: `'__FOO_BAR__'`
          }
        ]
      },
      {
        method: 'words',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `'foo bar'`
          },
          {
            params: `'foo-bar'`
          },
          {
            params: `'Foo Bar'`
          },
          {
            params: `'FOO BAR'`
          },
          {
            params: `'--FOO-BAR--'`
          },
          {
            params: `'__FOO_BAR__'`
          }
        ]
      }
    ]
  },
  {
    category: 'Util',
    list: [
      {
        method: 'castArray',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: ``
          },
          {
            params: `'a'`
          },
          {
            params: `undefined`
          },
          {
            params: `[1, 2, 3]`
          }
        ]
      },
      {
        method: 'conformsTo',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `{ a: 1, b: 2 }, { b: function (value) {
    return value > 1;
  }
}`
          },
          {
            params: `{ a: 1, b: 2 }, { b: function (value) {
    return value > 2;
  }
}`
          }
        ]
      },
      {
        method: 'constant',
        cases: [
          {
            params: `[]`
          },
          {
            params: `[null]`
          },
          {
            params: `[{ a: 1 }]`
          }
        ]
      },
      {
        method: 'defaultTo',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `undefined, 1`
          },
          {
            params: `10, 1`
          },
          {
            params: `null, undefined`
          }
        ]
      },
      {
        method: 'eq',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `-0, 0`
          },
          {
            params: `1, 1`
          },
          {
            params: `NaN, NaN`
          },
          {
            params: `'a', 'a'`
          },
          {
            params: `{ a: 1 }, { a: 1 }`
          }
        ]
      },
      {
        method: 'gt',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `1, 3`
          },
          {
            params: `3, 3`
          },
          {
            params: `3, 1`
          }
        ]
      },
      {
        method: 'gte',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `1, 3`
          },
          {
            params: `3, 3`
          },
          {
            params: `3, 1`
          }
        ]
      },
      {
        method: 'identity',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `{ a: 1 }`
          },
          {
            params: `3`
          },
          {
            params: `'abc'`
          }
        ]
      },
      {
        method: 'list',
        underscore: {
          method: 'times'
        },
        lodash: {
          method: 'times'
        },
        cases: [
          {
            params: `3, String`
          },
          {
            params: `3, function () {
  return 0;
}`
          }
        ]
      },
      {
        method: 'lt',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `1, 3`
          },
          {
            params: `3, 3`
          },
          {
            params: `3, 1`
          }
        ]
      },
      {
        method: 'lte',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `1, 3`
          },
          {
            params: `3, 3`
          },
          {
            params: `3, 1`
          }
        ]
      },
      {
        method: 'noop',
        cases: [
          {
            params: ``
          }
        ]
      },
      {
        method: 'nthArg',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `1`
          },
          {
            params: `-2`
          }
        ]
      },
      {
        method: 'range',
        cases: [
          {
            params: `1, 4`
          },
          {
            params: `-4`
          },
          {
            params: `0, 100, 2`
          }
        ]
      },
      {
        method: 'sleep',
        underscore: {
          existed: false
        },
        lodash: {
          existed: false
        },
        cases: [
          {
            params: ``
          },
          {
            params: `300`
          }
        ]
      },
      {
        method: 'toFinite',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `3.2`
          },
          {
            params: `'3.2'`
          },
          {
            params: `-0`
          },
          {
            params: `'-0'`
          },
          {
            params: `'0'`
          },
          {
            params: `NaN`
          },
          {
            params: `Infinity`
          }
        ]
      },
      {
        method: 'toInteger',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `3.2`
          },
          {
            params: `'3.2'`
          },
          {
            params: `-0`
          },
          {
            params: `'-0'`
          },
          {
            params: `'0'`
          },
          {
            params: `NaN`
          },
          {
            params: `Infinity`
          }
        ]
      },
      {
        method: 'toLength',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `3.2`
          },
          {
            params: `'3.2'`
          },
          {
            params: `-0`
          },
          {
            params: `'-0'`
          },
          {
            params: `'0'`
          },
          {
            params: `NaN`
          },
          {
            params: `Infinity`
          }
        ]
      },
      {
        method: 'toNumber',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `3.2`
          },
          {
            params: `'3.2'`
          },
          {
            params: `-0`
          },
          {
            params: `'-0'`
          },
          {
            params: `'0'`
          },
          {
            params: `NaN`
          },
          {
            params: `Infinity`
          }
        ]
      },
      {
        method: 'toSafeInteger',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `3.2`
          },
          {
            params: `'3.2'`
          },
          {
            params: `-0`
          },
          {
            params: `'-0'`
          },
          {
            params: `'0'`
          },
          {
            params: `NaN`
          },
          {
            params: `Infinity`
          }
        ]
      },
      {
        method: 'toString',
        underscore: {
          existed: false
        },
        cases: [
          {
            params: `null`
          },
          {
            params: `-0`
          },
          {
            params: `'-0'`
          },
          {
            params: `[undefined, null]`
          },
          {
            params: `'a'`
          },
          {
            params: `3`
          }
        ]
      },
      {
        method: 'uniqueId',
        cases: [
          {
            params: ``
          },
          {
            params: `'abc_'`
          }
        ]
      }
    ]
  }
];

export const testCasesWithDom = testCases.map((item) => {
  return {
    ...item,
    list: item.list.map((item2) => {
      return {
        ...item2,
        cases: item2.cases.map((item3) => {
          return {
            initHTML: item3.initHTML || item2.initHTML || preCodeScript,
            tests: libConfig
              .filter((lib) => item3[lib.name]?.existed !== false && item2[lib.name]?.existed !== false)
              .map((lib) => {
                const method = item3[lib.name]?.method || item2[lib.name]?.method || item2.method;
                return {
                  title: `${lib.name} ${method}`,
                  code: `${lib.alias || lib.name}.${method}(${item3.params})`
                };
              })
          };
        })
      };
    })
  };
});

/* eslint-disable no-undef */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.fastest = factory();
  }
})(this, function () {
  function Foo() {
    this.a = 1;
    this[Symbol.for('b')] = 2;
  }
  Foo.prototype.c = 3;
  Foo.prototype[Symbol.for('d')] = 4;

  /**
   * @typedef {Object} LibConfig - 基础配置
   * @property {string} [method] - 测试方法
   * @property {any[][]} [params] - 调用该方法的参数
   * @property {boolean} [existed] - 是否存在该方法
   */

  /**
   * @typedef {Object} MainConfig - 完整配置
   * @property {string} method - 测试方法
   * @property {any[][]} params - 调用该方法的参数
   * @property {LibConfig} [underscore] - underscore 配置
   * @property {LibConfig} [lodash] - lodash 配置
   * @property {LibConfig} [ut2] - ut2 配置
   */

  /**
   * @typedef {Object} CategoryConfig - 分类配置
   * @property {string} category - 分类
   * @property {MainConfig[]} list - 配置列表
   */

  /** @type {CategoryConfig[]} */
  const config = [
    {
      category: 'Array',
      list: [
        {
          method: 'chunk',
          params: [
            [['a', 'b', 'c', 'd'], 0],
            [['a', 'b', 'c', 'd'], 1],
            [['a', 'b', 'c', 'd'], 2],
            [['a', 'b', 'c', 'd'], 3],
            [['a', 'b', 'c', 'd'], 7]
          ]
        },
        {
          method: 'compact',
          params: [[[0, 1, 2]], [[0, 1, false, '', 2]]]
        },
        {
          method: 'difference',
          params: [
            [[2, 1, 2], [1]],
            [
              [1, 2, 3, 4, 5],
              [5, 2, 10]
            ],
            [
              ['a', 'b', 'c'],
              ['a', 1]
            ],
            [[-0, 0], [0]],
            [
              [NaN, 2, 1, NaN],
              [NaN, 5]
            ]
          ]
        },
        {
          method: 'differenceBy',
          params: [
            [
              [{ x: 2 }, { x: 1 }],
              [{ x: 1 }],
              function (item) {
                return item.x;
              }
            ],
            [[{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x'],
            [
              [{ x: 1 }, { x: 2 }],
              [
                { x: 3, a: 1 },
                { x: 2, b: 2 }
              ],
              'x'
            ],
            [
              [2.1, 2.3, 3, 4.5],
              [2, 4],
              function (item) {
                return Math.floor(item);
              }
            ]
          ],
          underscore: {
            existed: false
          },
          ut2: {
            method: 'difference'
          }
        },
        {
          method: 'fromPairs',
          params: [
            [
              ['a', 1],
              ['b', 2]
            ],
            [
              [
                ['foo', 'bar'],
                ['baz', 42]
              ]
            ]
          ],
          underscore: {
            existed: false
          }
        },
        {
          method: 'intersection',
          params: [
            [[2, 1, 2], [1]],
            [
              [1, 2, 3, 4, 5],
              [5, 2, 10]
            ],
            [
              ['a', 'b', 'c'],
              ['a', 1]
            ],
            [[-0, 0], [0]],
            [
              [NaN, 2, 1, NaN],
              [NaN, 5]
            ]
          ]
        },
        {
          method: 'intersectionBy',
          params: [
            [
              [{ x: 2 }, { x: 1 }],
              [{ x: 1 }],
              function (item) {
                return item.x;
              }
            ],
            [[{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x'],
            [
              [{ x: 1 }, { x: 2 }],
              [
                { x: 3, a: 1 },
                { x: 2, b: 2 }
              ],
              'x'
            ],
            [
              [2.1, 2.3, 3, 4.5],
              [2, 4],
              function (item) {
                return Math.floor(item);
              }
            ]
          ],
          underscore: {
            existed: false
          },
          ut2: {
            method: 'intersection'
          }
        },
        {
          method: 'nth',
          params: [
            [['a', 'b', 'c', 'd'], 1],
            [['a', 'b', 'c', 'd'], 2],
            [['a', 'b', 'c', 'd'], -1],
            ['abcd', 1],
            ['abcd', -1]
          ],
          underscore: {
            existed: false
          }
        },
        {
          method: 'shuffle',
          params: [[[1, 2]], [[1, 2, 3, 4]]]
        },
        {
          method: 'union',
          params: [
            [[2, 1, 2], [1]],
            [
              [1, 2, 3, 4, 5],
              [5, 2, 10]
            ],
            [
              ['a', 'b', 'c'],
              ['a', 1]
            ],
            [[-0, 0], [0]],
            [
              [NaN, 2, 1, NaN],
              [NaN, 5]
            ]
          ]
        },
        {
          method: 'unionBy',
          params: [
            [
              [{ x: 2 }, { x: 1 }],
              [{ x: 1 }],
              function (item) {
                return item.x;
              }
            ],
            [[{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x'],
            [
              [{ x: 1 }, { x: 2 }],
              [
                { x: 3, a: 1 },
                { x: 2, b: 2 }
              ],
              'x'
            ],
            [
              [2.1, 2.3, 3, 4.5],
              [2, 4],
              function (item) {
                return Math.floor(item);
              }
            ]
          ],
          underscore: {
            existed: false
          },
          ut2: {
            method: 'union'
          }
        },
        {
          method: 'uniq',
          params: [
            [[1, 2, 1, 4, 1, 3, 0, -0]],
            [['a', NaN, 2, 1, NaN, 'a', 1]],
            [
              [{ x: 1 }, { x: 2 }, { x: 1 }],
              function (item) {
                return item.x;
              }
            ]
          ],
          lodash: {
            method: 'uniqBy'
          }
        },
        {
          method: 'unzip',
          params: [
            [[]],
            [
              [
                ['barney', 'fred'],
                [36, 40]
              ]
            ],
            [
              [
                ['barney', 'fred'],
                [36, 40],
                [true, false]
              ]
            ]
          ]
        },
        {
          method: 'xor',
          params: [
            [[2, 1, 2], [1]],
            [
              [1, 2, 3, 4, 5],
              [5, 2, 10]
            ],
            [
              ['a', 'b', 'c'],
              ['a', 1]
            ],
            [[-0, 0], [0]],
            [
              [NaN, 2, 1, NaN],
              [NaN, 5]
            ],
            [
              [{ x: 2 }, { x: 1 }],
              [{ x: 1 }],
              function (item) {
                return item.x;
              }
            ],
            [[{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x'],
            [
              [{ x: 1 }, { x: 2 }],
              [
                { x: 3, a: 1 },
                { x: 2, b: 2 }
              ],
              'x'
            ],
            [
              [2.1, 2.3, 3, 4.5],
              [2, 4],
              function (item) {
                return Math.floor(item);
              }
            ]
          ],
          underscore: {
            existed: false
          },
          lodash: {
            method: 'xorBy'
          }
        },
        {
          method: 'zip',
          params: [
            [[]],
            [
              ['barney', 'fred'],
              [36, 40]
            ],
            [
              ['barney', 'fred'],
              [36, 40],
              [true, false]
            ]
          ]
        }
      ]
    },
    {
      category: 'Collection',
      list: [
        {
          method: 'countBy',
          params: [
            [[6, 4, 6]],
            [
              [{ n: 6.1 }, { n: 4.2 }, { n: 6.3 }],
              function (item) {
                return Math.floor(item.n);
              }
            ]
          ]
        },
        {
          method: 'filter',
          params: [
            [[1, 2, 3], (item) => item],
            [[1, 2, 3], (item) => item !== 2],
            [[1, null, undefined, false, 2, 3], (item) => item],
            [{ a: 1, b: 2, c: 3 }, (item) => item],
            [{ a: 1, b: false, c: 3 }, (item) => item]
          ]
        },
        {
          method: 'forEach',
          params: [
            [[1, 2, 3], (item) => item],
            [[1, 2, 3], (item) => item !== 2],
            [[1, null, undefined, false, 2, 3], (item) => item],
            [{ a: 1, b: 2, c: 3 }, (item) => item],
            [{ a: 1, b: false, c: 3 }, (item) => item]
          ],
          underscore: {
            method: 'each'
            // existed: false
          }
        },
        {
          method: 'groupBy',
          params: [
            [[6, 4, 6]],
            [
              [{ n: 6.1 }, { n: 4.2 }, { n: 6.3 }],
              function (item) {
                return Math.floor(item.n);
              }
            ]
          ]
        },
        {
          method: 'keyBy',
          params: [
            [[6, 4, 6]],
            [
              [{ n: 6.1 }, { n: 4.2 }, { n: 6.3 }],
              function (item) {
                return Math.floor(item.n);
              }
            ]
          ],
          underscore: {
            method: 'indexBy'
          }
        },
        {
          method: 'orderBy',
          params: [
            [[2, 1, 3, 5, 4]],
            [
              [
                { a: 'x', b: 3 },
                { a: 'y', b: 4 },
                { a: 'x', b: 1 },
                { a: 'y', b: 2 }
              ],
              function (item) {
                return item.b;
              }
            ]
          ],
          underscore: {
            method: 'sortBy'
          }
        },
        {
          method: 'partition',
          params: [
            [
              [
                { user: 'barney', age: 36, active: false },
                { user: 'fred', age: 40, active: true },
                { user: 'pebbles', age: 1, active: false }
              ],
              function (item) {
                return item.active;
              }
            ]
          ]
        }
      ]
    },
    {
      category: 'Language',
      list: [
        {
          method: 'isArguments',
          params: [
            [
              (function () {
                return arguments;
              })()
            ],
            [[1, 2, 3]]
          ]
        },
        {
          method: 'isArray',
          params: [[[1, 2, 3]], ['abc'], [null], [function () {}]]
        },
        {
          method: 'isArrayLike',
          params: [[[1, 2, 3]], ['abc'], [null], [function () {}]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'isArrayLikeObject',
          params: [[[1, 2, 3]], ['abc'], [null], [function () {}]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'isBoolean',
          params: [[false], [null]]
        },
        {
          method: 'isDate',
          params: [[new Date()], ['123']]
        },
        {
          method: 'isEmpty',
          params: [[{}], [[]], [null], [undefined], [1], [[1]], ['abc']]
        },
        {
          method: 'isEqual',
          params: [
            [
              { name: 'moe', luckyNumbers: [13, 27, 34] },
              { name: 'moe', luckyNumbers: [13, 27, 34] }
            ],
            [
              { a: 1, b: -0 },
              { a: 1, b: 0 }
            ],
            [
              { a: [1, 2, 3], b: 0 },
              { a: [1, 2, 3], b: 0 }
            ],
            [
              { a: [{ b: [{ c: 0, d: 1 }], e: 2 }], f: 3 },
              { a: [{ b: [{ c: 0, d: 1 }], e: 2 }], f: 3 }
            ]
          ],
          lodash: {
            method: 'isEqualWith'
          }
        },
        {
          method: 'isError',
          params: [[new Error()], [Error]]
        },
        {
          method: 'isFinite',
          params: [[1], [NaN], [Infinity]]
        },
        {
          method: 'isFunction',
          params: [[function () {}], [/x/]]
        },
        {
          method: 'isInteger',
          params: [[1], [NaN], [Infinity]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'isLength',
          params: [[1], [NaN], [Infinity]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'isMap',
          params: [[new Map()], [new WeakMap()]]
        },
        {
          method: 'isMatch',
          params: [
            [{ a: 1, b: 0 }, { a: 1 }],
            [{ a: 1, b: -0 }, { b: 0 }],
            [{ a: [1, 2, 3], b: 0 }, { a: [1, 2, 3] }],
            [{ a: [{ b: [{ c: 0, d: 1 }], e: 2 }], f: 3 }, { a: [{ b: [{ c: 0 }] }] }]
          ],
          lodash: {
            method: 'isMatchWith'
          }
        },
        {
          method: 'isNaN',
          params: [[1], [NaN], [Object(NaN)]]
        },
        {
          method: 'isNil',
          params: [[undefined], [null], [''], [{}]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'isNull',
          params: [[undefined], [null], [''], [{}]]
        },
        {
          method: 'isNumber',
          params: [[1], [NaN], [Infinity], [new Number(1)]]
        },
        {
          method: 'isObject',
          params: [[{}], [[1, 2, 3]], [function () {}], [null]]
        },
        {
          method: 'isObjectLike',
          params: [[{}], [[1, 2, 3]], [function () {}], [null]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'isPlainObject',
          params: [[{}], [[1, 2, 3]], [null]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'isRegExp',
          params: [[/abc/], ['/abc/']]
        },
        {
          method: 'isSet',
          params: [[new Set()], [new WeakSet()]]
        },
        {
          method: 'isString',
          params: [['abc'], [new String('abc')], [1]]
        },
        {
          method: 'isSymbol',
          params: [[Symbol()], [Symbol.iterator], ['abc']]
        },
        {
          method: 'isTypedArray',
          params: [[new Int8Array(8)], [[]], [null]]
        },
        {
          method: 'isUndefined',
          params: [[undefined], [null], [1]]
        },
        {
          method: 'isWeakMap',
          params: [[new WeakMap()], [new Map()]]
        },
        {
          method: 'isWeakSet',
          params: [[new WeakSet()], [new Set()]]
        }
      ]
    },
    {
      category: 'Math',
      list: [
        {
          method: 'ceil',
          params: [[4.16], [4.16, 1]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'floor',
          params: [[4.16], [4.16, 1]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'min',
          params: [
            [[10, 5, 100, 2, 1000]],
            [
              [{ n: 1 }, { n: 2 }],
              function (item) {
                return item.n;
              }
            ],
            [[{ n: 1 }, { n: 2 }], 'n']
          ],
          lodash: {
            method: 'minBy'
          }
        },
        {
          method: 'max',
          params: [
            [[10, 5, 100, 2, 1000]],
            [
              [{ n: 1 }, { n: 2 }],
              function (item) {
                return item.n;
              }
            ],
            [[{ n: 1 }, { n: 2 }], 'n']
          ],
          lodash: {
            method: 'maxBy'
          }
        },
        {
          method: 'round',
          params: [[4.16], [4.16, 1]],
          underscore: {
            existed: false
          }
        }
      ]
    },
    {
      category: 'Number',
      list: [
        {
          method: 'clamp',
          params: [
            [-10, -5, 5],
            [-10, 0, 5],
            [10, -5, 5],
            [10, 5],
            [-10, 5]
          ],
          underscore: {
            existed: false
          }
        },
        {
          method: 'inRange',
          params: [
            [3, 2, 4],
            [1, 0, 2],
            [1.2, 0.5, 1.5],
            [2.2, 0.5, 1.5],
            [-2, -2, 4],
            [4, -2, 4],
            [1, 2],
            [1, -2]
          ],
          underscore: {
            existed: false
          }
        },
        {
          method: 'random',
          params: [[], [2, 4], [4, 2], [1.2, 2.4]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'randomInt',
          params: [
            [2, 4],
            [4, 2],
            [1.2, 2.4]
          ],
          underscore: {
            method: 'random'
          },
          lodash: {
            method: 'random'
          }
        }
      ]
    },
    {
      category: 'Object',
      list: [
        {
          method: 'allKeys',
          params: [[{ a: 1, b: 2, c: 3 }], [{ a: 1, [Symbol.for('b')]: 2 }], [new Foo()], [null]],
          underscore: {
            existed: false
          },
          lodash: {
            existed: false
          }
        },
        {
          method: 'allKeysIn',
          params: [[{ a: 1, b: 2, c: 3 }], [{ a: 1, [Symbol.for('b')]: 2 }], [new Foo()], [null]],
          underscore: {
            existed: false
          },
          lodash: {
            existed: false
          }
        },
        {
          method: 'keys',
          params: [[{ a: 1, b: 2, c: 3 }], [{ a: 1, [Symbol.for('b')]: 2 }], [new Foo()], [null]]
        },
        {
          method: 'keysIn',
          params: [[{ a: 1, b: 2, c: 3 }], [{ a: 1, [Symbol.for('b')]: 2 }], [new Foo()], [null]],
          underscore: {
            method: 'allKeys'
          },
          lodash: {
            method: 'keysIn'
          }
        },
        {
          method: 'merge',
          params: [
            [{ a: 1 }, { a: undefined, b: undefined }],
            [{ a: undefined, b: undefined }, { a: 1 }],
            [[{ a: 1, b: { c: [{ d: 2 }] } }], [{ a: 3, b: { c: [{ d: 4 }, { d: 5 }] } }]],
            [{}, { [Symbol('a')]: 1 }],
            [{}, new Foo()]
          ],
          underscore: {
            existed: false
          },
          // lodash 没有处理原型链上可枚举的 symbol 属性
          lodash: {
            method: 'mergeWith'
          }
        },
        {
          method: 'omit',
          params: [[{ name: 'jeff', age: 18 }], [new Foo()], [{ name: 'jeff', age: 18 }, 'name'], [{ name: 'jeff', age: 18 }, ['name', 'age']]]
        },
        {
          method: 'omitBy',
          params: [
            [{ name: 'jeff', age: 18 }],
            [new Foo()],
            [
              { name: 'jeff', age: 18 },
              function (value) {
                return typeof value === 'string';
              }
            ],
            [
              { name: 'jeff', age: 18 },
              function (value, key) {
                return key === 'age';
              }
            ]
          ],
          underscore: {
            method: 'omit'
          }
        },
        {
          method: 'pick',
          params: [[{ name: 'jeff', age: 18 }], [new Foo()], [{ name: 'jeff', age: 18 }, 'name'], [{ name: 'jeff', age: 18 }, ['name', 'age']]]
        },
        {
          method: 'pickBy',
          params: [
            [{ name: 'jeff', age: 18 }],
            [new Foo()],
            [
              { name: 'jeff', age: 18 },
              function (value) {
                return typeof value === 'string';
              }
            ],
            [
              { name: 'jeff', age: 18 },
              function (value, key) {
                return key === 'age';
              }
            ]
          ],
          underscore: {
            method: 'pick'
          }
        }
      ]
    },
    {
      category: 'String',
      list: [
        {
          method: 'camelCase',
          params: [['foo bar'], ['foo-bar'], ['Foo Bar'], ['FOO BAR'], ['--FOO-BAR--'], ['__FOO_BAR__']],
          underscore: {
            existed: false
          }
        },
        {
          method: 'capitalize',
          params: [['foo bar'], ['foo-bar'], ['Foo Bar'], ['FOO BAR'], ['--FOO-BAR--'], ['__FOO_BAR__']],
          underscore: {
            existed: false
          }
        },
        {
          method: 'escape',
          params: [['<script></script>'], ['&']]
        },
        {
          method: 'escapeRegExp',
          params: [['\\'], ['-+='], ['[foo]'], ['http://example.com']],
          underscore: {
            existed: false
          }
        },
        {
          method: 'kebabCase',
          params: [['foo bar'], ['foo-bar'], ['Foo Bar'], ['FOO BAR'], ['--FOO-BAR--'], ['__FOO_BAR__']],
          underscore: {
            existed: false
          }
        },
        {
          method: 'lowerCase',
          params: [['foo bar'], ['foo-bar'], ['Foo Bar'], ['FOO BAR'], ['--FOO-BAR--'], ['__FOO_BAR__']],
          underscore: {
            existed: false
          }
        },
        {
          method: 'lowerFirst',
          params: [['foo bar'], ['foo-bar'], ['Foo Bar'], ['FOO BAR'], ['--FOO-BAR--'], ['__FOO_BAR__']],
          underscore: {
            existed: false
          }
        },
        {
          method: 'snakeCase',
          params: [['foo bar'], ['foo-bar'], ['Foo Bar'], ['FOO BAR'], ['--FOO-BAR--'], ['__FOO_BAR__']],
          underscore: {
            existed: false
          }
        },
        {
          method: 'unescape',
          params: [['&lt;script&gt;&lt;/script&gt;'], ['&amp;']]
        },
        {
          method: 'upperCase',
          params: [['foo bar'], ['foo-bar'], ['Foo Bar'], ['FOO BAR'], ['--FOO-BAR--'], ['__FOO_BAR__']],
          underscore: {
            existed: false
          }
        },
        {
          method: 'upperFirst',
          params: [['foo bar'], ['foo-bar'], ['Foo Bar'], ['FOO BAR'], ['--FOO-BAR--'], ['__FOO_BAR__']],
          underscore: {
            existed: false
          }
        },
        {
          method: 'words',
          params: [['foo bar'], ['foo-bar'], ['Foo Bar'], ['FOO BAR'], ['--FOO-BAR--'], ['__FOO_BAR__'], ['fred, barney, & pebbles'], ['fred, barney, & pebbles', /[^, ]+/g]],
          underscore: {
            existed: false
          }
        }
      ]
    },
    {
      category: 'Util',
      list: [
        {
          method: 'castArray',
          params: [['a'], [1], [{ a: 1, b: 2 }], [], [undefined], [null], [[1, 2, 3]]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'conformsTo',
          params: [
            [
              { a: 1, b: 2 },
              {
                b: function (value) {
                  return value > 1;
                }
              }
            ],
            [
              { a: 1, b: 2 },
              {
                b: function (value) {
                  return value > 2;
                }
              }
            ]
          ],
          underscore: {
            existed: false
          }
        },
        {
          method: 'constant',
          params: [[], [null], [{ a: 1 }]]
        },
        {
          method: 'defaultTo',
          params: [
            [undefined, 1],
            [10, 1],
            [null, undefined]
          ],
          underscore: {
            existed: false
          }
        },
        {
          method: 'eq',
          params: [
            [-0, 0],
            [1, 1],
            [NaN, NaN],
            ['a', 'a'],
            [{ a: 1 }, { a: 1 }]
          ],
          underscore: {
            existed: false
          }
        },
        {
          method: 'gt',
          params: [
            [1, 3],
            [3, 3],
            [3, 1]
          ],
          underscore: {
            existed: false
          }
        },
        {
          method: 'gte',
          params: [
            [1, 3],
            [3, 3],
            [3, 1]
          ],
          underscore: {
            existed: false
          }
        },
        {
          method: 'identity',
          params: [[{ a: 1 }], [3], ['abc']],
          underscore: {
            existed: false
          }
        },
        {
          method: 'lt',
          params: [
            [1, 3],
            [3, 3],
            [3, 1]
          ],
          underscore: {
            existed: false
          }
        },
        {
          method: 'lte',
          params: [
            [1, 3],
            [3, 3],
            [3, 1]
          ],
          underscore: {
            existed: false
          }
        },
        {
          method: 'noop',
          params: [[]]
        },
        {
          method: 'nthArg',
          params: [[1], [-2]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'range',
          params: [[1, 4], [-4], [0, 100, 2]]
        },
        {
          method: 'sleep',
          params: [[], [300]],
          underscore: {
            existed: false
          },
          lodash: {
            existed: false
          }
        },
        {
          method: 'times',
          params: [
            [3, String],
            [
              3,
              function () {
                return 0;
              }
            ]
          ]
        },
        {
          method: 'toFinite',
          params: [[3.2], ['3.2'], [-0], ['-0'], ['0'], [NaN], [Infinity], [-Infinity]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'toInteger',
          params: [[3.2], ['3.2'], [-0], ['-0'], ['0'], [NaN], [Infinity], [-Infinity]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'toLength',
          params: [[3.2], ['3.2'], [-0], ['-0'], ['0'], [NaN], [Infinity], [-Infinity]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'toNumber',
          params: [[3.2], ['3.2'], [-0], ['-0'], ['0'], [NaN], [Infinity], [-Infinity]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'toSafeInteger',
          params: [[3.2], ['3.2'], [-0], ['-0'], ['0'], [NaN], [Infinity], [-Infinity]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'toString',
          params: [[null], [-0], ['-0'], [[undefined, null]], ['a'], [3]],
          underscore: {
            existed: false
          }
        },
        {
          method: 'uniqueId',
          params: [[], [], ['abc_']]
        }
      ]
    }
  ];

  const result = {
    // toString: [
    //   {
    //     $case: '',
    //     $fastest: '',
    //     underscore: {
    //       case: 'toString(123)',
    //       hz: 1,
    //       sampled: 92,
    //       rme: '2.45%'
    //     },
    //     lodash: {
    //       case: 'toString(123)',
    //       hz: 1,
    //       sampled: 92,
    //       rme: '2.45%'
    //     },
    //     ut2: {
    //       case: 'toString(123)',
    //       hz: 1,
    //       sampled: 92,
    //       rme: '2.45%'
    //     },
    //   }
    // ]
  };

  function fastest(options) {
    // libs
    const Benchmark = options.Benchmark;
    const ut2 = options.ut2;
    const underscore = options.underscore;
    const lodash = options.lodash;

    // // 自定义 ut2 merge方法，不处理 `Symbol` 属性，执行速度将比 lodash 快
    // const _merge = ut2.merge;
    // ut2.merge = (obj, src, customizer) => {
    //   return _merge(obj, src, customizer, ut2.keysIn);
    // };

    // 其他配置
    // const async = options.async || false, // 开启async可能没有触发 cycle
    let methods = options.methods;
    const onComplete = options.onComplete;

    const libObj = { underscore: underscore, lodash: lodash, ut2: ut2 };
    /** @type {MainConfig[]} */
    let allMethod = [];
    config.forEach(function (item) {
      allMethod = allMethod.concat(item.list);
    });
    methods = ut2.castArray(methods);
    const methodsCase = allMethod.filter(function (item) {
      return methods.indexOf(item.method) !== -1;
    });

    let completeCount = 0;

    methodsCase.forEach(function (item) {
      result[item.method] = [];

      const libConfig = {
        underscore: ut2.merge(
          {
            method: item.method,
            params: item.params
          },
          item.underscore
        ),
        lodash: ut2.merge(
          {
            method: item.method,
            params: item.params
          },
          item.lodash
        ),
        ut2: ut2.merge(
          {
            method: item.method,
            params: item.params
          },
          item.ut2
        )
      };

      function isObjectOrArray(value) {
        return ut2.isArray(value) || ut2.isObjectLike(value);
      }

      function formatString(value) {
        let result;
        if (ut2.isArray(value)) {
          result = [];
          value.forEach((item) => {
            result.push(isObjectOrArray(item) ? formatString(item) : ut2.toString(item));
          });
        } else if (ut2.isObjectLike(value)) {
          result = {};
          ut2.allKeys(value).forEach((key) => {
            const newKey = ut2.toString(key);
            const newValue = isObjectOrArray(value[key]) ? formatString(value[key]) : ut2.toString(value[key]);
            result[newKey] = newValue;
          });
        } else {
          result = value === null ? 'null' : value === undefined ? 'undefined' : ut2.toString(value);
        }
        // console.log(value, result);
        return result;
      }

      function argToString(args) {
        const arr = formatString(args);
        return arr.map((item) => JSON.stringify(formatString(item))).join(', ');
      }

      item.params.forEach(function (args, i) {
        const suite = new Benchmark.Suite();

        if (!result[item.method][i]) {
          result[item.method][i] = {};
        }

        result[item.method][i].$case = item.method + '(' + argToString(args) + ')';

        const cases = {
          underscore: libConfig.underscore.method + '(' + argToString(libConfig.underscore.params[i]) + ')',
          lodash: libConfig.lodash.method + '(' + argToString(libConfig.lodash.params[i]) + ')',
          ut2: libConfig.ut2.method + '(' + argToString(libConfig.ut2.params[i]) + ')'
        };

        function addSuite(libName) {
          const obj = libObj[libName];
          const conf = libConfig[libName];

          if (!result[item.method][i][libName]) {
            result[item.method][i][libName] = {};
          }

          const currentLibResult = result[item.method][i][libName];
          const params = ut2.merge(conf.params[i]);

          currentLibResult.existed = conf.existed !== false;
          currentLibResult.result = currentLibResult.existed ? formatString(obj[conf.method].apply(null, params)) : undefined;
          currentLibResult.case = cases[libName];

          if (currentLibResult.existed) {
            suite.add(libName + '.' + currentLibResult.case, function () {
              obj[conf.method].apply(null, params);
            });
          }
        }

        Object.keys(libObj).forEach(function (item) {
          addSuite(item);
        });

        suite
          .on('cycle', function (event) {
            console.log(String(event.target));

            const libName = event.target.name.split('.')[0];
            // ref: https://benchmarkjs.com/docs/
            result[item.method][i][libName].hz = Math.floor(event.target.hz);
            result[item.method][i][libName].rme = '±' + event.target.stats.rme.toFixed(2) + '%';
            result[item.method][i][libName].sampled = event.target.stats.sample.length;
          })
          .on('complete', function () {
            const fasttestName = this.filter('fastest').map('name') + '';
            const libName = fasttestName.split('.')[0];
            result[item.method][i].$fastest = libName;
            console.log('Fastest is ' + fasttestName);

            completeCount += 1;
            if (completeCount === methodsCase.length && typeof onComplete === 'function') {
              onComplete(result);
            }
          })
          .run();
      });
    });

    // console.log('result: ', JSON.stringify(result));
    return result;
  }

  fastest.config = config;

  return fastest;
});

var iframe = document.createElement('iframe');
document.body.appendChild(iframe);

iframe.contentDocument.write(`
<html>

<body>
  <script>
    var object = {
      args: (function () { return arguments })(),
      array: [1],
      arrayBuffer: new ArrayBuffer(2),
      boolean: Object(false),
      blob: new Blob([]),
      date: new Date,
      element: document.body,
      errors: [new Error, new EvalError, new RangeError, new ReferenceError, new SyntaxError, new TypeError, new URIError],
      function: () => { },
      map: new Map,
      nan: NaN,
      null: null,
      number: Object(0),
      object: { a: 1 },
      promise: Promise.resolve(1),
      regexp: /x/,
      set: new Set,
      string: Object('a'),
      symbol: Symbol(),
      undefined: undefined,
      weakMap: new WeakMap,
      weakSet: new WeakSet,

      // array views
      float32Array: new Float32Array(new ArrayBuffer(24)),
      float64Array: new Float64Array(new ArrayBuffer(24)),
      int8Array: new Int8Array(new ArrayBuffer(24)),
      int16Array: new Int16Array(new ArrayBuffer(24)),
      int32Array: new Int32Array(new ArrayBuffer(24)),
      uint8Array: new Uint8Array(new ArrayBuffer(24)),
      uint8ClampedArray: new Uint8ClampedArray(new ArrayBuffer(24)),
      uint16Array: new Uint16Array(new ArrayBuffer(24)),
      uint32Array: new Uint32Array(new ArrayBuffer(24)),
      bigInt64Array: new BigInt64Array(new ArrayBuffer(8)),
      bigUint64Array: new BigUint64Array(new ArrayBuffer(8)),
      dateView: typeof DateView !== 'undefined' ? new DateView(new ArrayBuffer(24)) : undefined,

      // errors
      error: new Error,
      evalError: new EvalError,
      rangeError: new RangeError,
      referenceError: new ReferenceError,
      syntaxError: new SyntaxError,
      typeError: new TypeError,
      uriError: new URIError,
      aggregateError: new AggregateError([])
    }

    parent.childObject = object;
  </script>
</body>

</html>
`);

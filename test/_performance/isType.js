var toString = Object.prototype.toString;
function isType1(value, type) {
  var nativeTypeString = toString.call(value);
  var types = Array.isArray(type) ? type : [type];
  return types.some(function (item) {
    return nativeTypeString === '[object '.concat(item, ']');
  });
}

function isType2(value, type) {
  var nativeTypeString = toString.call(value);
  return nativeTypeString === '[object '.concat(type, ']');
}

function isType3(value, type) {
  var nativeTypeString = toString.call(value);
  return nativeTypeString === '[object ' + type + ']';
}

function isType4(value, type) {
  var nativeTypeString = toString.call(value);
  if (typeof type === 'string') {
    return nativeTypeString === '[object ' + type + ']';
  }
  return type.some(function (item) {
    return nativeTypeString === '[object ' + item + ']';
  });
}

function wrapObjectTag(type) {
  return '[object ' + type + ']';
}
function isType5(value, type) {
  var nativeTypeString = toString.call(value);
  if (typeof type === 'string') {
    return nativeTypeString === wrapObjectTag(type);
  }
  return type.some(function (item) {
    return nativeTypeString === wrapObjectTag(item);
  });
}

function run(cb) {
  const methods = [isType1, isType2, isType3, isType4, isType5];
  const total = 100000;

  methods.forEach((func) => {
    console.time(func.name);
    for (let i = 0; i < total; i++) {
      if (typeof cb === 'function') {
        cb(func);
      } else {
        func('', 'String');
      }
    }
    console.timeEnd(func.name);
  });
}

console.log('--------------- isTpey 单个参数 ---------------');
run();

console.log('--------------- isTpey 多个参数 ---------------');
run(function (func) {
  switch (func.name) {
    case 'isType1':
    case 'isType4':
    case 'isType5':
      func(() => {}, ['String', 'Function']);
      break;
    case 'isType2':
    case 'isType3':
      func(() => {}, 'String');
      func(() => {}, 'Function');
      break;
  }
});

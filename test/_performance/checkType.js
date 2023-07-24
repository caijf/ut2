var toString = Object.prototype.toString;
function checkType1(value, type) {
  var nativeTypeString = toString.call(value);
  var types = Array.isArray(type) ? type : [type];
  return types.some(function (item) {
    return nativeTypeString === '[object '.concat(item, ']');
  });
}

function checkType2(value, type) {
  var nativeTypeString = toString.call(value);
  return nativeTypeString === '[object '.concat(type, ']');
}

function checkType3(value, type) {
  var nativeTypeString = toString.call(value);
  return nativeTypeString === '[object ' + type + ']';
}

function checkType4(value, type) {
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
function checkType5(value, type) {
  var nativeTypeString = toString.call(value);
  if (typeof type === 'string') {
    return nativeTypeString === wrapObjectTag(type);
  }
  return type.some(function (item) {
    return nativeTypeString === wrapObjectTag(item);
  });
}

function run(cb) {
  const methods = [checkType1, checkType2, checkType3, checkType4, checkType5];
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

console.log('--------------- checkTpey 单个参数 ---------------');
run();

console.log('--------------- checkTpey 多个参数 ---------------');
run(function (func) {
  switch (func.name) {
    case 'checkType1':
    case 'checkType4':
    case 'checkType5':
      func(() => {}, ['String', 'Function']);
      break;
    case 'checkType2':
    case 'checkType3':
      func(() => {}, 'String');
      func(() => {}, 'Function');
      break;
  }
});

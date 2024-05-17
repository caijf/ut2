function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

function uniq_1(array) {
  return array.filter((value, index, arr) => {
    // indexOf 不支持 NaN
    // return arr.indexOf(value) === index;
    return arr.findIndex((item) => eq(item, value)) === index;
  });
}

function uniq_2(array) {
  return [...new Set(array)];
}

function uniq_3(array) {
  return Array.from(new Set(array));
}

function uniq_4(array, each) {
  const iteratee = typeof each === 'function' ? each : typeof each === 'string' ? (value) => value[each] : (value) => value;
  return array.filter((value, index, arr) => {
    const current = iteratee(value);
    return arr.findIndex((item) => eq(iteratee(item), current)) === index;
  });
}

function run() {
  const obj = { a: 1 };
  const value = [2, 1, NaN, 2, 1, 'a', 2, obj, 3, NaN, 'a', 4, 8, 9, 7, 1, obj, 2, 3, 1];
  const total = 100000;
  const methods = [uniq_1, uniq_2, uniq_3, uniq_4];

  methods.forEach((item) => {
    console.log(item.name, item(value));
  });

  methods.forEach((item) => {
    console.time(item.name);
    for (let i = 0; i < total; i++) {
      item(value);
    }
    console.timeEnd(item.name);
  });
}

console.log('--------------- uniq ---------------');
run();

function run() {
  const reg1 = /[&<>"']/g;
  const reg2 = RegExp(reg1.source);
  const total = 1000000;

  console.time('with global');
  for (let i = 0; i < total; i++) {
    reg1.test('<html><body></body></html>');
  }
  console.timeEnd('with global');

  console.time('none global');
  for (let i = 0; i < total; i++) {
    reg2.test('<html><body></body></html>');
  }
  console.timeEnd('none global');
}

console.log('--------------- regex-global ---------------');
run();

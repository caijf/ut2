function getRankedByHz(benchmarks) {
  return benchmarks
    .filter((bench) => bench.cycles && isFinite(bench.hz) && !bench.error)
    .sort((a, b) => {
      return a.hz < b.hz ? 1 : -1;
    });
}

function runTest(data) {
  const { options, tests, setup, teardown, libs, onCycle, onComplete } = data;

  // 由于 benchmark.js 不支持 esm，通过外部传入
  const { _, Benchmark } = libs;

  // ref: https://github.com/rd13/jsperf.app/blob/255cbd0f95c984466e4df205db1f74051b3d1fab/components/UI.js
  const ui = new Benchmark.Suite();

  Benchmark.prototype.setup = setup;
  Benchmark.prototype.teardown = teardown;

  const uiBenchmarks = [];

  ui.on('add', (event) => {
    let status = 'default';

    uiBenchmarks.push(event.target);

    event.target.on(
      'start cycle complete',
      _.throttle(function (event) {
        if (this.running) {
          status = 'running';
        } else if (this.cycles) {
          if (ui.running) {
            status = 'completed';
          } else {
            status = 'finished';
          }
        } else if (event.target.error) {
          status = 'error';
          console.log(event.target.error);
        }

        onCycle?.({
          id: this.id,
          name: this.name,
          count: Benchmark.formatNumber(this.count),
          size: this.stats.sample.length,
          status,
          running: ui.running
        });
      }, 200)
    );
  });

  tests.forEach((test, id) => {
    ui.add(test.title, {
      defer: test.async,
      fn: test.code,
      id
    });
  });

  ui.on('complete', () => {
    const ranked = getRankedByHz(uiBenchmarks);
    const fastest = ranked[0];
    const slowest = [...ranked].pop();

    const fastestHz = fastest?.hz;

    // Select some fields to pass to render
    const results = uiBenchmarks.map(({ id, hz, stats, error }) => {
      const perc = (1 - hz / fastestHz) * 100;
      const percentFormatted = Benchmark.formatNumber(perc < 1 ? perc.toFixed(2) : Math.round(perc));

      return {
        id,
        hz: Benchmark.formatNumber(hz.toFixed(hz < 100 ? 2 : 0)),
        rme: stats.rme.toFixed(2),
        fastest: id === fastest?.id,
        slowest: id === slowest?.id,
        status: error ? 'error' : 'finished',
        error,
        percent: percentFormatted
      };
    });

    onComplete?.({
      results
    });
  });

  if (options) {
    for (let benchmark of uiBenchmarks) {
      Object.assign(benchmark.options, options);
      benchmark.reset();
    }
  }

  ui.run({
    async: true,
    queued: true
  });

  return () => {
    ui.off();
    ui.abort();
    ui.length = 0;
  };
}

export default runTest;

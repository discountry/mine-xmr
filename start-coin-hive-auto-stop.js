const CoinHive = require('coin-hive');

function end(miner) {
  miner.stop();
  process.exit();
}

(async () => {
  // Create miner
  const miner = await CoinHive('zyc1ClPF1ZevATB5gChyGzZklCCZHmY7',{
    username: 'windows',
    devFee: 0,
    launch: {
      executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    }
  }); // CoinHive's Site Key

  // Start miner
  await miner.start();

  // Listen on events
  miner.on('found', () => console.log('Found!'));
  miner.on('accepted', () => console.log('Accepted!'));
  miner.on('update', data =>
    console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `)
  );

  // Stop miner
  setTimeout(async () => await end(miner), 60000);
})();
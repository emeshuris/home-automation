var Gpio = require('onoff').Gpio,
  led = new Gpio(14, 'out');
 
function exit() {
  led.unexport();
  process.exit();
}

led.writeSync(led.readSync() ^ 1);
 
process.on('SIGINT', exit);
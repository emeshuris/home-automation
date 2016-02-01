var Gpio = require('onoff').Gpio,
  led = new Gpio(14, 'out');
 
button.watch(function(err, value) {
  led.writeSync(value);
});
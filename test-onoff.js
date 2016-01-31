var Gpio = require('onoff').Gpio,
  led = new Gpio(14, 'out'),
  button = new Gpio(4, 'in', 'both');
 
button.watch(function(err, value) {
  led.writeSync(value);
});
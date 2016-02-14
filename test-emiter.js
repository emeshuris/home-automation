var gpio = require('rpi-gpio');
gpio.destroy();
var pin = 10;

gpio.setup(pin, gpio.DIR_OUT);
 
function write() {
    gpio.write(pin, false, function(err) {
        if (err) throw err;
        console.log('Written to pin: ' + pin);
    });
}
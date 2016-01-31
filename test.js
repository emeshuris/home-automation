var gpio = require('rpi-gpio');
 
gpio.setup(4, gpio.DIR_IN, readInput);
 
function readInput() {
    gpio.read(4, function(err, value) {
        console.log('The value is ' + value);
    });
}

gpio.setup(4, gpio.DIR_OUT, write);
function write() {
    gpio.write(4, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
}
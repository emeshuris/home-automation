var gpio = require('rpi-gpio');
 
gpio.setup(10, gpio.DIR_OUT, write);
 
function write() {
    gpio.write(10, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
}
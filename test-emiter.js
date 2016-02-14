var gpio = require('rpi-gpio');
gpio.destroy();
var pin = 10;

gpio.setup(pin, gpio.DIR_OUT);

function write(down) {
    gpio.write(pin, down, function(err) {
        if (err) throw err;
        console.log('Written to pin: ' + pin);
    });
}

write(true);
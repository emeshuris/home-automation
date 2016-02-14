var gpio = require('rpi-gpio');

var pin = 10;
var delay = 2000;
var count = 0;
var max = 3;

gpio.setup(pin, gpio.DIR_OUT, on);
gpio.setup(pin, gpio.DIR_OUT, off);
gpio.setup(pin, gpio.DIR_OUT, on);
gpio.setup(pin, gpio.DIR_OUT, off);

function on() {
    setTimeout(function () {
        gpio.write(pin, 1);
    }, delay);
}

function off() {
    setTimeout(function () {
        gpio.write(pin, 0);
    }, delay);
}
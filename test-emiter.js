var gpio = require("pi-gpio");
var pin = 15;

function flashLED(pin, duration) {
    return setInterval(function() {
        gpio.open(pin, "output", function(err) {
            gpio.write(pin, pin, function() {
                setTimeout(function() {
                    gpio.write(pin, 0, function(err) {
                        gpio.close(pin);
                    });
                }, duration/2);
            });
        });
    }, duration);
}

var intervalID = flashLED(7, 500);

setTimeout(function() {
    clearInterval(intervalID);
}, 60000);
var gpio = require('rpi-gpio');
/*
gpio.on('export', function(channel) {
    console.log('Channel set: ' + channel);
});
 */
gpio.setup(10, gpio.DIR_OUT);
/*
function pause() {
    setTimeout(closePins, 2000);
}
 
function closePins() {
    gpio.destroy(function() {
        console.log('All pins unexported');
    });
}
*/
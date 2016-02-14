var fastgpio = require( "fastgpio" );
var pin = 15;

fastgpio.prepareGPIO(pin);
fastgpio.set(pin);
fastgpio.unset(pin);
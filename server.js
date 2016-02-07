// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
//var Gpio = require('onoff').Gpio;

var gpio = require('rpi-gpio');
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 80; // set our port
var Bear = require('./app/models/bear');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')
/*
router.route('/bears/:bear_id')

    .get(function (req, res) {
        var led = new Gpio(req.params.bear_id, 'in');
        res.json({ message: 'Pin: ' + req.params.bear_id + ' State: ' + led.readSync() });
        led.unexport();
    })
*/
router.route('/bears/:bear_id/:bear_on')

    .put(function (req, res) {
        var pinId = req.params.bear_id;

        gpio.setup(pinId, gpio.DIR_OUT, write);

        var pinLow = req.params.bear_on == 0;

        function write() {
            gpio.write(pinId, pinLow, function (err) {
                if (err) throw err;
                console.log('Written to pin');
            });
        }
/*
        gpio.setup(pinId, gpio.DIR_IN, readInput);

        function readInput() {
            gpio.read(pinId, function (err, value) {
                console.log('The value is ' + value);
            });
        }
        */

        res.json({ message: 'Pin: ' + pinId + ' State: ' + req.params.bear_on });

    })

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
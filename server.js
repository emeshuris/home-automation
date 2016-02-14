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


var OFF = '1';
var ON = '0';
var NA = 'na';

var pinsNA = new Set([1, 2, 4, 6, 9, 14, 17, 20, 25, 30, 34, 39]);
var pinsOn = new Set();
var availableValues = new Set([ON, OFF]);

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
    .get(function (req, res) {
        res.json({ message: JSON.stringify(pinsOn) });
    })

router.route('/bears/:bear_id')
    .get(function (req, res) {
        var passedId = req.params.bear_id;
        res.json({ message: pinsOn[passedId] });
    })

router.route('/bears/:bear_id/:bear_on')
    .put(function (req, res) {
        var passedValue = req.params.bear_on;
        var passedId = req.params.bear_id;
        var currentPinValue = pinsOn.has(passedId) ? 0 : 1;
        var pinOn = (passedValue == ON) ? true : false;
        var message = '';

        /*
            console.log('passedValue: ' + passedValue);
            console.log('passedId: ' + passedId);
            console.log('currentPinValue: ' + currentPinValue);
            console.log('pinOn: ' + pinOn);
        */

        if (currentPinValue == passedValue) {
            message = 'Current state same as requested.';
            console.log(message);

            res.json({ message: message });
            return;
        }

        if (pinsNA.has(passedId)) {
            message = 'This pin is not allowed to do work.';
            console.log(message);

            res.json({ message: message });
            return;
        }

        if (!availableValues.has(passedValue)) {
            message = 'The passed value is invalid.';
            console.log(message);

            res.json({ message: message });
            return;
        }

        gpio.setup(passedId, gpio.DIR_OUT, updatePin);

        function updatePin() {
            gpio.write(passedId, !pinOn, pushToArray);
        }

        function pushToArray() {
            if (passedValue == ON) {
                pinsOn.add(passedId);
            } else {
                pinsOn.delete(passedId);
            }

            message = 'Written to pin. Value: ' + passedValue;
            console.log(message);

            pinsOn.forEach(function (value) {
                console.log(value);
            });

        }

        res.json({ message: message });
    })

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
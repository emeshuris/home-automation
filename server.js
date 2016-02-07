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

var pinsNotExposed = [1, 2, 4, 6, 9, 14, 17, 20, 25, 30, 34, 39];
var pins = new Array();

for (var i = 1; i <= 26; i++) {
    var obj = {};
    obj[i] = (!valueInArray(i) == true) ? 'off' : 'na';
    pins.push(obj);
}

function valueInArray(pinId) {
    pinsNotExposed.forEach(function (naPinId) {
        if (naPinId == pinId) {
            console.log(pinId + ' -eq ' + naPinId);
            return true;
        }
    });
    console.log(pinId + ' -neq ');
    return false;
}

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
        res.json({ message: JSON.stringify(pins) });
    })

router.route('/bears/:bear_id')
    .get(function (req, res) {
        var pinId = req.params.bear_id;
        res.json({ message: JSON.stringify(pins[pinId]) });
    })

router.route('/bears/:bear_id/:bear_on')
    .put(function (req, res) {
        var pinId = req.params.bear_id;
        var pinOn = (req.params.bear_on == 'on') ? true : false;

        if (pins[pinId] != "na") {
            gpio.setup(pinId, gpio.DIR_OUT, write);

            function write() {
                gpio.write(pinId, !pinOn, function (err) {
                    if (err) {
                        throw err;
                    }

                    pins[pinId] = req.params.bear_on;
                    console.log('Written to pin. Value: ' + pins[pinId]);
                });
            }
        }

        res.json({ message: '' });
    })

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
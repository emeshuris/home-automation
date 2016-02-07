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

var pin8Low = true;

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

router.route('/bears/:bear_id')
    .get(function (req, res) {
        var pinId = req.params.bear_id;
        res.json({ message: 'Pin: ' + pinId + ' State: ' + pin8Low });
    })

router.route('/bears/:bear_id/:bear_on')
    .put(function (req, res) {
        var pinId = req.params.bear_id;

        gpio.setup(pinId, gpio.DIR_OUT, write);

        var pinLow = req.params.bear_on == 0;

        function write() {
            gpio.write(pinId, pinLow, function (err) {
                if (err) throw err;
                pin8Low = pinLow;
                console.log('Written to pin');
            });
        }

        res.json({ message: 'Pin: ' + pinId + ' State: ' + req.params.bear_on });

    })

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var Gpio = require('onoff').Gpio;

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
        var led = new Gpio(req.params.bear_id, 'out');
        var turnedOn = req.params.bear_on;
        
        console.log('Passed value: ' + req.params.bear_on);
        console.log('Value to be written: ' + turnedOn);
        
        led.writeSync(turnedOn);

        if (turnedOn == 1) {
            led.unexport();
        }

        res.json({ message: 'Pin: ' + req.params.bear_id + ' State: ' + req.params.bear_on });

    })

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
// BASE SETUP
// =============================================================================

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

var port = process.env.PORT || 8080; // set our port
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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

// create a bear (accessed at POST http://localhost:8080/bears)
    .post(function (req, res) {

        var bear = new Bear();		// create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        bear.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });


    })

// get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function (req, res) {
        /*
        Bear.find(function (err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
        */
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

// get the bear with that id
    .get(function (req, res) {
        /*
        Bear.findById(req.params.bear_id, function (err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
        */
        var led = new Gpio(req.params.bear_id, 'out');
        led.writeSync(0);
        
        res.json({ message: req.params.bear_id});// + ': ' + led.readSync() });
        //led.unexport();
    })

// update the bear with this id
    .put(function (req, res) {
        var Gpio = require('onoff').Gpio, // Constructor function for Gpio objects. 
            led = new Gpio(14, 'out'),      // Export GPIO #14 as an output. 
            iv;
 
        // Toggle the state of the LED on GPIO #14 every 200ms. 
        // Here synchronous methods are used. Asynchronous methods are also available. 
        iv = setInterval(function () {
            led.writeSync(led.readSync() ^ 1); // 1 = on, 0 = off :) 
        }, 750);
 
        // Stop blinking the LED and turn it off after 5 seconds. 
        setTimeout(function () {
            clearInterval(iv); // Stop blinking 
            led.writeSync(0);  // Turn LED off. 
            led.unexport();    // Unexport GPIO and free resources 
        }, 1500);
    })


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
var schemata = require('schemata');

var gpioSchema = schemata({
  name: {
    type: String,
    name: 'Thing name'
  },
  gpio: {
    type: Number
  },
  active: {
    type: Boolean,
    defaultValue: false
  }
});
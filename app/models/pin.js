var schemata = require('schemata');

var pinSchema = schemata({
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
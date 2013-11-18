// DEPENDENCIES
// ============
'use strict';

var mongoose =     require('mongoose'),
    Schema =     mongoose.Schema;

var tmp36Schema = new Schema({
    sensorType: { type: String, default: 'invalid' },
    sensorName: { type: String, default: 'invalid' },
    sensorPin: { type: String, default: null },
    datetime: { type: Date, default: null },
    data: { type: String, default: null },
    voltage: { type: Number, default: null },
    degreesCelcius: { type: Number, default: null }
});

tmp36Schema.index({datetime: 1, type: -1});
tmp36Schema.index({degreesCelcius: 1, type: -1});

tmp36Schema.virtual('degreesFahrenheit').get(function() {
    return (this.degreesCelcius * 9.0 / 5.0) + 32.0;
});

// CREATE DATABASE MODEL
// =====================

var schemaModel = mongoose.model('tmp36SchemaModel', tmp36Schema);
module.exports = schemaModel;

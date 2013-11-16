// DEPENDENCIES
// ============
'use strict';

var mongoose =     require('mongoose'),
    Schema =     mongoose.Schema;

// TMP36 SCHEMA
// ===================

var tmp36Schema = new Schema({
    volts: {type: Number, default: null},
    degreesCelcius: {type: Number, default: null},
    date: {type: Date, default: null},
    sensorName: {type: String, default: null}
});

tmp36Schema.index({date: 1, type: -1});
tmp36Schema.index({degreesCelcius: 1, type: -1});

tmp36Schema.virtual('degreesFahrenheit').get(function() {
    return (this.degreesCelcius * 9.0 / 5.0) + 32.0;
});

// CREATE DATABASE MODEL
// =====================

var schemaModel = mongoose.model('tmp36SchemaModel', tmp36Schema);
module.exports = schemaModel;

// SCHEMA METHODS
// ==============

module.exports.getById = function(id, callback) {
    schemaModel.findById(id, function(err, docs){
        if (err) { callback(err); return; }
        callback(undefined, docs);
    });
};

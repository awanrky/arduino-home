'use strict';
/**
 * Created by mark on 11/16/13.
 */
var mongoose =     require('mongoose'),
    Schema =     mongoose.Schema;

var tsl2561Schema = new Schema({
    sensorType: { type: String, default: 'invalid' },
    sensorName: { type: String, default: 'invalid' },
    sensorPin: { type: String, default: null },
    datetime: { type: Date, default: null },
    data: { type: String, default: null },
    lux: { type: Number, default: null },
    broadband: { type: Number, default: null },
    infrared: { type: Number, default: null }
});

tsl2561Schema.index({datetime: 1, type: -1});
tsl2561Schema.index({lux: 1, type: -1});

// CREATE DATABASE MODEL
// =====================

var schemaModel = mongoose.model('tsl2561SchemaModel', tsl2561Schema);
module.exports = schemaModel;
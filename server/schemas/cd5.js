'use strict';
/**
 * Created by mark on 11/16/13.
 */
var mongoose =     require('mongoose'),
    Schema =     mongoose.Schema;

var cd5Schema = new Schema({
    sensorType: { type: String, default: 'invalid' },
    sensorName: { type: String, default: 'invalid' },
    sensorPin: { type: String, default: null },
    datetime: { type: Date, default: null },
    data: { type: String, default: null },
    reading: { type: Number, default: null }
});

cd5Schema.index({datetime: 1, type: -1});
cd5Schema.index({reading: 1, type: -1});

var schemaModel = mongoose.model('cd5SchemaModel', cd5Schema);
module.exports = schemaModel;
'use strict';
/**
 * Created by mark on 11/16/13.
 */
var mongoose =     require('mongoose'),
    Schema =     mongoose.Schema;

var dhtSchema = new Schema({
    sensorType: { type: String, default: 'invalid' },
    sensorName: { type: String, default: 'invalid' },
    sensorPin: { type: String, default: null },
    datetime: { type: Date, default: null },
    data: { type: String, default: null },
    degreesCelcius: { type: Number, default: null },
    humidity: { type: Number, default: null }
});

dhtSchema.index({datetime: 1, type: -1});
dhtSchema.index({degreesCelcius: 1, type: -1});
dhtSchema.index({humidity: 1, type: -1});

dhtSchema.virtual('degreesFahrenheit').get(function() {
    return (this.degreesCelcius * 9.0 / 5.0) + 32.0;
});

var schemaModel = mongoose.model('dhtSchemaModel', dhtSchema);
module.exports = schemaModel;
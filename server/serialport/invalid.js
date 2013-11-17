'use strict';
/**
 * Created by mark on 11/16/13.
 */

var Invalid = require('../schemas/invalid.js');

var invalid = {

    save: function(data) {
        data.returnedType = data.sensorType;
        data.sensorType = 'invalid';
        var schema = new Invalid(data);
        schema.save();
    }

};

module.exports = exports = invalid;
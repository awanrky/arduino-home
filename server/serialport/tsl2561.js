'use strict';
/**
 * Created by mark on 11/16/13.
 */

var Tsl2561Model = require('../schemas/tsl2561');

var tsl2561 = {

    save: function(data, dataArray) {
        data.sensorId = dataArray[0];
        data.lux = dataArray[1];
        data.broadband = dataArray[2];
        data.infrared = dataArray[3];
        var schema = new Tsl2561Model(data);
        schema.save();
    }

};

module.exports = exports = tsl2561;
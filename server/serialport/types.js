'use strict';
/**
 * Created by mark on 11/16/13.
 */

var sensor = require('./sensor');

var cd5 = require('./cd5');
var tsl2561 = require('./tsl2561');
var dht = require('./dht');
var tmp36 = require('./tmp36');
var invalid = require('./invalid');


var dataType = {
    tmp36: 'TMP36',
    cd5: 'Cd5',
    dht: 'DHT',
    tsl2561: 'TSL2561'
};

var types = {

    splitDataAndType: function(data) {
        var splitData = data.split(':');
        return {
            sensorType: splitData[0].trim(),
            data: splitData[1].trim().replace('\r', '')
        };
    },

    save: function(data) {
        var preparedData = types.splitDataAndType(data);
        var dataArray = preparedData.data.split(',');

        sensor.setSensorIdentityData(preparedData, dataArray);
        sensor.setDateTime(preparedData);

        switch(preparedData.sensorType) {
            case dataType.tmp36:
                return tmp36.save(preparedData, dataArray);
            case dataType.cd5:
                return cd5.save(preparedData, dataArray);
            case dataType.dht:
                return dht.save(preparedData, dataArray);
            case dataType.tsl2561:
                return tsl2561.save(preparedData, dataArray);
            default:
                return invalid.save(preparedData, dataArray);
        }
    }
};

module.exports = exports = types;
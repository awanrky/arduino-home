'use strict';
/**
 * Created by mark on 11/16/13.
 */

var DhtModel = require('../schemas/dht');

var dht = {

    save: function(data, dataArray) {
        data.degreesCelcius = dataArray[0];
        data.humidity = dataArray[1];
        var schema = new DhtModel(data);
        schema.save();
    }

};

module.exports = exports = dht;
'use strict';
/**
 * Created by mark on 11/16/13.
 */

var Cd5Model = require('../schemas/cd5');

var cd5 = {

    save: function(data, dataArray) {
        data.reading = dataArray[0];
        var schema = new Cd5Model(data);
        schema.save();
    }

};

module.exports = exports = cd5;
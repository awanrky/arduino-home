'use strict';
/**
 * Created by mark on 11/16/13.
 */

var Tmp36Model = require('../schemas/tmp36');

var tmp36 = {

    save: function(data, splitData) {
        data.voltage = splitData[0];
        data.degreesCelcius = splitData[1];
        var schema = new Tmp36Model(data);
        schema.save();
    }

};

module.exports = exports = tmp36;
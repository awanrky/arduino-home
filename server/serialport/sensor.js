'use strict';
/**
 * Created by mark on 11/16/13.
 */
module.exports = exports = {


    /**
     * WARNING!
     *
     * this function has side effects.  It shifts values off the start of
     * the array, as well as modifying data
     *
     * @param data
     * @param dataArray
     */
    setSensorIdentityData: function(data, dataArray) {
        data.sensorName = dataArray.shift();
        data.sensorPin = dataArray.shift();
    },

    setDateTime: function(data) {
        data.datetime = new Date();
    }
}
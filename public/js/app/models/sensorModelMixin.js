'use strict';
/**
 * Created by mark on 11/18/13.
 */
define([
    'moment'
], function(moment) {
    return {

        formattedDateTime: function (datetime) {
            return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
        },

        degreesFahrenheit: function (degreesCelcius) {
            return ((degreesCelcius * 9.0 / 5.0) + 32.0).toFixed(2);
        }

    };
});
'use strict';
/**
 * Created by mark on 1/12/14.
 */

var request = require('request');

var bmp180 = {

    save: function(data, dataArray) {
        data.degreesCelcius = dataArray[0];
        data.hectoPascals = dataArray[1];
        data.altitudeInMeters = dataArray[2];
        console.log(data);

        var r = request.post('http://gadfly:1337/api/v1/arduino-home/bmp180');
        var form = r.form();
        form.append('degreesCelcius', data.degreesCelcius);
        form.append('hectoPascals', data.hectoPascals);
        form.append('altitudeInMeters', data.altitudeInMeters);
        form.append('sensorName', data.sensorName);


    }

};

module.exports = exports = bmp180;
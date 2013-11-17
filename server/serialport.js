/**
 * Created by mark on 11/14/13.
 */
'use strict';

var serialPort = require('serialport');

var dataType = {
    tmp36: 'TMP36',
    cd5: 'Cd15',
    dht: 'DHT',
    tsl2561: 'TSL2561'
};

/**
 * WARNING!
 *
 * this function has side effects.  It shifts values off the start of
 * the array, as well as modifying data
 *
 * @param data
 * @param dataArray
 */
function setSensorIdentityData(data, dataArray) {
    data.sensorName = dataArray.shift();
    data.sensorId = dataArray.shift();
}

function parseTmp36Data(data) {
    var splitData = data.data.split(',');
    setSensorIdentityData(data, splitData);
    data.voltage = splitData[0];
    data.degreesCelcius = splitData[1];
    return data;
}

function parseCd5Data(data) {
    var splitData = data.data.split(',');
    setSensorIdentityData(data, splitData);
    splitData.reading = data[0];
    return data;
}

function parseDhtData(data) {
    var splitData = data.data.split(',');
    setSensorIdentityData(data, splitData);
    data.degreesCelcius = splitData[0];
    data.humidity = splitData[1];
    return data;
}

function parseTsl2561Data(data) {
    var splitData = data.data.split(',');
    setSensorIdentityData(data, splitData);
    data.sensorId = splitData[0];
    data.lux = splitData[1];
    data.broadband = splitData[2];
    data.infrared = splitData[3];
    return data;
}

function splitDataAndType(data) {
    var splitData = data.split(':');
    return {
        type: splitData[0].trim(),
        data: splitData[1].trim().replace('\r', '')
    };
}

function setDateTime(data) {
    data.datetime = new Date();
}

function parseData(data) {
    var splitData = splitDataAndType(data);

    setDateTime(splitData);

    switch(splitData.type) {
        case dataType.tmp36:
            return parseTmp36Data(splitData);
        case dataType.cd5:
            return parseCd5Data(splitData);
        case dataType.dht:
            return parseDhtData(splitData);
        case dataType.tsl2561:
            return parseTsl2561Data(splitData);
        default:
            splitData.returnedType = splitData.type;
            splitData.type = 'invalid';
            return splitData;
    }
}

function SerialPort (config) {
    this.config = config;
    this.serialPort = new serialPort.SerialPort(config.serialport, {
        parser: serialPort.parsers.readline('\n'),
        baudrate: config.baudrate
    });
}

function onData(data) {
    var parsedData = parseData(data);
    console.log(parsedData);
}

SerialPort.prototype = {
    version: '0.0.1',

    isOpen: false,

    open: function() {
        var that = this;

        this.serialPort.open(function () {
            that.isOpen = true;
            console.log('Arduino SerialPort open.  Port: ' +
                that.config.serialport +
                ', Baudrate: ' +
                that.config.baudrate);
        });

        this.serialPort.on('data', onData);
    }
};

module.exports = exports = SerialPort;

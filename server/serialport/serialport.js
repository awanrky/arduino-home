/**
 * Created by mark on 11/14/13.
 */
'use strict';

var serialPort = require('serialport');
var types = require('./types');

function SerialPort (config) {
    this.config = config;
    this.serialPort = new serialPort.SerialPort(config.serialport, {
        parser: serialPort.parsers.readline('\n'),
        baudrate: config.baudrate
    });
}

function onData(data) {
    types.save(data);
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

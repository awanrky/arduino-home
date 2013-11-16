/**
 * Created by mark on 11/14/13.
 */
'use strict';

var SP = require('serialport').SerialPort;

function SerialPort (config) {
    this.config = config;
    this.serialPort = new SP(config.serialport, {
        baudrate: config.baudrate
    });
}

function onData(data) {

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

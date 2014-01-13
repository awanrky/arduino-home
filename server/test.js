/**
 * Created by mark on 1/12/14.
 */
var Config = require('./config/config.js').config,
    SerialPort = require('./serialport/serialport');

var serialPort = new SerialPort(Config.arduino);

module.exports = serialPort;

serialPort.open();

// Start Node.js Server
//http.createServer(server).listen(port);
console.log('server started...');
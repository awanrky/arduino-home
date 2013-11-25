'use strict';
/**
 * Created by mark on 11/24/13.
 */

var express = require('express');

var Config = require('./config/config.js').config,
    http = require('http'),
    server = express(),
    mongoose = require('mongoose'),
//    SerialPortRoute = require('./routes/serialport'),
//    SensorDataAll = require('./routes/sensordata/all'),
//    TMP36 = require('./routes/tmp36'),
//    DHT = require('./routes/dht'),
//    CD5 = require('./routes/cd5'),
//    TSL2561 = require('./routes/tsl2561'),
    SerialPort = require('./serialport/serialport');

module.exports = server;

var port = process.env.ARDUINO_HOME_PORT || Config.listenPort;
var serialPort = new SerialPort(Config.arduino);

mongoose.connect('mongodb://' +
    Config.database.IP + ':' +
    Config.database.port + '/' +
    Config.database.name);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
    console.log('Connected to ' + Config.database.name);
});

server.configure(function() {

    server.use(express['static'](__dirname + '/../public'));

    server.use(express.errorHandler({

        dumpExceptions: true,

        showStack: true

    }));

    server.use(express.bodyParser());

    server.use(express.cookieParser());

    server.use(express.session({ secret: Config.sessionSecret }));

    server.use(server.router);

});
//SerialPortRoute.serialport(server);
//TMP36.tmp36(server);
//DHT.dht(server);
//CD5.cd5(server);
//TSL2561.tsl2561(server);

//SensorDataAll.all(server);

serialPort.open();

// Start Node.js Server
http.createServer(server).listen(port);
console.log('server started...');
'use strict';
/**
 * Created by mark on 11/14/13.
 */

var serialport = require('serialport');
var RouteInformation = require('./routeinformation');

var routeInformation = new RouteInformation('serialport');

module.exports.serialport = function(server) {
//    console.log(routeInformation.getPath('list'));

    server.get(routeInformation.getPath('list'), function(req, res){
        serialport.list(function (error, ports) {
            if (error) {
                res.send(500, {error: error.message});
                return;
            }

            res.send(ports);
        });
    });

};
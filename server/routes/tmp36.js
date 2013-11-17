/**
 * Created by mark on 11/11/13.
 */
'use strict';

var schema = require('../schemas/tmp36');
var RouteInformation = require('./routeinformation');

var routeInformation = new RouteInformation('invalid');


module.exports.tmp36 = function(server) {

    server.get(routeInformation.getPath('id/:id'), function(req, res){
//        console.log(req.params.id);
        schema.getById(req.params.id, function(error, documents) {
            if (error) {
                res.send(500, {error: error.message});
                return;
            }
//            console.log(documents);
            res.send(documents);
        });
    });

    server.post(routeInformation.getPath(), function(req, res) {
//        console.log(req.body);
        var tmp36 = new schema({
            volts: req.body.volts,
            degreesCelcius: req.body.degreesCelcius,
            date: req.body.date || new Date,
            sensorName: req.body.sensorName
        });

        tmp36.save(function(error, newTmp36) {
            if (error) {
                res.send(500, { error: error.message });
                return;
            }

            res.send(newTmp36);
        });
    });

};

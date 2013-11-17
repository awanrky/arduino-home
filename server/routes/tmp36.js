/**
 * Created by mark on 11/11/13.
 */
'use strict';

var schema = require('../schemas/tmp36');
var RouteInformation = require('./routeinformation');

var routeInformation = new RouteInformation('tmp36');


module.exports.tmp36 = function(server) {

    server.get(routeInformation.getPath('id/:id'), function(req, res){
        schema.findById(req.params.id, function(err, docs){
            if (err) { res.send(400, {error: err.message}); return; }
            res.send(docs);
        });
    });

    server.get(routeInformation.getPath('last/:count'), function(req, res) {
        schema.find().sort({datetime: -1}).limit(req.params.count).exec(function(error, documents) {
            if (error) { res.send(400, {error: error.message}); return; }
            res.send(documents);
        });
    });

    server.post(routeInformation.getPath(), function(req, res) {
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

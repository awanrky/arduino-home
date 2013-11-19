'use strict';
/**
 * Created by mark on 11/18/13.
 */

var schema = require('../schemas/dht');
var RouteInformation = require('./routeinformation');

var routeInformation = new RouteInformation('dht');


module.exports.dht = function(server) {

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
        var dht = new schema({
            humidity: req.body.humidity,
            degreesCelcius: req.body.degreesCelcius,
            date: req.body.date || new Date(),
            sensorName: req.body.sensorName
        });

        dht.save(function(error, newDht) {
            if (error) {
                res.send(500, { error: error.message });
                return;
            }

            res.send(newDht);
        });
    });

};
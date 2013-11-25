'use strict';
/**
 * Created by mark on 11/23/13.
 */
var schema = require('../schemas/cd5');
var RouteInformation = require('./routeinformation');
var _ = require('lodash');

var moment = require('moment');

var routeInformation = new RouteInformation('cd5');

module.exports.cd5 = function(server) {

    server.get(routeInformation.getPath('id/:id'), function(req, res){
        schema.findById(req.params.id, function(err, docs){
            if (err) { res.send(400, {error: err.message}); return; }
            res.send(docs);
        });
    });

    server.get(routeInformation.getPath('daterange/:start'), getDaterange);
    server.get(routeInformation.getPath('daterange/:start/:end'), getDaterange);

    function getDaterange(req, res) {
        var startDate = new Date(req.params.start);
        var endDate = (!!req.params.end) ? new Date(req.params.end) : new Date();

        schema
            .find({datetime: {$gt: startDate}})
            .find({datetime: {$lt: endDate}})
            .find({sensorName: 'outside-deck'})
            .exec(function(error, documents) {
                if (error) { res.send(400, {error: error.message}); return; }
                res.send(documents);
            });
    }
};
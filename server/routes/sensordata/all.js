'use strict';
/**
 * Created by mark on 11/17/13.
 */

var RouteInformation = require('../routeinformation');

var tmp36Schema = require('../../schemas/tmp36');
var cd5Schema = require('../../schemas/cd5');
var dhtSchema = require('../../schemas/dht');
var tsl2561Schema = require('../../schemas/tsl2561');
var invalidSchema = require('../../schemas/invalid');

var routeInformation = new RouteInformation('sensordata/all');

module.exports.all = function(server) {

    server.get(routeInformation.getPath('count'), function(req, res) {
        var data = {};

        tmp36Schema.count().exec().then(function(value) {
            data.tmp36Count = value;
        })
        .then(cd5Schema.count().exec().then(function(value) {
            data.cd5Count = value;
        })
        .then(dhtSchema.count().exec().then(function(value) {
            data.dhtCount = value;
        })
        .then(tsl2561Schema.count().exec().then(function(value) {
            data.tsl2561Count = value;
        })
        .then(invalidSchema.count().exec().then(function(value) {
            data.invalidCount = value;
        })
        .then(function() {
            res.send(data);
        }, function(error) {
            res.send(500, error);
        })))));
    });

};
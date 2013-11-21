/**
 * Created by mark on 11/20/13.
 */
define([
    'jquery',
    'backbone',
    'models/dhtHourlyModel'
],
    function ($, Backbone, Model) {
        'use strict';
        return Backbone.Collection.extend({
            url: '/api/v0/dht/hourly/100',
            model: Model
        });
    }
);
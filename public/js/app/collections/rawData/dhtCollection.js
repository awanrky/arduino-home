
/**
 * Created by mark on 11/18/13.
 */
define([
    'jquery',
    'backbone',
    'models/rawData/dhtModel'
],
    function ($, Backbone, Model) {
        'use strict';
        return Backbone.Collection.extend({
            url: '/api/v0/dht/last/100',
            model: Model
        });
    }
);
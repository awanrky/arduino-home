define([
    'jquery',
    'backbone',
    'models/rawData/tmp36Model'
],
    function ($, Backbone, Model) {
        'use strict';

        return Backbone.Collection.extend({
            url: '/api/v0/tmp36/last/100',
            model: Model
        });
    }
);
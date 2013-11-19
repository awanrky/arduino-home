
define([
    'jquery',
    'backbone',
    'underscore',
    '../sensorModelMixin'
], function($, Backbone, _, sensorModelMixin) {
        'use strict';
        return Backbone.Model.extend(_.extend({

            url: '',

            initialize: function () {

            },

            defaults: {

            },

            validate: function (attrs) {

            }

        }, sensorModelMixin));
    }
);

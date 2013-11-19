'use strict';
/**
 * Created by mark on 11/18/13.
 */
define([
    'jquery',
    'backbone',
    'underscore',
    '../sensorModelMixin'
], function($, Backbone, _, sensorModelMixin) {

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

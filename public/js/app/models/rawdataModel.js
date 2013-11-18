// IndexModel.js

define([
    'jquery',
    'backbone',
    './sensorDataCountModel',
    '../collections/rawData/tmp36Collection'
],
    function (
        $,
        Backbone,
        SensorDataCountModel,
        Tmp36RawDataCollection) {
        'use strict';

        // Creates a new Backbone Model class object
        // Returns the Model class
        return Backbone.Model.extend({

            url: '',

            // Model Constructor
            initialize: function () {

                this.tmp36RawDataCollection = new Tmp36RawDataCollection();

            },

            // Default values for all of the Model attributes
            defaults: {

            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function (attrs) {

            }

        });

    }

);

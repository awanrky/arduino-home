// IndexModel.js

define(['jquery', 'backbone'],

    function($, Backbone) {
        'use strict';

        // Creates a new Backbone Model class object
        var sensorDataCountModel = Backbone.Model.extend({

            url: '/api/v0/sensordata/all/count',

            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {
                cd5Count: '-',
                dhtCount: '-',
                invalidCount: '-',
                tmp36Count: '-',
                tsl2561Count: '-'
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return sensorDataCountModel;

    }

);

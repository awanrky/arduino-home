// IndexModel.js

define(['jquery', 'backbone', 'moment'],

    function($, Backbone, moment) {
        'use strict';

        // Creates a new Backbone Model class object
        var tmp36Model = Backbone.Model.extend({

            url: '',

            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {

            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },

            formattedDateTime: function () {
                return moment(this.attributes.datetime).format('YYYY-MM-DD HH:mm:ss');
            },

            degreesFahrenheit: function () {
                return (this.attributes.degreesCelcius * 9.0 / 5.0) + 32.0;
            }

        });

        // Returns the Model class
        return tmp36Model;
    }

);

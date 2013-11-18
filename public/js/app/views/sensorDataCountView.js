define([
    'jquery',
    'backbone',
    'text!templates/sensorDataCount.html',
    '../models/sensorDataCountModel'
],

    function ($, Backbone, template, SensorDataCountModel) {
        'use strict';

        // Returns the View class
        return Backbone.View.extend({

            // The DOM Element associated with this view
//            el: '.magic',

            // View constructor
            initialize: function () {
                var that = this;

                this.model = new SensorDataCountModel();
                this.model.fetch();

                // Calls the view's render method
                this.model.on('change', function() {
                    that.render();
                });

            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function () {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, this.model);

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

    }

);

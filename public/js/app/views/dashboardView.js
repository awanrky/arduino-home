define(['jquery',
    'backbone',
    'underscore',
    'models/dashboardModel',
    'views/dhtHourlyView',
    'text!templates/dashboard.html'],

    function ($, Backbone, _, Model, DhtHourlyView, template) {
        'use strict';

        // Returns the View class
        return Backbone.View.extend({

            // The DOM Element associated with this view
            el: '.magic',

            // View constructor
            initialize: function () {

                // Calls the view's render method
                this.render();

            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function () {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                this.dhtHourlyView = new DhtHourlyView();
                this.dhtHourlyView.fetch();

                // Maintains chainability
                return this;

            }

        });

    }

);
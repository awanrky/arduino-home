define(['jquery',
    'backbone',
    'underscore',
    'models/dashboardModel',
    'views/DhtHumidityLineChartView',
    'views/DhtTemperatureLineChartView',
    'views/Tmp36MultiSeriesLineChartView',
    'views/Cd5LineChartView',
    'views/Tsl2561MultiSeriesLineChartView',
    'text!templates/dashboard.html'],

    function ($, Backbone, _, Model,
              DhtHumidityLineChartView,
              DhtTemperatureLineChartView,
              Tmp36MultiSeriesLineChartView,
              Cd5LineChartView,
              Tsl2561MultiSeriesLineChartView,
              template) {
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

            daterange: '2013-11-24',

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function () {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                this.tmp36LineChartView = new Tmp36MultiSeriesLineChartView();
                this.tmp36LineChartView.params = this.daterange;
                this.tmp36LineChartView.fetch();

                this.dhtTemperatureLineChartView = new DhtTemperatureLineChartView();
                this.dhtTemperatureLineChartView.params = this.daterange;
                this.dhtTemperatureLineChartView.fetch();

                this.dhtHumidityLineChartView = new DhtHumidityLineChartView();
                this.dhtHumidityLineChartView.params = this.daterange;
                this.dhtHumidityLineChartView.fetch();

                this.cd5LineChartView = new Cd5LineChartView();
                this.cd5LineChartView.params = this.daterange;
                this.cd5LineChartView.fetch();

                this.tsl2561MultiSeriesLineChartView = new Tsl2561MultiSeriesLineChartView();
                this.tsl2561MultiSeriesLineChartView.params = this.daterange;
                this.tsl2561MultiSeriesLineChartView.fetch();

                // Maintains chainability
                return this;

            }

        });

    }

);
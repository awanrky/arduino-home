define(['jquery',
    'backbone',
    'underscore',
    'models/dashboardModel',
    'views/DhtHumidityLineChartView',
    'views/DhtTemperatureLineChartView',
    'views/Tmp36MultiSeriesLineChartView',
    'views/Cd5MultiSeriesLineChartView',
    'views/Tsl2561MultiSeriesLineChartView',
    'text!templates/dashboard.html'],

    function ($, Backbone, _, Model,
              DhtHumidityLineChartView,
              DhtTemperatureLineChartView,
              Tmp36MultiSeriesLineChartView,
              Cd5MultiSeriesLineChartView,
              Tsl2561MultiSeriesLineChartView,
              template) {
        'use strict';

        return Backbone.View.extend({

            el: '.magic',

            daterange: '2013-11-25',

            initialize: function () {
                this.render();
            },

            events: {

            },

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

                this.cd5MultiSeriesLineChartView = new Cd5MultiSeriesLineChartView();
                this.cd5MultiSeriesLineChartView.params = this.daterange;
                this.cd5MultiSeriesLineChartView.fetch();

                this.tsl2561MultiSeriesLineChartView = new Tsl2561MultiSeriesLineChartView();
                this.tsl2561MultiSeriesLineChartView.params = this.daterange;
                this.tsl2561MultiSeriesLineChartView.fetch();

                // Maintains chainability
                return this;

            }

        });

    }

);
define(['jquery',
    'backbone',
    'underscore',
    'moment',
    'models/dashboardModel',
    'views/DhtHumidityLineChartView',
    'views/DhtTemperatureLineChartView',
    'views/Tmp36MultiSeriesLineChartView',
    'views/Cd5MultiSeriesLineChartView',
    'views/Tsl2561MultiSeriesLineChartView',
    'text!templates/rawdata.html',
    'bootstrap-daterangepicker'],

    function ($, Backbone, _,
              moment,
              Model,
              DhtHumidityLineChartView,
              DhtTemperatureLineChartView,
              Tmp36MultiSeriesLineChartView,
              Cd5MultiSeriesLineChartView,
              Tsl2561MultiSeriesLineChartView,
              template) {
        'use strict';

        function formatParams(start, end) {
            if (!start) { start = moment().startOf('day'); }
            if (!end) { return start.format(); }
            return start.format() + '/' + end.format();
        }

        function formatDateRangePicker(start, end) {
            if (!start) { return ' -- '; }
            var returnValue =  start.format('MMMM D, YYYY HH:mm');
            if (!end) { return returnValue + ' - Now'; }
            return returnValue + ' - ' + end.format('MMMM D, YYYY HH:mm');
        }

        return Backbone.View.extend({

            el: '.magic',

            initialize: function () {
                this.render();
            },

            events: {

            },

            update: function (start, end) {

                var params = formatParams(start, end);

                $('#daterangepicker span').html(formatDateRangePicker(start, end));

                this.tmp36LineChartView.params = params;
                this.tmp36LineChartView.fetch();

                this.dhtTemperatureLineChartView.params = params;
                this.dhtTemperatureLineChartView.fetch();

                this.dhtHumidityLineChartView.params = params;
                this.dhtHumidityLineChartView.fetch();

                this.cd5MultiSeriesLineChartView.params = params;
                this.cd5MultiSeriesLineChartView.fetch();

                this.tsl2561MultiSeriesLineChartView.params = params;
                this.tsl2561MultiSeriesLineChartView.fetch();

            },

            render: function () {
                var that = this;

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                this.tmp36LineChartView = new Tmp36MultiSeriesLineChartView();

                this.dhtTemperatureLineChartView = new DhtTemperatureLineChartView();

                this.dhtHumidityLineChartView = new DhtHumidityLineChartView();

                this.cd5MultiSeriesLineChartView = new Cd5MultiSeriesLineChartView();

                this.tsl2561MultiSeriesLineChartView = new Tsl2561MultiSeriesLineChartView();

                $('#daterangepicker').daterangepicker({
                        ranges: {
                            'Today': [moment().startOf('day'), moment().endOf('day')],
                            'Yesterday': [
                                moment().startOf('day').subtract('days', 1),
                                moment().endOf('day').subtract('days', 1)
                            ],
                            'Last 7 Days': [
                                moment().startOf('day').subtract('days', 6),
                                moment().endOf('day')
                            ],
                            'Last 30 Days': [
                                moment().startOf('day').subtract('days', 29),
                                moment().endOf('day')
                            ],
                            'This Month': [
                                moment().startOf('month'),
                                moment().endOf('month')
                            ],
                            'Last Month': [
                                moment().subtract('month', 1).startOf('month'),
                                moment().subtract('month', 1).endOf('month')
                            ]
                        },
                        startDate: moment().subtract('days', 29),
                        endDate: moment(),
                        timePicker: true,
                        timePickerIncrement: 30,
                        format: 'MM/DD/YYYY h:mm A'
                    },
                    function(start, end) {
                        this.start = start;
                        this.end = end;

                        that.update(start, end);
                    });

                this.update(moment().startOf('day'));

                // Maintains chainability
                return this;

            }

        });

    }

);
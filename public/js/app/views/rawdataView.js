define(['jquery',
    'backbone',
    'underscore',
    'moment',
    'events/Notifier',
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
              notifier,
              Model,
              DhtHumidityLineChartView,
              DhtTemperatureLineChartView,
              Tmp36MultiSeriesLineChartView,
              Cd5MultiSeriesLineChartView,
              Tsl2561MultiSeriesLineChartView,
              template) {
        'use strict';

        function formatDateRangePicker(start, end) {
            if (!start) { return ' -- '; }
            var returnValue =  start.format('MMMM D, YYYY HH:mm');
            if (!end) { return returnValue + ' - Now'; }
            return returnValue + ' - ' + end.format('MMMM D, YYYY HH:mm');
        }

        return Backbone.View.extend({

            el: '.magic',

            initialize: function () {
                notifier.on('onSecond', function() { console.log('onSecond event fired.'); });
                this.render();
            },

            events: {

            },

            update: function (start, end) {

                $('#daterangepicker span').html(formatDateRangePicker(start, end));

                this.tmp36MultiSeriesLineChartView.setDateRange(start, end);

                this.dhtTemperatureLineChartView.setDateRange(start, end);

                this.dhtHumidityLineChartView.setDateRange(start, end);

                this.cd5MultiSeriesLineChartView.setDateRange(start, end);

                this.tsl2561MultiSeriesLineChartView.setDateRange(start, end);

            },

            render: function () {
                var that = this;

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                this.tmp36MultiSeriesLineChartView = new Tmp36MultiSeriesLineChartView();

                this.dhtTemperatureLineChartView = new DhtTemperatureLineChartView();

                this.dhtHumidityLineChartView = new DhtHumidityLineChartView();

                this.cd5MultiSeriesLineChartView = new Cd5MultiSeriesLineChartView();

                this.tsl2561MultiSeriesLineChartView = new Tsl2561MultiSeriesLineChartView();

                $('#daterangepicker').daterangepicker({
                        ranges: {
                            'Today': [moment().startOf('day')],
                            'Yesterday and Today': [
                                moment().startOf('day').subtract('days', 1)
                            ],
                            'Last 3 Days': [
                                moment().startOf('day').subtract('days', 2),
                                moment().endOf('day')
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
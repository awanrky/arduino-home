/**
 * Created by mark on 11/20/13.
 */
define([
    'jquery',
    'backbone',
    'underscore',
    './MultiSeriesLineChartView',
    '../models/sensorModelMixin'
],
    function($, Backbone, _, MultiSeriesLineChartView, sensorModelMixin){
        'use strict';

        var seriesDataDefinition = [{
            name: 'temperature',
            mapValues: function(data) {
                seriesDataDefinition[0].values = data.map(function(d) {
                    return {
                        date: new Date(d.datetime),
                        value: +sensorModelMixin.degreesFahrenheit(d.degreesCelcius)
                    };
                });
            }
        }, {
            name: 'humidity',
            mapValues: function(data) {
                seriesDataDefinition[1].values = data.map(function(d) {
                    return {
                        date: new Date(d.datetime),
                        value: +d.humidity
                    };
                });
            }
        }];

        return MultiSeriesLineChartView.extend({

            el: '#dht-hourly',

            url: 'api/v0/dht',

            path: 'daterange',

            params: '2013-11-23',

            width: 1000,

            height: 250,

            yLabel: 'DHT',

            series: seriesDataDefinition

//            getDataPoint: function(d) {
//                return sensorModelMixin.degreesFahrenheit(d.degreesCelcius);
//            }

        });
    }
);
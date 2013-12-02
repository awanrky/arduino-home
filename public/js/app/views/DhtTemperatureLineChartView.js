/**
 * Created by mark on 11/23/13.
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
            name: 'living-room',
            mapValues: function(data) {
                seriesDataDefinition[0].values = _.filter(data, function(d) {
                    return d.sensorName === 'living-room';
                }).map(function(d) {
                        return {
                            date: new Date(d.datetime),
                            value: +sensorModelMixin.degreesFahrenheit(d.degreesCelcius)
                        };
                    });
            }
        }, {
            name: 'outside-deck',
            mapValues: function(data) {
                seriesDataDefinition[1].values = _.filter(data, function(d) {
                    return d.sensorName === 'outside-deck';
                }).map(function(d) {
                        return {
                            date: new Date(d.datetime),
                            value: +sensorModelMixin.degreesFahrenheit(d.degreesCelcius)
                        };
                    });
            }
        }];

        return MultiSeriesLineChartView.extend({

            el: '#dht-temperature-line-chart',

            url: 'api/v0/dht',

            path: 'daterange',

            params: '2013-11-21',

            width: 1000,

            height: 250,

            yLabel: 'DHT Temperature',

            series: seriesDataDefinition

        });
    }
);
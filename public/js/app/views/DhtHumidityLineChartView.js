/**
 * Created by mark on 11/23/13.
 */
define([
    'jquery',
    'backbone',
    'underscore',
    './MultiSeriesLineChartView'
],
    function($, Backbone, _, MultiSeriesLineChartView){
        'use strict';

        var seriesDataDefinition = [{
            name: 'living-room',
            mapValues: function(data) {
                seriesDataDefinition[0].values = _.filter(data, function(d) {
                    return d.sensorName === 'living-room';
                }).map(function(d) {
                        return {
                            date: new Date(d.datetime),
                            value: +d.humidity
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
                            value: +d.humidity
                        };
                    });
            }
        }];

        return MultiSeriesLineChartView.extend({

            el: '#dht-humidity-line-chart',

            url: 'api/v0/dht',

            path: 'daterange',

            params: '2013-11-21',

            width: 1000,

            height: 250,

            yLabel: 'DHT Humidity',

            series: seriesDataDefinition

        });
    }
);
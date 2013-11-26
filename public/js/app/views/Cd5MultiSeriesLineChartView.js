/**
 * Created by mark on 11/25/13.
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
                            value: +d.reading
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
                            value: +d.reading
                        };
                    });
            }
        }];

        return MultiSeriesLineChartView.extend({

            el: '#cd5-line-chart',

            url: 'api/v0/cd5',

            path: 'daterange',

            params: '2013-11-23',

            width: 1000,

            height: 250,

            yLabel: 'Cd5',

            series: seriesDataDefinition

        });
    }
);
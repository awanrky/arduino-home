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
            name: 'lux',
            mapValues: function(data) {
                seriesDataDefinition[0].values = data.map(function(d) {
                    return {
                        date: new Date(d.datetime),
                        value: +d.lux
                    };
                });
            }
        }, {
            name: 'infrared',
            mapValues: function(data) {
                seriesDataDefinition[1].values = data.map(function(d) {
                    return {
                        date: new Date(d.datetime),
                        value: +d.infrared
                    };
                });
            }
        }, {
            name: 'broadband',
            mapValues: function(data) {
                seriesDataDefinition[2].values = data.map(function(d) {
                    return {
                        date: new Date(d.datetime),
                        value: +d.broadband
                    };
                });
            }
        }];

        return MultiSeriesLineChartView.extend({

            el: '#tsl2561-line-chart',

            url: 'api/v0/tsl2561',

            path: 'daterange',

            params: '2013-11-23',

            width: 1000,

            height: 250,

            yLabel: 'Tsl2561',

            series: seriesDataDefinition

        });
    }
);
/**
 * Created by mark on 11/23/13.
 */
define([
    'jquery',
    'backbone',
    'underscore',
    './LineChartView',
    '../models/sensorModelMixin'
],
    function($, Backbone, _, LineChartView, sensorModelMixin){
        'use strict';

        return LineChartView.extend({

            el: '#cd5-line-chart',

            url: 'api/v0/cd5',

            path: 'daterange',

            params: '2013-11-21',

            width: 1000,

            height: 250,

            yLabel: 'Cd5',

            getDataPoint: function(d) {
                return d.reading;
            }

        });
    }
);
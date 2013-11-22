/**
 * Created by mark on 11/20/13.
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

            el: '#dht-hourly',

            url: 'api/v0/dht',

            path: 'daterange',

            params: '2013-11-19',

            width: 1000,

            height: 250,

            yLabel: 'Degrees Fahrenheit (DHT)',

            getDataPoint: function(d) {
                return sensorModelMixin.degreesFahrenheit(d.degreesCelcius);
            }
        });
    }
);
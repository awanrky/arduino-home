/**
 * Created by mark on 11/20/13.
 */
define([
    'jquery',
    'backbone',
    'text!templates/rawData/tmp36.html',
    'd3',
    '../models/sensorModelMixin'
],
    function($, Backbone, template, d3, sensorModelMixin){
        'use strict';

        return Backbone.View.extend({
            tagName: 'div',

            initialize: function () {
                var that = this;

                this.margin = {top: 20, right: 20, bottom: 30, left: 50};
                this.width = 960 - this.margin.left - this.margin.right;
                this.height = 500 - this.margin.top - this.margin.bottom;

//                this.parseDate = d3.time.format('%d-%b-%y').parse;

                this.x = d3.time.scale()
                    .range([0, this.width]);

                this.y = d3.scale.linear()
                    .range([this.height, 0]);

                this.xAxis = d3.svg.axis()
                    .scale(this.x)
                    .orient('bottom');

                this.yAxis = d3.svg.axis()
                    .scale(this.y)
                    .orient('left');

                this.line = d3.svg.line()
                    .x(function(d) { return that.x(d.date); })
                    .y(function(d) { return that.y(d.close); });


            },

            events: {

            },

            render: function () {
                var that = this;

                this.svg = d3.select('#dht-hourly').append('svg')
                    .attr('width', this.width + this.margin.left + this.margin.right)
                    .attr('height', this.height + this.margin.top + this.margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' +
                        this.margin.left + ',' + this.margin.top + ')');

                d3.json('api/v0/dht/hourly/1000', function(error, data) {

                    data.forEach(function(d) {
//                        d.date = that.parseDate(d.date);
//                        d.close = +d.close;
                        d.date = new Date(d._id);
                        d.close = +sensorModelMixin.degreesFahrenheit(d.value.min.degreesCelcius);
                    });

                    data.sort(function(a, b) {
                        if (a.date < b.date) { return -1; }
                        if (a.date > b.date) { return 1; }
                        return 0;
                    });

                    that.x.domain(d3.extent(data, function(d) { return d.date; }));
                    that.y.domain(d3.extent(data, function(d) { return d.close; }));

                    that.svg.append('g')
                        .attr('class', 'x axis')
                        .attr('transform', 'translate(0,' + that.height + ')')
                        .call(that.xAxis);

                    that.svg.append('g')
                        .attr('class', 'y axis')
                        .call(that.yAxis)
                        .append('text')
                        .attr('transform', 'rotate(-90)')
                        .attr('y', 6)
                        .attr('dy', '.71em')
                        .style('text-anchor', 'end')
                        .text('Degrees Fahrenheit (DHT)');

                    that.svg.append('path')
                        .datum(data)
                        .attr('class', 'line')
                        .attr('d', that.line);
                });

//                this.template = _.template(template, this.model);
//
//                this.$el.html(this.template);

                return this;
            }

        });
    }
);
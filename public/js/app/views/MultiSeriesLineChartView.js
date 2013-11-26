/**
 * Created by mark on 11/23/13.
 */
define([
    'jquery',
    'backbone',
    'underscore',
    'd3'
],
    function($, Backbone, _, d3){
        'use strict';

        return Backbone.View.extend({

            el: 'body',

            url: '',

            path: 'last',

            params: 'all',

            margin: {top: 20, right: 20, bottom: 20, left: 50},

            width: 500,

            height: 250,

            series: [],

            getDataPoint: function(d) {
                return d.value;
            },

            yLabel: 'y-value',

            route: function() {
                return [
                    this.url,
                    this.path,
                    this.params
                ].join('/');
            },

            initialize: function () {
                this.color = d3.scale.category10();

                // skip the first color, I can't see the red/green difference
                this.color.domain(['','degreesCelcius', 'humidity']);
            },

            fetch: function () {
                var that = this;

                d3.json(this.route(), function(error, data) {

                    if (!!error) { throw error; }

                    data.forEach(function(d) {
                        d.date = new Date(d.datetime);
                    });

                    _.each(that.series, function(s) {
                        s.mapValues(data);
                    });

                    that.data = data;

                    that.render();
                });
            },

            events: {

            },

            render: function () {
                var that = this;

                var width = this.width - this.margin.left - this.margin.right;
                var height = this.height - this.margin.top - this.margin.bottom;

                var x = d3.time.scale()
                    .range([0, width]);

                var y = d3.scale.linear()
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom');

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left');

                var line = d3.svg.line()
                    .interpolate('basis')
                    .x(function(d) { return x(d.date); })
                    .y(function(d) { return y(d.value); });

                var svg = d3.select(this.el).append('svg')
                    .attr('width', this.width)
                    .attr('height', this.height)
                    .append('g')
                    .attr('transform', 'translate(' +
                        this.margin.left + ',' + this.margin.top + ')');

                x.domain(d3.extent(this.data, function(d) { return d.date; }));
                y.domain([
                    d3.min(this.series, function(c) {
                        return d3.min(c.values, function(v) {
                            return v.value;
                        });
                    }),
                    d3.max(this.series, function(c) {
                        return d3.max(c.values, function(v) {
                            return v.value;
                        });
                    })
                ]);

                svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis);

                svg.append('g')
                    .attr('class', 'y axis')
                    .call(yAxis)
                    .append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 6)
                    .attr('dy', '.71em')
                    .style('text-anchor', 'end')
                    .text(this.yLabel);

                var value = svg.selectAll('.value')
                    .data(this.series)
                    .enter().append('g')
                    .attr('values', 'value');

                value.append('path')
                    .attr('class', 'line')
                    .attr('d', function(d) { return line(d.values); })
                    .style('stroke', function(d) { return that.color(d.name); });

                value.append('text')
                    .datum(function(d) {
                        return {name: d.name, value: d.values[d.values.length - 1]};
                    })
                    .attr('transform', function(d) {
                        return 'translate(' + x(d.value.date) + ',' + y(d.value.value) + ')';
                    })
                    .attr('x', 3)
                    .attr('dy', '.30em')
                    .text(function(d) { return d.name; });

                return this;
            }

        });
    }
);
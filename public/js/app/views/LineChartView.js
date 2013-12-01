/**
 * Created by mark on 11/21/13.
 */
define([
    'jquery',
    'backbone',
    'underscore',
    'd3',
    'moment',
    'events/Notifier',
    'text!templates/linechart.html'
],
    function($,
             Backbone,
             _,
             d3,
             moment,
             notifier,
             template){
        'use strict';

        function formatParams(start, end) {
            if (!start) { start = moment().startOf('day'); }
            if (!end) { return start.format(); }
            return start.format() + '/' + end.format();
        }

        return Backbone.View.extend({

            el: 'body',

            url: '',

            path: 'last',

            params: 'all',

            margin: {top: 20, right: 20, bottom: 20, left: 50},

            width: 500,

            height: 250,

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

            },

            setDateRange: function(start, end) {
                this.start = start;
                this.end = end;
                this.params = formatParams(start, end);
                this.fetch();
            },

            refresh: function() {
                if (!this.start) { return; }
                if (!!this.end && (this.end < moment())) { return; }
                this.fetch();
            },

            fetch: function () {
                var that = this;

                d3.json(this.route(), function(error, data) {
                    if (!!error) { throw error; }

                    data.forEach(function(d) {
                        d.date = new Date(d.datetime);
                        d.value = +that.getDataPoint(d);
                    });

                    that.data = data;

                    that.render();
                });
            },

            events: {

            },

            render: function () {
                var that = this;

                this.template = _.template(template, {});
                this.$el.html(this.template);

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
                    .x(function(d) { return x(d.date); })
                    .y(function(d) { return y(d.value); });

                var svg = d3.select('#' + that.el.id + ' div').append('svg')
                    .attr('width', this.width)
                    .attr('height', this.height)
                    .append('g')
                    .attr('transform', 'translate(' +
                        this.margin.left + ',' + this.margin.top + ')');

                x.domain(d3.extent(this.data, function(d) { return d.date; }));
                y.domain(d3.extent(this.data, function(d) { return d.value; }));

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

                svg.append('path')
                    .datum(this.data)
                    .attr('class', 'line')
                    .attr('d', line);

                return this;
            }

        });
    }
);
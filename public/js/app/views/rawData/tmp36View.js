define([
    'jquery',
    'backbone',
    'text!templates/rawData/tmp36.html'
],
    function($, Backbone, template){
        'use strict';

        return Backbone.View.extend({
            tagName: 'tr',

            initialize: function () {

            },

            events: {

            },

            render: function () {

                this.template = _.template(template, this.model);

                this.$el.html(this.template);

                return this;
            }

        });
    }
);

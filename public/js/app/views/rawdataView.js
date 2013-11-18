define(['jquery',
    'backbone',
    'underscore',
    'models/rawdataModel',
    'text!templates/rawdata.html', './sensorDataCountView',
    './rawData/tmp36View',
    '../collections/rawData/tmp36Collection'
],
    function (
        $,
        Backbone,
        _,
        Model,
        template,
        SensorDataCountView,
        Tmp36RawDataView,
        Tmp36RawDataCollection) {
        'use strict';

        // Returns the View class
        return Backbone.View.extend({

            // The DOM Element associated with this view
            el: '.magic',

            // View constructor
            initialize: function () {
                var that = this;

                this.tmp36RawDataCollection = new Tmp36RawDataCollection();

                this.tmp36RawDataCollection.on('add', function() {
                    that.renderTmp36();
                });
                this.tmp36RawDataCollection.fetch();

                // Calls the view's render method
                this.render();

            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function () {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                this.sensorDataCountView = new SensorDataCountView();
                this.$('.schema-count').append(this.sensorDataCountView.el);

                // Maintains chainability
                return this;

            },

            renderTmp36: function () {
                this.tmp36RawDataCollection.each(function(item) {
                    var tmp36RawDataView = new Tmp36RawDataView({
                        model: item
                    });
                    tmp36RawDataView.render();
                    $('#raw-data-tmp36').append(tmp36RawDataView.el);
                });
            }

        });

    }

);
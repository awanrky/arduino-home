define(['jquery',
    'backbone',
    'underscore',
    'models/rawdataModel',
    'text!templates/rawdata.html', './sensorDataCountView',
    './rawData/tmp36View',
    '../collections/rawData/tmp36Collection',
    './rawData/dhtView',
    '../collections/rawData/dhtCollection'
], function (
        $,
        Backbone,
        _,
        Model,
        template,
        SensorDataCountView,
        Tmp36RawDataView,
        Tmp36RawDataCollection,
        DhtRawDataView,
        DhtRawDataCollection
        ) {
        'use strict';

        return Backbone.View.extend({

            el: '.magic',

            initialize: function () {
                this.render();
            },

            events: {

            },

            render: function () {

                this.template = _.template(template, {});

                this.$el.html(this.template);

                this.sensorDataCountView = new SensorDataCountView();
                this.$('.schema-count').append(this.sensorDataCountView.el);

                this.initializeRawDataCollection({
                    collection: new Tmp36RawDataCollection(),
                    View: Tmp36RawDataView,
                    $element: $('#raw-data-tmp36')
                });

                this.initializeRawDataCollection({
                    collection: new DhtRawDataCollection(),
                    View: DhtRawDataView,
                    $element: $('#raw-data-dht')
                });

                return this;

            },

            initializeRawDataCollection: function (rawData) {
                var that = this;

                rawData.collection.on('sync', function() {
                    that.renderRawDataView(rawData);
                });
                rawData.collection.fetch();
            },

            renderRawDataView: function (rawData) {
                rawData.collection.each(function(item) {
                    var view = new rawData.View({
                        model: item
                    });
                    view.render();
                    rawData.$element.append(view.el);
                });
            }

        });

    }

);
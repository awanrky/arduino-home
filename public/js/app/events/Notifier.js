define([
    'jquery',
    'backbone',
    'underscore'
],

    function (
        $,
        Backbone,
        _
        ) {
        'use strict';

        var Notifier = _.extend({

        }, Backbone.Events);

        Notifier.onSecondInterval = setInterval(function() {
            Notifier.trigger('onSecond');
        }, 1000);

        return Notifier;
    }
);

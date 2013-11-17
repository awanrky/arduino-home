define(['jquery', 'backbone'],

    function ($, Backbone) {
        'use strict';

        var Notifier = _.extend({}, Backbone.Events);

        return Notifier;

    }
);

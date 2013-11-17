// Router.js

define(['jquery',
    'backbone',
    'models/IndexModel',
    'views/IndexView',
    'views/dashboardView',
    'views/rawdataView',
    'collections/IndexCollection'
],

    function ($, Backbone, Model, View, DashboardView, RawDataView, Collection) {
        'use strict';

        // Returns the DesktopRouter class
        return Backbone.Router.extend({

            initialize: function () {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                '': 'getDashboard',
                'dashboard': 'getDashboard',
                'rawdata': 'getRawData'

            },

            index: function () {

                // Instantiates a new view which will render the header text to the page
                new View();

            },

            getDashboard: function () {
                new DashboardView();
            },

            getRawData: function () {
                new RawDataView();
            }

        });

    }

);
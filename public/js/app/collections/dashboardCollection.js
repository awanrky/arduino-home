// IndexCollection.js

define(['jquery', 'backbone', 'models/dashboardModel'],
    function ($, Backbone, Model) {
        'use strict';

        // Creates a new Backbone Collection class object
        // Returns the Model class
        return Backbone.Collection.extend({

            // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
            model: Model

        });

    }

);
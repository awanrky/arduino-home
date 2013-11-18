// IndexCollection.js

define([
    'jquery',
    'backbone',
    'models/rawData/tmp36Model'
],
	function($, Backbone, Model) {
        'use strict';

		// Creates a new Backbone Collection class object
		var tmp36Collection = Backbone.Collection.extend({
            url: '/api/v0/tmp36/last/10',
			// Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
			model: Model

		});

		// Returns the Model class
		return tmp36Collection;

	}

);
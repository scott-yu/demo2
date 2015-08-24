require.config({
    waitSeconds: 7,
    paths: {
        'jquery': 'libs/jquery/dist/jquery',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'marionette': 'libs/marionette/lib/backbone.marionette',
        'hbs': 'plugins/require.handlebars',
        'text': 'libs/text/text',
        'handlebars': 'libs/handlebars.runtime/index'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone'],
            exports: 'Backbone.Marionette'
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    },
    hbs: {
        extension: '.hbs'
    }
});

define([
    'app'
], function(
    App) {
    'use strict';

    App.start();
});

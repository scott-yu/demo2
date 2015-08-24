require.config({
    waitSeconds: 7,
    paths: {
        'jquery': 'libs/jquery/dist/jquery',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'marionette': 'libs/marionette/lib/backbone.marionette',
        'hbs': 'libs/requirejs-handlebars/hb',
        'text': 'libs/text/text',
        'handlebars': 'libs/handlebars/handlebars.runtime.amd.min'
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
        }
    },
    hbs: {
        extension: '.hbs'
    }
});

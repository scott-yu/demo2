requirejs.config({
    paths: {
        'jquery-iecors': '../tests/unit/stub/jquery.iecors',
        'prefetch': '../tests/unit/stub/require.prefetch'
    },
    shim: {
        // backbone shim without the ieCors.install()
        'backbone': {
            deps: ['jquery', 'underscore', 'jquery-iecors','ie.console'],
            exports: 'Backbone'
        }
    }
});
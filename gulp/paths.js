var appRoot              = 'app/';
var devRoot              = 'devtemp/';
var distRoot             = 'build/';
var testRoot             = 'tests/';
var unitTestRoot         = testRoot + 'unit/';
var nodeModuleRoot       = 'node_modules/';

module.exports = {
    root                 : appRoot,
    testRoot             : testRoot,
    unitTestRoot         : unitTestRoot,
    devRoot              : devRoot,
    output               : distRoot,
    nodeModuleRoot       : nodeModuleRoot,


    js: [
        appRoot + '**/*.js',
        '!' + appRoot + '**/*.es6.js'
    ],
    css: devRoot + 'app.css',
    html: [
        appRoot + 'index.html'
    ],

    es6: [
        appRoot + '**/*.es6.js'
    ],
    sass: [
        appRoot + 'resources/sass/**/*.scss'
    ],
    templates: [
        appRoot + '**/*.hbs',
    ],

    specs: [
        testRoot + 'specs/**/*.js'
    ]
};

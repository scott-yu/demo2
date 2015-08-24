var appRoot              = 'app/';
var devRoot              = 'devtemp/';
var distRoot             = 'build/';
var nodeModuleRoot       = 'node_modules/';

module.exports = {
    root                 : appRoot,
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
};

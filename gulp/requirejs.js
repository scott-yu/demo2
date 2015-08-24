var gulp = require('gulp');
var requirejs = require('requirejs');
var paths = require('./paths');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs-extra');
var _ = require('lodash');
var cssReworkUrls = require('gulp-css-rework-url');
var requireConfig = {};

try {
    requireConfig = require('../../../app/requireConfig.json');
} catch(e) {}

gulp.task('requirejs', ['build'], function (callback) {

    var config = {
        baseUrl: paths.devRoot,
        mainConfigFile: paths.devRoot + 'libs/hubcommon/main.js',
        fileExclusionRegExp: /.(hbs|scss)$/,
        dir: paths.output,
        preserveLicenseComments: false,
        modules: [
            {
                override: {
                    paths: {
                        templates: '../' + paths.devRoot + 'templates'
                    }
                },
                name: 'app',
                exclude: [
                    'hub/constants/endpoints',
                    'hub/constants/environment',
                    'libs/jquery/jquery'
                ]
            }
        ],
        paths: _.extend({
            // CDN resources must use empty schema
            'jquery.hubNavBar': 'empty:',
            'jquery-iecors': 'empty:'
        }, requireConfig.paths || {}),
        shim: requireConfig.shim || {},
        useStrict: true,
        removeCombined: true,
        findNestedDependencies: true,
        optimize: 'none',
        generateSourceMaps: true,
        optimizeCss: 'none'
    };

    requirejs.optimize(config, function () {
        fs.removeSync('build/libs/');
        callback();
    });
});

gulp.task('createBuildInfo', function() {
    var output = {
        'name': 'Build Info',
        'date': new Date().toString(),
        'devDependencies': require('../../../bower.json').dependencies
    }

    // FIX: ouputs to package.json to work with current version of buildscript gem
    fs.outputFile(paths.output + '/package.json', JSON.stringify(output), function(err) {
        if (err) throw err;
    });
});

gulp.task('processAssetsInCss', function() {
    gulp.src(paths.devRoot + 'app.css')
        .pipe(cssReworkUrls({}, function(files) {
            files = _.chain(files)
                .filter(function(file) { return /^(devtemp\/libs)/i.test(file); })
                .map(function(file) { return file.split('?')[0];})
                .map(function(file) { return file.split('#')[0];})
                .uniq()
                .value();

            if (files.length > 0) {
                gulp.src(files, {base: paths.devRoot})
                    .pipe(gulp.dest(paths.output));
            }
        }));
})

//FIX: disabled processAssetsInCss task, TC seems to have problem with it
gulp.task('processFilesForBuild', function() {
    gulp.src([
        paths.devRoot + 'app.css',
        paths.devRoot + 'index.html',
        paths.devRoot + 'main.js',
        paths.devRoot + 'applications.json',
    ]).pipe(gulp.dest(paths.output));

    gulp.src([paths.devRoot + 'resources/**/*', '!' + paths.devRoot + 'resources/{sass,sass/**}'])
        .pipe(gulp.dest(paths.output + 'resources/'));


    gulp.src(getFilesToCopyOver().map(function(path) {
        return paths.devRoot + 'libs/' + path;
    }), {base: paths.devRoot + 'libs/'}).pipe(gulp.dest(paths.output + 'libs'));

    return gulp.src(paths.output + 'app.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.output));
});

var getFilesToCopyOver = function() {
    return [
        /*Javascript*/
        'jquery/jquery.js',
        'requirejs/require.js',
        'xrayquire/xrayquire.js',
        'underscore/underscore.js',
        'purl/purl.js',
        'js-xlsx/dist/jszip.js',
        'js-xlsx/dist/xlsx.js',

        'mediaelement/build/bigplay.svg',
        'mediaelement/build/controls.svg',
        'select2/select2.png',
        'select2/select2x2.png',
        'select2/select2-spinner.gif',

        /*FONTS*/
        'font-awesome/fonts/**/*',

        /*Requirejs plugins*/
        'requirejs-plugins/src/**/*',
        'text/text.js',

        /*Hubcommon*/
        'hubcommon/main.js',
        'hubcommon/oauth-main.js',
        'hubcommon/oauth.html',
        'hubcommon/src/const.js',
        'hubcommon/src/resources/**/*',
        'hubcommon/src/config/**/*',
        'hubcommon/src/constants/**/*',
        'hubcommon/src/plugins/ieconsole.js',
        'hubcommon/src/plugins/jquery.iq.authome.js',
        'hubcommon/src/plugins/require.oauth.js',
        'hubcommon/src/vendor/jquery.iecors.js',
        'hubcommon/src/vendor/jquery.iq.hubNavigationBar.js',
        'hubcommon/src/utils/hubAppLoader.js',
        'hubcommon/src/classes/tokenManager.js',

        /*Hub.Common.Styling*/
        'hub.common.styling/fonts/**/*',
        'hub.common.styling/sass/themes/default/images/**/*'
    ];
}

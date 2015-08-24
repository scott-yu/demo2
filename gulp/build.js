var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var paths = require('./paths');
var rename = require('gulp-rename');
var streamqueue = require('streamqueue');

require('./eslint');
require('./sass');
require('./handlebars');

// require('./requirejs.js');

// gulp.task('buildRequireJs', function(callback) {
//     return runSequence(
//         'requirejs',
//         'processFilesForBuild',
//         'createBuildInfo',
//         'additionalDeploySteps',
//         callback
//         );
// });

gulp.task('build-assets', function () {
    return gulp.src([paths.root + 'resources/**/*', '!' + paths.root + 'resources/{sass,sass/**}'])
        .pipe(plumber())
        .pipe(changed(paths.devRoot))
        .pipe(gulp.dest(paths.devRoot + 'resources/'));
});


gulp.task('build-es6', function() {
    return gulp.src(paths.es6, {base: paths.root})
        .pipe(plumber())
        .pipe(changed(paths.devRoot, {extension: '.es6.js'}))
        .pipe(babel({
            modules: '',
            moduleIds: false,
            comments: false,
            compact: false,
            stage: 2,
            optional: ['es7.classProperties'],
            modules:'amd'
        }))
        .pipe(rename(function(path) {
            path.basename = path.basename.replace('.es6', '');
        }))
        .pipe(gulp.dest(paths.devRoot));
});

gulp.task('build-js', function () {
    return gulp.src(paths.js, {base: paths.root})
        .pipe(plumber())
        .pipe(changed(paths.devRoot))
        .pipe(gulp.dest(paths.devRoot));
});

gulp.task('build-html', function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.devRoot));
});

gulp.task('build', function(callback) {
    runSequence(
        'build-js',
        'build-es6',
        'handlebars',
        'sass',
        'build-html',
        'build-assets',
        'eslint',
        callback);
});

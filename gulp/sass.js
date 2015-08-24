var gulp = require('gulp');
var sass = require('gulp-sass');
var paths = require('./paths');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var concatCss = require('gulp-concat-css');

gulp.task('sass', function () {
    gulp.src(paths.sass)
        .pipe(plumber())
        .pipe(sass({
            sourceComments: 'map',
            sourceMap: 'sass',
            style: 'compact'
        }))
        .pipe(concatCss('app.css'))
        .pipe(gulp.dest(paths.devRoot));
});

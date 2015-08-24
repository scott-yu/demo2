var gulp = require('gulp');
var paths = require('./paths.js');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');

gulp.task('eslint', function () {

    return gulp.src(paths.es6)
        .pipe(plumber())
        .pipe(eslint({
            config: 'gulp/config/eslint.config.js'
        }))
        .pipe(eslint.format());
});


var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var wrapAmd = require('gulp-wrap-amd');
var path = require('./paths');
var streamqueue = require('streamqueue');
var plumber = require('gulp-plumber');
var paths = require('./paths.js');
var bom = require('gulp-bom');

gulp.task('handlebars', function () {
    return gulp.src(path.templates)
        .pipe(bom())
        .pipe(handlebars({wrap: true}))
        .pipe(declare({
            namespace: 't',
            noRedeclare: true,
            processName: function (filePath) {
                return filePath.replace(/\\/g, '/')
                    .toLocaleLowerCase()
                    .replace(paths.devRoot, '')
                    .replace(paths.root, '')
                    .replace('.js', '');
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(wrapAmd({
            deps: ['handlebars'],
            params: ['Handlebars'],
            exports: 'this["t"]'
        }))
        .pipe(plumber())
        .pipe(gulp.dest(paths.devRoot))
        .pipe(gulp.dest(paths.testRoot));
});

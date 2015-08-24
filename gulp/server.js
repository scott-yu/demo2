var gulp = require('gulp');
var browserSync = require('browser-sync');
var paths = require('./paths');

gulp.task('serve', function(done) {
    browserSync({
        open: true,
        port: 9000,
        server: {
            baseDir: [paths.devRoot]
        }
    }, done);
});

gulp.task('serve:build', function(done) {
    browserSync({
        open: true,
        port: 8000,
        server: {
            baseDir: [paths.output]
        }
    }, done);
});

gulp.task('serve:test', function(done) {
    browserSync({
        open: false,
        port: 2222,
        server: {
            baseDir: [paths.devRoot]
        }
    }, done);
});

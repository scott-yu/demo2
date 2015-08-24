var gulp = require('gulp');
var karma = require('gulp-karma');
var runSequence = require('run-sequence');

var runKarma = function(configPath) {
    return gulp.src('nonexist.js')
        .pipe(karma({
            configFile: configPath,
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
}

module.exports = function(configPath, buildTask) {
    configPath = configPath || '';
    gulp.task('karma', function() {
        return runKarma(configPath || 'node_modules/hub.common.tooling/unit/karma.conf.js');
    });

    gulp.task('unit', function(cb) {
        return runSequence(
            buildTask || 'build',
            'karma',
            cb
        );
    });
}

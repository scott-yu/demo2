require('./watch.js')();
require('./watchLibs.js');
require('./build.js');
require('./eslint.js')();
require('./handlebars.js');
require('./sass.js');
require('./server.js');
require('./sync.js');
require('./stripBom.js')();
require('./karma.js')();
require('./gitRename.js')();
require('./e2e.js');
require('./clean.js');
require('./dummyTasks.js');
require('./riot.js');

var args = require('minimist')(process.argv.slice(2));

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function(callback) {
    if (!args.sync) {
        return runSequence(
            'watch',
            'serve',
            callback
        );
    } else {
        return runSequence(
            'watch:libs',
            'watch',
            'serve',
            callback
        );
    }

});

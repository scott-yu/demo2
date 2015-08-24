require('./gulp/watch.js');
require('./gulp/server.js');

var gulp = require('gulp');

gulp.task('default', [
    'watch',
    'serve'
]);

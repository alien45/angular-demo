/**
 * Created by tchowdhury on 12/12/2016.
 */
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var karma = require('gulp-karma');
var browserSync = require('browser-sync');

var watchFiles = {
    jsFiles: [
        './app/*.js',
        './app/components/**/*.js',
        './app/pages/**/*.js'
    ],
    otherFiles : [
        './app/*.html',
        './app/*.css',
        './app/pages/**/*.html',
        './app/partial/*.html'
    ]

};



gulp.task('test', function() {
    // Be sure to return the stream
    // NOTE: Using the fake './foobar' so as to run the files
    // listed in karma.conf.js INSTEAD of what was passed to
    // gulp.src !
    return gulp.src('./foobar')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            console.log('Karma test error: ',err);
            this.emit('end'); //instead of erroring the stream, end it
        });
});

gulp.task('autotest', function() {
    return gulp.watch(watchFiles.jsFiles, ['test']);
});

/*
 * Locally run web application
 */
gulp.task('run-local', ['test'], function () {

    browserSync.init('./app', {
        server: {
            baseDir: './app'
        }
    });

    gulp.watch([watchFiles.jsFiles, watchFiles.otherFiles]).on('change', function () {
        //use this to automatically run tests and build and refresh server
        gulp.start('test');
        //gulp.start('build');
        //gulp.start('deploy-local');
    });
});


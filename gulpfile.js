/**
 * Created by tchowdhury on 12/12/2016.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');

/*
 * Locally run web application
 */
gulp.task('run-local', function () {

    browserSync.init('./app', {
        server: {
            baseDir: './app'
        }
    });
});
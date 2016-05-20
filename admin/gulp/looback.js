'use strict';

var gulp = require('gulp');
var loopbackAngular = require('gulp-loopback-sdk-angular');
var rename = require('gulp-rename');
var paths = gulp.paths;

// loopback services
gulp.task('lb-angular', function() {
  gulp.src('../server/server.js')
    .pipe(loopbackAngular())
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest('bower_components/loopback'))
    .pipe(gulp.dest('../view1/www/lib/loopback'))
    .pipe(gulp.dest('../view2/www/lib/loopback'));
  });

gulp.task('loopback', ['lb-angular']);
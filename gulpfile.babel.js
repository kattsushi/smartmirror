/**
  * En este archivo Gulpfile.js se encuentran todas las tareas de desarrollo
  * automatizadas para el desarrollo de la aplicacion dichas tareas ayudan a
  * el desarrollador implemtar tecnologias de manera automatica al fuente y
  * caracteristicas del frameworks que se va a utlizar para el lado del ser-
  * vidor y/o el lado del cliente.
  *=============================================================================
  * Desarrollador [Andres David Jimenez] [20-07-2016]
  * (Primer commit)
  *=============================================================================
*/

import eslint           from 'gulp-eslint';
import gulp             from 'gulp';
import livereload       from 'gulp-livereload';
import nodemon          from 'gulp-nodemon';
import notify           from 'gulp-notify';
import loopbackAngular  from 'gulp-loopback-sdk-angular';
import rename           from 'gulp-rename';

// Linter task
gulp.task('eslint', () => {
  return gulp.src([
    './**/*.js',
    '!node_module/**/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('livereload', () => {
  livereload({ start: true });
});


gulp.task('loopback',()=> {
    gulp.src('server/server.js')
      .pipe(loopbackAngular())
      .pipe(rename('lb-services.js'))
      .pipe(gulp.dest('./sdk/angular'));
});

gulp.task('start-dev', () => {
  livereload.listen();

  // gulp.watch('src/stylus/*.styl', ['stylus']);
  nodemon({
    script: 'server/boostrap.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  }).on('restart', () => {
    gulp.src('server/boostrap.js')
      .pipe(livereload())
      .pipe(notify('Reloading server, please wait...'));
  });
});

// Start production
gulp.task('start', () => {
  nodemon({
    script: 'server/boostrap.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'production'
    }
  });
});

gulp.task('default', ['livereload', 'start-dev']);

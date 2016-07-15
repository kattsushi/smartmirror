/*global $config */
'use strict';
/**
  * En este archivo Gulpfile.js se encuentran todas las tareas de desarrollo
  * automatizadas para el desarrollo de la aplicacion dichas tareas ayudan a
  * el desarrollador implemtar tecnologias de manera automatica al fuente y
  * caracteristicas del frameworks que se va a utlizar para el lado del ser-
  * vidor y/o el lado del cliente.
  *=============================================================================
  * Desarrollador [Andres David Jimenez] [07-04-2016]
  * (Primer commit)
  *=============================================================================
/**
  * Requerir Depdencias Globales de Gulp
  * @fs : manejar I/O de archivos
  * @path : manejar opciones de rutas de archivos
  * @gulp : dependencia global de gulp
  * @mainBowerFiles : manejar los modulos y librerias de bower
  * @watch : modulo para observar asincronamente archivos y realizar acciones
  * @jshint : verifica sintanxis de codigo javascript ecma script 2015
  * @mocha : modulo para realizar pruebas unitarias
  * @sourcemaps : modulo para mapear archivos ofuzcados y minificados
  * @debug : modulo para realizar debugs
  * @concat : modulo para concatenar archivos
  * @$confing : Archivo de configuracion de la aplicacion
  */
var//         fs = require('fs'),
          gulp = require('gulp'),
   //      path = require('path'),
mainBowerFiles = require('main-bower-files'),
   //     watch = require('gulp-watch'),
    //    jshint = require('gulp-jshint'),
    //     mocha = require('gulp-spawn-mocha'),
    //sourcemaps = require('gulp-sourcemaps'),
    //     debug = require('gulp-debug'),
        concat = require('gulp-concat');
//----------
//global.$config = require('./config-app');
    //var config = global.$config;
//----------

/**
  * Constantes
  * Rutas:
  * @SRC : rutas de archivos del cliente
  * @DEST: rutas de archivo de build
  * @TMP : rutas de archivos temporales
  * @sassFiles : ruta de los archivos de estilos SASS
*/
/*
//var  SRCMOBILE = config().paths.src.mobile;
//var  SRCADMIN  = config().paths.src.admin;
//var  SRCSCANNER= config().paths.src.scanner;

var DEST = config().paths.dest;
var  TMP = config().paths.tmp;
var sassFiles = SRCADMIN + config().paths.sass;
*/

/**
  * Tarea de Gulp clean : limpia o elimina archivos indicados.
*/
/*
var clean = require('gulp-clean');
gulp.task('clean', function() {
    return gulp
            .src([DEST, TMP], {read: false})
            .pipe(clean());
});

/**
  * Tarea de build: conjunto de tareas para el build
*/
/*
gulp.task('build', [
    'lb-angular'
]);
*/
/**
  * Tarea de bower: modulo de bower que copia todas las liberias a /vendor
*/
/*
gulp.task('bower', function() {
    return gulp
          .src(mainBowerFiles())
          .pipe(gulp.dest(DEST + config().paths.vendor));
});
*/
/**
  * Tarea de watch: se encarga de escuchar los archivos para reiniciar servidor
*/

// var livereload = require('gulp-livereload');
// gulp.task('watch', function() {
//     livereload.listen();
//     return gulp
//            .watch([sassFiles, SRCADMIN + '/**/*.js',
//                     SRCADMIN + '/**/*.html'], ['build']);
// });

/**
  * Tarea de serve : conjunto de tareas que levanta servicio.
*/
// gulp.task('serve', ['build',
//                     'watch'], function(cb) {
//                                   var express = require('express');
//                                   var app = express();
//                                   app.use(require(config().paths.server));
//                                   app.use(express.static(DEST));
//                                   app.listen(config().serverPort, cb);
//                               });

/**
  * Tarea de lb-angular : se encarga de levantar los servicios SDK de Angular
*/
var loopbackAngular = require('gulp-loopback-sdk-angular');
var          rename = require('gulp-rename');

gulp.task('loopback', function() {
    gulp.src('server/server.js')
      .pipe(loopbackAngular())
      .pipe(rename('lb-services.js'))
      .pipe(gulp.dest('./sdk/angular'));
});

/**
  * Tarea de default : Tarea por defecto
*/
gulp.task('default', ['loopback'], function() {
});

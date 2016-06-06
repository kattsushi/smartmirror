/*global angular */
(function() {
'use strict';
//---
//--Controlador principal de la app
//------------------------------------------------------------------------------
  function MainCtrl($http, Enlace, Fuentes, MenuDiario, $interval ) {
    //-Variables globales-------------------------------------------------------
    var vm = this;

    var ajax = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=';
    var now = new Date();
    //--------------------------------------------------------------------------

    //----Calcular el tiempo para cada vista
    // vm.isTimeOf = function () {
    //     if ( now.getHours() >= 7 && now.getHours() <= 9 ){
    //       return {title:'Breakfast\' Menu', menu:'breakfast'};
    //     }else if ( now.getHours() >= 13 && now.getHours() <= 13 ) {
    //       return {title:'Lunch\' Menu', menu:'lunch'};
    //     }else if ( now.getHours() >= 17 && now.getHours() <= 19) {
    //       return {title: 'Dinner\'s Menu', menu: 'dinner'};
    //     }else{
    //       if(now.getMinutes() >= 30 ){
    //         return {title:'News', menu: 'news'};
    //       }else{
    //         return {title:'Volante', menu: 'volante'};
    //       }
    //     }
    // };


    vm.isTimeOf = function () {
        if ( now.getHours() >= 7 && now.getHours() <= 9 ){
          return {title:'News', menu:'news'};
        }else if ( now.getHours() >= 13 && now.getHours() <= 13 ) {
          return {title:'News', menu:'news'};
        }else if ( now.getHours() >= 17 && now.getHours() <= 19) {
          return {title: 'News', menu: 'news'};
        }else{
          if(now.getMinutes() >= 30 ){
            return {title:'News', menu: 'news'};
          }else{
            return {title:'News', menu: 'news'};
          }
        }
    };

    console.log(vm.isTimeOf());

    vm.loadFonts = function(){
      vm.Feed = function(url){
        return $http
               .jsonp( ajax + encodeURIComponent(url));
      };

      // vm.feeds = [{title:'lalala', contentSnippet: 'ashdbaushdik'},
      //             {title:'lalala', contentSnippet: 'ashdbaushdik'},
      //             {title:'lalala', contentSnippet: 'ashdbaushdik'}]

      Fuentes
      .find({filter:{where:{status: true}}})
      .$promise
      .then(function (font) {
        vm.feedSrc = font[0].url;
        vm.name = font[0].name;
        vm.Feed(vm.feedSrc)
        .then(function(res){
          vm.feeds = res.data.responseData.feed.entries;
          console.log(vm.feeds);
        });
      });
     //-------------------------------------------------------------------------
      //*--
     //-------------------------------------------------------------------------
      Enlace
      .find({})
      .$promise
      .then(function(data){
         for (var i = 0; i < data.length; i++) {
            if (!data[i].screen && data[i].id_espejo === '001'){
               vm.vissible = 'hidden';
            }else{
               vm.vissible = 'visibility';
            }
         }
      });
     console.log(vm.vissible);
    };
    //--------------------------------------------------------------------------
    vm.loadMenu = function () {
       MenuDiario
       .find({filter:{where:{status:true}}})
       .$promise
       .then(function (data) {
          vm.menus = data ;
          console.log(data);
       });
    };
    //--------------------------------------------------------------------------
    vm.loadHandout = function () {
      Enlace
      .find({where:{id_espejo:'001'}})
      .$promise
      .then(function(data){
        // var srcImg = 'http://localhost:3001/assets/img/handout/';
        var srcImg = 'http://10.0.0.121:3001/assets/img/handout/';
        vm.handout = srcImg + data[0].handout.toString() + '.png';
        // console.log(vm.handout);
      });
    };
    //--------------------------------------------------------------------------
    if(vm.isTimeOf().menu === 'news'){
      $interval.cancel(vm.loadMenu);
      vm.loadFonts();
      $interval(vm.loadFonts, 10000);
    }else if (vm.isTimeOf().menu === 'volante') {
      $interval.cancel(vm.loadFonts);
      $interval(vm.loadHandout,1000);
    }else {
      $interval.cancel(vm.loadFonts);
      vm.loadMenu();
      $interval(vm.loadMenu, 1000);
    }
    //--------------------------------------------------------------------------
    vm.rango = {
      min : 0,
      max : 23
    };

    vm.rangoA = {
      from : 6,
      to : 10
    };

    vm.rangoB = {
      from : 11,
      to : 13
    };

    vm.rangoC = {
      from : 17,
      to : 21
    };


  }

  angular.module('app.controllers', [])
         .controller('mainCtrl',[
                                  '$http',
                                  'Enlace',
                                  'Fuentes',
                                  'MenuDiario',
                                  '$interval',
                                  MainCtrl
                                ]);
})();

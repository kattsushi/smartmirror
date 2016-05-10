/*global angular */
(function() {
'use strict';

function MainCtrl($http, Enlace, Fuentes) {
  var vm = this;

  vm.location = 'Hola mundo';

  vm.Feed = function(url){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
      }

  //vm.feedSrc = 'http://ep00.epimg.net/rss/elpais/portada.xml';
 
  vm.load = function(e){
   
     Fuentes
        .find({filter:{where:{status: true}}})
        .$promise
        .then(function (font) {
          //console.log(font[0].url);
          vm.feedSrc = font[0].url;
          vm.name = font[0].name;

          vm.Feed(vm.feedSrc)
          .then(function(res){
              // vm.loadBtnText = angular.element(e.target).text();
              //console.log(vm.feedSrc);
              //console.log(res);
               vm.feeds = res.data.responseData.feed.entries;
               //console.info(vm.feeds);
          });
        })

    //--------------------------------------------------------------------------
    
    //--------------------------------------------------------------------------
    Enlace
       .find({})
       .$promise
       .then(function(data){
          for (var i = 0; i < data.length; i++) {
             if (!data[i].screen && data[i].id_espejo === "001"){
                vm.vissible = 'visibility';
             }else{
                vm.vissible = 'hidden';
             }
          }
       })
   };
    vm.load();

    setInterval(vm.load, 500);

  }


angular.module('app.controllers', [])
       .controller('mainCtrl',['$http','Enlace','Fuentes', MainCtrl]);

})();

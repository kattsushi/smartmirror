/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';
  /** @ngInject */
  function viewACtrl($scope, Enlace, $http) {
    var vm = this;
      vm.urlImg = 'http://localhost:3001/assets/images/';
    vm.location = '';
      console.log('ñ');


    vm.getView = function () {
       Enlace
       .find({})
       .$promise
       .then(function(data){
          console.log(data);
          vm.sections = [];
          vm.name = data[0].name;
          vm.coment = data[0].coment;
          vm.id_espejo = 'http://localhost:3001/assets/img/' + data[0].logo.toString() + '.png';
          for (var i = 0; i < data.length; i++) {
             if (data[i].screen && data[i].id_espejo === '001'){
                vm.vissible = 'visibility';
             }else{
                vm.vissible = 'hidden';
             }
             vm.sections.push(data);
             // console.log(data);
          }
       });
    };

    // setInterval( vm.getView, 500);


       vm.initial = function(){
         navigator.geolocation.getCurrentPosition(function(position){
           var lat = position.coords.latitude;
           var lon = position.coords.longitude;

           $http.jsonp('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=a8f5261ee6863849df5a45497bb27163&callback=JSON_CALLBACK')
           .success(function(data){
             vm.weatherData = data;
             console.log(data);
             $('.loading').hide();
           }).
           error(function(){
             $('.loading').hide();
             $('.error').show().html('Sorry there has been an error connecting to the API');
           });
         });
       };

       vm.initial();

       vm.refresh = function(){
         $('.loading').show();
         if($scope.location !== ''){
           $http.jsonp('http://api.openweathermap.org/data/2.5/weather?q='+$scope.location+'&APPID=a8f5261ee6863849df5a45497bb27163&callback=JSON_CALLBACK')
           .success(function(data){
               vm.weatherData = data;
               console.log(data);
               $('.loading').hide();
            }).
             error(function(){
               $('.loading').hide();
               $('.error').show().html('Sorry there has been an error connecting to the API');
             });
         } else {
           $scope.initial();
         }
       };

       /*--------------------------------time clocl-------------------------------------------*/
      var d = 0;
      var year, month,day, hours, minutes, seconds = 0;


      var update = function() {
        d = new Date();

        hours = ( d.getHours() < 10 ? '' : '' ) + d.getHours();

        minutes = ( d.getMinutes() < 10 ? '0' : '' ) + d.getMinutes();

        seconds = ( d.getSeconds() < 10 ? '0' : '' ) + d.getSeconds();

        day   = ( d.getDate() < 10 ? '0' : '' ) + d.getDate();

        month = ( (d.getMonth() + 1) < 10 ? '0' : '' ) + (d.getMonth() + 1);

        year  = d.getFullYear();

        $scope.clock   = hours + ':' + minutes + ':' + seconds;

        $scope.date    = day + ' / ' + month + ' / ' + year;
      };

      setInterval(function() {
        $scope.$apply(update);
      });
  }

  angular.module('SmartMirror.pages.inicio')
      .controller('viewACtrl', viewACtrl);

})();

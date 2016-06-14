/*global angular */
(function () {
  'use strict';
  function MainCtrl($http, $scope, Enlace) {
    var vm = this;
    vm.location =  {
       lat : 10.65386,
       lng : -71.645966
    };
    vm.state = false;
    vm.vissible = 'hidden';
    vm.urlImg = 'http://localhost:3001/assets/images/';

    setInterval(function () {
      Enlace
        .find({})
        .$promise
        .then(function(data){
          // console.log(data);
          vm.sections = [];

          vm.name = data[0].name;
          vm.coment = data[0].coment;
          vm.location = {
            lat : data[0].location.lat,
            lng : data[0].location.lng
          };
          // console.log(vm.location);
          // vm.id_espejo = 'http://localhost:3001/assets/pictures/' + data[0].logo.toString() + '.png';
          // vm.id_espejo = 'http://10.0.0.121:3001/assets/pictures/' + data[0].logo.toString() + '.png';
          vm.id_espejo = 'http://192.168.0.10:3001/assets/pictures/' + data[0].logo.toString() + '.png';
            vm.state = data[0].screen;
            for (var i = 0; i < data.length; i++) {
             if (data[i].screen && data[i].id_espejo === '001'){
                vm.vissible = 'visibility';
             }else{
                vm.vissible = 'hidden';
             }
             vm.sections.push(data);
            //  console.log(data);
          }
        });

       console.log(vm.vissible);
       console.log(vm.state);

        vm.initial = function(){
            var api = 'http://api.openweathermap.org/data/2.5/weather?lat=';
            var callback = '&APPID=a8f5261ee6863849df5a45497bb27163&callback=JSON_CALLBACK';

           $http.jsonp( api + vm.location.lat + '&lon='+ vm.location.lng + callback)

            // $http.jsonp(api + '10.653860' + '&lon='+ '-71.645966' + callback)
              .success(function(data){
                vm.weatherData = data;
                //  console.log(data);
                $('.loading').hide();
              })
              .error(function(){
                $('.loading').hide();
                $('.error').show().html('Sorry there has been an error connecting to the API');
              });
        };
         vm.initial();
      }, 500);

      // vm.refresh = function(){
      //   $('.loading').show();
      //   if(vm.location){
      //     var api2 = 'http://api.openweathermap.org/data/2.5/weather?q=';
      //     var callback2 = '&APPID=a8f5261ee6863849df5a45497bb27163&callback=JSON_CALLBACK';
      //     $http.jsonp( api2 + vm.location + callback2)
      //       .success(function(data){
      //         vm.weatherData = data;
      //         //console.log(data);
      //         $('.loading').hide();
      //      	})
      //       .error(function(){
      //         $('.loading').hide();
      //         $('.error').show().html('Sorry there has been an error connecting to the API');
      //        });
      //    } else {
      //      $scope.initial();
      //    }
      //  };

      /*--------------------------------time clocl-------------------------------------------*/
      var d = 0;
      var year, month,day, hours, minutes, seconds = 0;
      var update = function() {
        d = new Date();
   	    hours = ( d.getHours() < 10 ? '0' : '' ) + d.getHours();
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

angular.module('app.controllers', [])
   .controller('mainCtrl',['$http','$scope','Enlace', MainCtrl]);
})();

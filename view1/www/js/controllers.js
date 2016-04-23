/*global angular */
'use strict';

function MainCtrl($http, $scope) {
	var vm = this;

	vm.location = '';
   setInterval(function () {
      $http.get('http://10.0.0.124:3000/api/enlaces', {id:1}).
      success(function(data){
         console.log(data);
         if (data[0].status){
            vm.vissible = 'visibility';
         }else{
            vm.vissible = 'hidden';
         }
      });

   }, 500);


    vm.initial = function(){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        $http.jsonp("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=a8f5261ee6863849df5a45497bb27163&callback=JSON_CALLBACK").
        success(function(data){
          vm.weatherData = data;
          console.log(data);
          $('.loading').hide();
        }).
        error(function(){
          $('.loading').hide();
          $('.error').show().html("Sorry there has been an error connecting to the API");
        });

      });
    };

    vm.initial();

    vm.refresh = function(){
      $('.loading').show();
      if($scope.location != ''){
        $http.jsonp("http://api.openweathermap.org/data/2.5/weather?q="+$scope.location+"&APPID=a8f5261ee6863849df5a45497bb27163&callback=JSON_CALLBACK").
        	success(function(data){
            vm.weatherData = data;
            console.log(data);
            $('.loading').hide();
        	}).
          error(function(){
            $('.loading').hide();
            $('.error').show().html("Sorry there has been an error connecting to the API");
          });
      } else {
        $scope.initial();
      }
    };

    /*--------------------------------time clocl-------------------------------------------*/
    var d = 0;
  	var year, month,day, hours, minutes, seconds = 0;

	  setInterval(function() {
	    $scope.$apply(update);
	  });

	  var update = function() {
	    d = new Date();

	    hours = ( d.getHours() < 10 ? "0" : "" )
	            + d.getHours();

	    minutes = ( d.getMinutes() < 10 ? "0" : "" )
	            + d.getMinutes();

	    seconds = ( d.getSeconds() < 10 ? "0" : "" )
	            + d.getSeconds();

	    day   = ( d.getDate() < 10 ? "0" : "" )
	          + d.getDate();
	    month = ( (d.getMonth() + 1) < 10 ? "0" : "" )
	          + (d.getMonth() + 1);
	    year  = d.getFullYear();

	    $scope.clock   = hours + ":" + minutes + ":" + seconds;
	    $scope.date    = day + " / " + month + " / " + year;
	  }
};


angular.module('app', [])

.controller('mainCtrl',['$http','$scope', MainCtrl]);

/*global angular, google */
(function () {
'use strict';
   function MainCtrl($http, $scope, Enlace) {
   	var vm = this;
    // var geocoder = new google.maps.Geocoder();
    // var yourLocation = new google.maps.LatLng(lat, longi);
    // geocoder.geocode({ 'latLng': yourLocation },processGeocoder);
    //
    // console.log(yourLocation);


    vm.urlImg = 'http://localhost:3001/assets/images/';
   	vm.location = '';
      console.log('ñ');

      setInterval(function () {
         Enlace
         .find({})
         .$promise
         .then(function(data){
            console.log(data);
            vm.sections = [];
            vm.name = data[0].name;
            vm.coment = data[0].coment;
            vm.id_espejo = 'http://localhost:3001/assets/pictures/' + data[0].logo.toString() + '.png';
            for (var i = 0; i < data.length; i++) {
               if (data[i].screen && data[i].id_espejo === "001"){
                  vm.vissible = 'visibility';
               }else{
                  vm.vissible = 'hidden';
               }
               vm.sections.push(data);
               // console.log(data);
            }
         })
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

angular.module('app.controllers', [])
   .controller('mainCtrl',['$http','$scope','Enlace', MainCtrl]);
})();

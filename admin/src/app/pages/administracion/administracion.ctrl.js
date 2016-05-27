/* globals  L */
(function () {
  'use strict';

  /** @ngInject */
  function administracionCtrl(Enlace, $scope, $timeout, $http) {
    //--------------------------------------------------------------------------
      var vm = this;
      vm.sections = [];


      function initialize() {
      L.Icon.Default.imagePath = 'assets/img/theme/vendor/leaflet/dist/images';
      var map = L.map(document.getElementById('leaflet-map')).setView([vm.location.lat, vm.location.lng], 13);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

     var marker = new L.marker([vm.location.lat, vm.location.lng],
            {draggable: true,        // Make the icon dragable
            title: 'Hover Text',     // Add a title
            opacity: 0.8}            // Adjust the opacity
          ).addTo(map);

      marker.on('dragend', function (e) {
        vm.location = { lat : e.target.getLatLng().lat, lng:  e.target.getLatLng().lng };
        console.log(vm.location);
        Enlace
        .updateAll({where:{id_espejo: '001'}},{location: vm.location})
        .$promise
        .then(function (data) {

        });
        console.log(e.target);
        var api = 'http://api.openweathermap.org/data/2.5/weather?lat=';
        var callback = '&APPID=a8f5261ee6863849df5a45497bb27163&callback=JSON_CALLBACK';

        $http.jsonp( api + vm.location.lat.toString() + '&lon='+ vm.location.lng.toString() + callback)
        .success(function(data){
           vm.data = data;
           console.log(data.name);
           marker.bindPopup(data.name).openPopup();
        })
        .error(function(){
         });
      });
    }

    Enlace
     .find({filter:{where:{id_espejo:'001'}}})
     .$promise
     .then(function(data){
        for (var i = 0; i < data.length; i++) {
          vm.sections.push(data[i]);
        }
        vm.location = vm.sections[0].location;

        $timeout(function(){
          initialize();
        }, 100);

        console.log(vm.sections[0].location);
        $scope.screenSwitch = vm.sections[0].screen;
     });


    // $scope.$watch(function() {
    //                   return $scope.toggle;
    //               }, function(newValue, oldValue) {
    //                  // Aqui estas observando cambios
    //               });

    $scope.$watch(
                    function( scope ) {
                        return (vm.screenSwitch);
                    },
                    function( newValue, oldValue ) {
                        if (newValue !== oldValue){
                          // vm.onChange(newValue);
                          $scope.vm.onChange = function (newValue) {
                                 console.log(newValue);
                                 Enlace
                                 .Event({status: newValue, id_espejo:'001'})
                                 .$promise
                                 .then(function (res) {
                                   console.log(res);
                                   console.log('actualizado : ', newValue);
                                 }, function (err) {
                                   console.log(err);
                                 });
                          };
                          $scope.vm.onChange(newValue);
                          console.log('nuevo valor', newValue);
                          // console.log('viejo valor', oldValue);
                        }
                    }
                  );


     vm.onChangeTime = function(timeoff) {
        Enlace
        .updateAll({where:{id_espejo: '001'}},{timeoff : timeoff})
        .$promise
        .then(function (res) {
          console.log(res);
        });
     };

//arreglar bug
     vm.onChange = function(screen) {
            console.log(screen);
            Enlace
            .Event({status: screen, id_espejo:'001'})
            .$promise
            .then(function (res) {
              console.log(res);
              console.log('actualizado : ', screen);
            }, function (err) {
              console.log(err);
            });
     };
   //---------------------------------------------------------------------------
  }

  angular.module('SmartMirror.pages.administracion')
         .controller('administracionCtrl',['Enlace','$scope','$timeout','$http',
          administracionCtrl]);
})();

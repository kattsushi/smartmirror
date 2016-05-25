(function () {
  'use strict';

  /** @ngInject */
  function administracionCtrl(Enlace, $scope) {
    //--------------------------------------------------------------------------
      var vm = this;
      vm.sections = [];
      Enlace
         .find({filter:{where:{id_espejo:'001'}}})
         .$promise
         .then(function(data){
            for (var i = 0; i < data.length; i++) {
              vm.sections.push(data[i]);
            }
            console.log(vm.sections[0].screen);
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
        }, function (err) {
          console.log(err);
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
         .controller('administracionCtrl',['Enlace','$scope', administracionCtrl]);
})();

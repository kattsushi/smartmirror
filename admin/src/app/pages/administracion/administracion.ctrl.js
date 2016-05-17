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
    $scope.$watch('screenSwitch', function() {
       console.log($scope.screenSwitch);
       Enlace
       .Event({status: $scope.screenSwitch, id_espejo:'001'})
       .$promise
       .then(function (res) {
         console.log(res);
         console.log('actualizado : ',$scope.screenSwitch);
       }, function (err) {
         console.log(err);
       }, true);
    });


   //---------------------------------------------------------------------------
  }

  angular.module('SmartMirror.pages.administracion')
         .controller('administracionCtrl',['Enlace','$scope', administracionCtrl]);
})();

(function () {
  'use strict';

  /** @ngInject */
  function paramsCtrl(Enlace) {
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
            console.log(vm.sections);
         });

     vm.onChangeTime = function(timeoff) {
        Enlace
        .updateAll({where:{id_espejo: '001'}},{timeoff : timeoff})
        .$promise
        .then(function (res) {
          console.log(res);
        }, function (err) {
          console.log(err);
        })
     };
   //---------------------------------------------------------------------------
  }

  angular.module('SmartMirror.pages.administracion.parametros')
         .controller('paramsCtrl',['Enlace', paramsCtrl]);
})();

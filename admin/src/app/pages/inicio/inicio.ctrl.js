(function () {
  'use strict';

  /** @ngInject */
  function inicioCtrl(Enlace) {
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
   //---------------------------------------------------------------------------
  }

  angular.module('SmartMirror.pages.inicio')
         .controller('inicioCtrl',['Enlace', inicioCtrl]);
})();
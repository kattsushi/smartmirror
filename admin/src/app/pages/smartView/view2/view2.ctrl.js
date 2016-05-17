(function () {
  'use strict';

  /** @ngInject */
  function view2Ctrl(Enlace) {
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

  angular.module('SmartMirror.pages.smartView.view2')
         .controller('view2Ctrl',['Enlace', view2Ctrl]);
})();

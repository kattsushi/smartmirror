(function () {
  'use strict';

  /** @ngInject */
  function administracionCtrl(Enlace) {
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
            vm.screenSwitch = vm.sections[0].screen;
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

     vm.data = {
     cb1: false
     };


     vm.onChange = function(status) {
        console.log(vm.data.cb1);
        Enlace
        .Event({status: status, id_espejo:'001'})
        .$promise
        .then(function (res) {
          console.log(res);
        }, function (err) {
          console.log(err);
        });
     };
   //---------------------------------------------------------------------------
  }

  angular.module('SmartMirror.pages.administracion')
         .controller('administracionCtrl',['Enlace', administracionCtrl]);
})();

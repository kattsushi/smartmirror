(function () {
  'use strict';

  /** @ngInject */
  function view2Ctrl(Enlace, MenuDiario) {
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

//==============================================================
   vm.dishes = [];

   MenuDiario
   .find()
   .$promise
   .then(function (data) {
        vm.dishes = data;
        console.log(vm.dishes);
   },function (err) {
      vm.dishes = [];
      console.log(err);
   });


   vm.addDish = function(classi) {
     console.log(classi);
     MenuDiario
     .create({class: classi, dish: vm.dishText, status: false})
     .$promise
     .then(function (data) {
         vm.dishes.push({id: data.id, dish: vm.dishText, status :false, class: classi});
         vm.dishText = '';
        //  console.log(data.id);
     },function (err) {
       console.log(err);
       vm.dishText = '';
     });
   };

   vm.updateDish = function (id, status) {
      MenuDiario
      .prototype$updateAttributes({id:id},{status: status})
      .$promise
      .then(function (data) {
          console.log('actualizado',data);
      },function (err) {
         console.log(err);
     });
   };
   vm.deleteDish = function (id) {
     MenuDiario
     .deleteById({id:id})
     .$promise
     .then(function (data) {
        console.log('elimiminado', data);
        for (var i = 0; i < vm.dishes.length; i++) {
          if (vm.dishes[i].id === id) {
             vm.dishes.splice(i,1);
          }
        }
     });
   };
  }

  angular.module('SmartMirror.pages.smartView.view2')
         .controller('view2Ctrl',['Enlace','MenuDiario', view2Ctrl]);
})();

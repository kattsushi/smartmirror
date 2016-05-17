(function () {
  'use strict';

  /** @ngInject */
  function newsFontsCtrl(Enlace, Fuentes, $http, $uibModal, $scope) {
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

   vm.fonts = [];
   Fuentes
   .find()
   .$promise
   .then(function (data) {
     vm.fonts = data;
   },function (err) {
     console(err);
     vm.fonts = [];
   });

   vm.setSelect = function (id) {
     vm.selected = id;
     Fuentes
     .prototype$updateAttributes({id:id},{status:true})
     .$promise
     .then(function (data) {
         console.log('actualizado', id, data);

         Fuentes
         .find({filter:{where:{id:{neq:id}}}})
         .$promise
         .then(function (data) {
            for (var i = 0; i < data.length; i++) {
              Fuentes
              .prototype$updateAttributes({id:data[i].id},{status: false})
              .$promise
              .then(function(e) {
                var i;
                 console.log(i,e);
              });
            }
         });
     });

   };

   vm.addFont = function() {
     vm.Feed = function(url){
        var ajax = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=';
         return $http.jsonp(ajax + encodeURIComponent(url));
       };
     vm.Feed(vm.fontUrl)
       .then(function(res){
          if (res.data.responseData !== null){
             Fuentes
              .create({name: vm.fontText, url: vm.fontUrl, status: false})
              .$promise
              .then(function (data) {
                  vm.fonts.push({name: vm.fontText, url: vm.fontUrl, status: false});
                  vm.fontText = '';
                  vm.fontUrl = '';
                  console.log(data);
              },function (err) {
                console.log(err);
                vm.fontText = '';
                vm.fontUrl = '';
              });
          }else{
            vm.openModal('app/pages/smartView/newsFonts/warningModal.html');
          }
        });
    };

    vm.deleteFont = function (id) {
      Fuentes
      .deleteById({id:id})
      .$promise
      .then(function (data) {
         console.log('elimiminado', data);
         for (var i = 0; i < vm.fonts.length; i++) {
           if (vm.fonts[i].id === id) {
              vm.fonts.splice(i,1);
           }
         }
      });
    };

    //--------modal===================================
    vm.openModal = function (page, size) {
      $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };

}

  angular.module('SmartMirror.pages.smartView.newsFonts')
         .controller('newsFontsCtrl',[
                                      'Enlace','Fuentes','$http','$uibModal',
                                      '$scope', newsFontsCtrl
                                     ]);
})();

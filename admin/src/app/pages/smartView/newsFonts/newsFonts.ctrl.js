(function () {
  'use strict';

  /** @ngInject */
  function newsFontsCtrl(Enlace, Fuentes, $http,
                         $uibModal, $scope, fileUpload2, $interval) {
    //--------------------------------------------------------------------------
      var vm = this;
      vm.sections = [];
      $interval(function () {
        Enlace
           .find({filter:{where:{id_espejo:'001'}}})
           .$promise
           .then(function(data){
              for (var i = 0; i < data.length; i++) {
                vm.sections.push(data[i]);
              }
              var srcImg = 'http://10.0.0.121:3001/assets/img/handout/';
              vm.handout = srcImg + data[0].handout.toString() + '.png';
              // console.log(vm.sections);
           });
      }, 500);
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
              .prototype$updateAttributes({id:data[i].id},{status: false});
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

    //*----- Subir Imagen

    vm.uploadPicture = function () {
      // var fileInput = document.getElementById('uploadFile');
      // // fileInput.click();
      var file = vm.myFile;

      console.log('file is ' );

      console.log(vm.myFile);

      var uploadUrl = '/api/handout';
      fileUpload2.uploadFileToUrl(file, uploadUrl);
      Enlace
         .find({filter:{where:{id_espejo:'001'}}})
         .$promise
         .then(function(data){
            vm.id_espejo = 'http://localhost:3001/assets/img/handout/' + data[0].handout.toString() + '.png';
      });

    };

}

  angular.module('SmartMirror.pages.smartView.newsFonts')
         .controller('newsFontsCtrl',[
                                      'Enlace','Fuentes','$http','$uibModal',
                                      '$scope','fileUpload2', '$interval',
                                       newsFontsCtrl
                                     ])

         .service('fileUpload2', ['$http', function ($http) {
                      this.uploadFileToUrl = function(file, uploadUrl){
                         //  console.log(uploadUrl);
                          var fd = new FormData();
                          fd.append('file', file);
                          console.log(fd);
                          $http.post(uploadUrl, fd, {
                              transformRequest: angular.identity,
                              headers: {'Content-Type': undefined}
                          })
                          .success(function(){
                            console.log('ok upload');
                          })
                          .error(function(){
                          });
                      };
                  }]);
})();

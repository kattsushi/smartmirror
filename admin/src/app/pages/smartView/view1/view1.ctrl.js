(function () {
  'use strict';

  /** @ngInject */
  function view1Ctrl($scope, Enlace, $filter, fileUpload) {
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
            // vm.id_espejo = 'http://localhost:3001/assets/pictures/' + data[0].logo.toString() + '.png';
            vm.id_espejo = 'http://10.0.0.121:3001/assets/pictures/' + data[0].logo.toString() + '.png';
            console.log(vm.sections);
         });

      vm.onChangeM = function () {
       Enlace
       .updateAll({where: {id_espejo: '001'}},{name:vm.guest, coment: vm.guestMessage})
       .$promise
       .then(function (data) {
         console.log(data);
       },function (err) {
           console.log(err);
       });
     };
      vm.onChange = function(status) {
        Enlace
        .Event({status: status, id_espejo:'001'})
        .$promise
        .then(function (res) {
          console.log(res);
        }, function (err) {
          console.log(err);
        });
      };
      //--------------------------------------

    vm.picture = $filter('profilePicture')('Nasta');

    vm.removePicture = function () {
      vm.picture = $filter('appImage')('theme/no-photo.png');
      vm.noPicture = true;
    };

    vm.uploadPicture = function () {
      // var fileInput = document.getElementById('uploadFile');
      // // fileInput.click();
      var file = vm.myFile;

      console.log('file is ' );

      console.log(vm.myFile);

      var uploadUrl = '/api/photo';
      fileUpload.uploadFileToUrl(file, uploadUrl);
      Enlace
         .find({filter:{where:{id_espejo:'001'}}})
         .$promise
         .then(function(data){
            vm.id_espejo = 'http://localhost:3001/assets/pictures/' + data[0].logo.toString() + '.png';
      });

    };
   //---------------------------------------------------------------------------
  }

  angular.module('SmartMirror.pages.smartView.view1')
         .controller('view1Ctrl',[
                                  '$scope','Enlace','$filter','fileUpload',
                                  view1Ctrl
                                 ])
         .directive('fileModel', ['$parse', function ($parse) {
             return {
                 restrict: 'A',
                 link: function(scope, element, attrs) {
                     var model = $parse(attrs.fileModel);
                     console.log(attrs.fileModel);
                     var modelSetter = model.assign;

                     element.bind('change', function(){
                         scope.$apply(function(){
                             modelSetter(scope, element[0].files[0]);

                             console.log(element[0].files[0]);
                         });
                     });
                 }
             };
         }])

         .service('fileUpload', ['$http', function ($http) {
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

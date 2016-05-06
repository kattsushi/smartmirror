(function(){

  angular
    .module('app')
    .controller('adminController', ['Enlace','$scope','fileUpload',
      ProfileController
    ])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])

    .service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(){
              console.log('ok upload');
            })
            .error(function(){
            });
        }
    }]);
/*============================================================================
==============================================================================
==============================================================================*/
  function ProfileController(Enlace, $scope, fileUpload) {
    var vm = this;
//------------------------------------------------------------------------------
    vm.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "/api/photo";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

    vm.sections = [];
    Enlace
       .find({filter:{where:{id_espejo:"001"}}})
       .$promise
       .then(function(data){
          for (var i = 0; i < data.length; i++) {
            vm.sections.push(data[i]);
            vm.message = vm.sections[0].screen;
          }
       });

    vm.data = {
    cb1: true
    };
    vm.onChangeM = function () {
      Enlace
      .updateAll({where: {id_espejo: '001'}},{name:vm.guest, coment: vm.guestMessage})
      .$promise
      .then(function (data) {
        console.log(data);
      },function (err) {
          console.log(err);
      });
    }
    vm.onChange = function(status) {
       Enlace
       .Event({status: status, id_espejo:"001"})
       .$promise
       .then(function (res) {
         console.log(res);
       }, function (err) {
         console.log(err);
       })
    };

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

    vm.user = {
      title: 'Admin',
      email: 'contact@flatlogic.com',
      firstName: '',
      lastName: '' ,
      company: 'FlatLogic Inc.' ,
      address: 'Fabritsiusa str, 4' ,
      city: 'Minsk' ,
      state: '' ,
      biography: 'We are young and ambitious full service design and technology company. ' +
      'Our focus is JavaScript development and User Interface design.',
      postalCode : '220007'
    };
  /*============================================================================
  ==============================================================================
  ==============================================================================*/

   vm.dishes = [];


   vm.addDish = function() {
     vm.dishes.push({dish: vm.dishText, status :false, class: ''});
     vm.dishText = '';
   };

   vm.remaining = function() {
     var count = 0;
     angular.forEach(vm.dishes, function(dish) {
       count += dish.status ? 0 : 1;
     });
     return count;
   };

   vm.archive = function() {
     var oldTodos = vm.dishes;
     vm.todos = [];
     angular.forEach(oldTodos, function(dish) {
       if (!dish.status) vm.dishes.push(dish);
     });
   };
}
})();

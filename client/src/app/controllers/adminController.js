(function(){

  angular
    .module('app')
    .controller('adminController', ['Enlace','$scope','fileUpload',
                                    'MenuDiario', 'Fuentes','$http',
                                    '$mdDialog', '$mdMedia',
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
  function ProfileController(Enlace, $scope, fileUpload, MenuDiario, Fuentes,
                             $http, $mdDialog, $mdMedia) {
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

   MenuDiario
   .find()
   .$promise
   .then(function (data) {
        vm.dishes = data;
        console.log(vm.dishes);
   },function (data) {
      vm.dishes = [];
   });


   vm.addDish = function(classi) {
     console.log(classi);
     MenuDiario
     .create({class: classi, dish: vm.dishText, status: false})
     .$promise
     .then(function (data) {
         vm.dishes.push({dish: vm.dishText, status :false, class: classi});
         vm.dishText = '';
     },function (err) {
       console.log(err);
       vm.dishText = '';
     });
   };
   vm.updateDinner = function (id, status) {
      MenuDiario
      .prototype$updateAttributes({id:id},{status: status})
      .$promise
      .then(function (data) {
          console.log('actualizado');
      },function (err) {
         console.log(err);
     })
   };
   vm.deleteDish = function (id) {
     MenuDiario
     .deleteById({id:id})
     .$promise
     .then(function (data) {
        console.log('elimiminado');
        for (var i = 0; i < vm.dishes.length; i++) {
          if (vm.dishes[i].id == id) {
             vm.dishes.splice(i,1);
          }
        }
     })
   }
  //  vm.remaining = function(classi) {
  //    var count = 0;
  //    angular.forEach(vm.dishes, function(dish) {
  //      count += dish.status && ? 0 : 1;
  //    });
  //    return count;
  //  };

   vm.archive = function() {
     var oldTodos = vm.dishes;
     vm.todos = [];
     angular.forEach(oldTodos, function(dish) {
       if (!dish.status) vm.dishes.push(dish);
     });
   };

    /*============================================================================
  ==============================================================================
  ==============================================================================*/
  vm.fonts = [];
  Fuentes
  .find()
  .$promise
  .then(function (data) {
    vm.fonts = data;
  },function (err) {
    vm.fonts = [];
  })

  vm.setSelect = function (id) {
    vm.selected = id;
    Fuentes
    .prototype$updateAttributes({id:id},{status:true})
    .$promise
    .then(function (data) {
        console.log("actualizado", id);

        Fuentes
        .find({filter:{where:{id:{neq:id}}}})
        .$promise
        .then(function (data) {
           for (var i = 0; i < data.length; i++) {
             Fuentes
             .prototype$updateAttributes({id:data[i].id},{status: false})
             .$promise
             .then(function (e) {
                console.log(i);
             });             
           }
        })  
    })
    
  }

  vm.addFont = function() {
    vm.Feed = function(url){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
      }
    vm.Feed(vm.fontUrl)
      .then(function(res){
         if (res.data.responseData != null){
            Fuentes
             .create({name: vm.fontText, url: vm.fontUrl, status: false})
             .$promise
             .then(function (data) {
                 vm.fonts.push({name: vm.fontText, url: vm.fontUrl, status: false});
                 vm.fontText = '';
                 vm.fontUrl = '';
             },function (err) {
               console.log(err);
               vm.fontText = '';
               vm.fontUrl = '';
             });
         }else{
           $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Sorry, but url font news is invalid')
                .textContent('try font RSS in format xml')
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok')
                .targetEvent()
            );
         }
       });

     
   };

}
})();

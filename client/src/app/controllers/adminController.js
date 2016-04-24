(function(){

  angular
    .module('app')
    .controller('adminController', ['Enlace',
      ProfileController
    ]);

  function ProfileController(Enlace) {
    var vm = this;

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
  }

})();

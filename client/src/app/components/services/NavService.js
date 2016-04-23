(function(){
  'use strict';

  angular.module('app')
          .service('navService', [
          '$q',
          navService
  ]);

  function navService($q){
    var menuItems = [
      {
        name: 'Smart-Mirror',
        icon: 'dashboard',
        sref: '.dashboard'
      },
      {
        name: 'Admin-Mirror',
        icon: 'dns',
        sref: '.profile'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();

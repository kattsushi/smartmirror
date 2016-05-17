/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('administracion', {
          url: '/administracion',
          templateUrl : 'app/pages/administracion/administracion.html',
          title: 'Adminstracion',
          sidebarMeta: {
            icon: 'ion-gear-b',
            order: 100
          },
          controller: 'administracionCtrl as vm'
        });
  }
  angular.module('SmartMirror.pages.administracion', [])
         .config(routeConfig);

})();

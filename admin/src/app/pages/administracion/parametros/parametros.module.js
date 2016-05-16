/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('administracion.parametros', {
          url: '/parametros',
          templateUrl: 'app/pages/administracion/parametros/parametros.html',
          title: 'Parametros',
          sidebarMeta: {
            order: 100,
          },
          controller: 'paramsCtrl as vm'
        });
  }
    angular.module('SmartMirror.pages.administracion.parametros', [])
           .config(routeConfig);
})();

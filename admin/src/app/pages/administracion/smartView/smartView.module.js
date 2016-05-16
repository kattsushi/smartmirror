/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('administracion.smartView', {
          url: '/smartView',
          templateUrl: 'app/pages/administracion/smartView/smartView.html',
          title: 'SmartView',
          sidebarMeta: {
            order: 300,
          },
        });
  }
    angular.module('SmartMirror.pages.administracion.smartView', [])
           .config(routeConfig);
})();

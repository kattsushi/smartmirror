/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('smartView.view1', {
          url: '/view1',
          templateUrl: 'app/pages/smartView/view1/view1.html',
          title: 'View 1',
          sidebarMeta: {
            order: 100,
          },
          controller: 'view1Ctrl as vm'
        });
  }
    angular.module('SmartMirror.pages.smartView.view1', [])
           .config(routeConfig);
})();

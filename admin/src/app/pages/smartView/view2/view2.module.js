/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('smartView.view2', {
          url: '/view2',
          templateUrl: 'app/pages/smartView/view2/view2.html',
          title: 'View 2',
          sidebarMeta: {
            order: 200,
          },
          controller: 'view2Ctrl as vm'
        });
  }
    angular.module('SmartMirror.pages.smartView.view2', [])
           .config(routeConfig);
})();

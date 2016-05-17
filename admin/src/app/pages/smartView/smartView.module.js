/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/inicio');
    $stateProvider
        .state('smartView', {
          url: '/smartview',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'SmartView',
          sidebarMeta: {
            order: 300,
            icon: 'ion-android-phone-landscape'
          },
        });
  }
    angular.module('SmartMirror.pages.smartView',
                    [
                      'SmartMirror.pages.smartView.view1',
                      'SmartMirror.pages.smartView.newsFonts',
                      'SmartMirror.pages.smartView.view2'
                    ])
           .config(routeConfig);
})();

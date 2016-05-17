/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('smartView.newsFonts', {
          url: '/newsFonts',
          templateUrl: 'app/pages/smartView/newsFonts/newsFonts.html',
          title: 'News Fonts',
          sidebarMeta: {
            order: 300,
          },
          controller: 'newsFontsCtrl as vm'
        });
  }
    angular.module('SmartMirror.pages.smartView.newsFonts', [])
           .config(routeConfig);
})();

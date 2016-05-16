/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  /** @ngInject */
  function routeConfig ($urlRouterProvider,LoopBackResourceProvider) {
    $urlRouterProvider.otherwise('/inicio');

    LoopBackResourceProvider
        // .setUrlBase('http://10.0.0.121:3001/api');
        .setUrlBase('http://localhost:3001/api');
    LoopBackResourceProvider
        .setAuthHeader('X-Access-Token');
    // baSidebarServiceProvider.addStaticItem({


  }

  angular.module('SmartMirror.pages', [
                                      'ui.router',

                                      'SmartMirror.pages.inicio',
                                      'SmartMirror.pages.profile',
                                      'SmartMirror.pages.administracion'
                                      ])
         .config(['$urlRouterProvider', 'LoopBackResourceProvider', routeConfig]);

})();

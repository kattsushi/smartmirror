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
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Adminstracion',
          sidebarMeta: {
            icon: 'ion-gear-b',
            order: 100
          },
        });
  }
  angular.module('SmartMirror.pages.administracion', [
                                        'SmartMirror.pages.administracion.parametros'
                                       ])
         .config(routeConfig);

})();

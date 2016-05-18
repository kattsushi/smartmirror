/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  /** @ngInject */
  function viewA() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/inicio/viewA/viewA.html',
      controller: 'viewACtrl as vm'
    };
  }

  angular.module('SmartMirror.theme.components')
         .directive('viewA', viewA);

})();

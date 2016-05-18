/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  /** @ngInject */
  function viewB() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/inicio/viewB/viewB.html',
      controller: 'viewBCtrl as vm'
    };
  }

  angular.module('SmartMirror.theme.components')
         .directive('viewB', viewB);

})();

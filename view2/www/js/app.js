(function () {
  'use strict';
    angular.module('app', ['ionic',
                           'routes',
                           'app.controllers',
                           'lbServices'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
        ionic.Platform.fullScreen();
      });
    })
    .config(['LoopBackResourceProvider', function (LoopBackResourceProvider) {

            // LoopBackResourceProvider.setUrlBase('http://10.0.0.121:3001/api');
            LoopBackResourceProvider.setUrlBase('http://192.168.0.10:3001/api');
            // LoopBackResourceProvider.setUrlBase('http://localhost:3001/api');
            //console.info(user);

            LoopBackResourceProvider.setAuthHeader('X-Access-Token');
    }]);

})();

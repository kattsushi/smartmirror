'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ui.router', 'ngMaterial','nvd3', 'app','lbServices'])

  .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
                   '$mdIconProvider','LoopBackResourceProvider',
   function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider, LoopBackResourceProvider) {

    LoopBackResourceProvider
        // .setUrlBase('http://10.0.0.121:3001/api');
        .setUrlBase('http://localhost:3001/api');
    LoopBackResourceProvider
        .setAuthHeader('X-Access-Token');

    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/views/dashboard.html',
        data: {
          title: 'Dashboard'
        },
        controller : 'MainController',
        controllerAs: 'vm'
      })
      .state('home.admin', {
        url: '/admin',
        templateUrl: 'app/views/admin.html',
        controller: 'adminController',
        controllerAs: 'vm',
        data: {
          title: 'Profile'
        }
      })
      .state('home.table', {
        url: '/table',
        controller: 'TableController',
        controllerAs: 'vm',
        templateUrl: 'app/views/table.html',
        data: {
          title: 'Table'
        }
      });

    $urlRouterProvider.otherwise('/dashboard');

    $mdThemingProvider
      .theme('default')
        .primaryPalette('grey', {
          'default': '600'
        })
        .accentPalette('teal', {
          'default': '500'
        })
        .warnPalette('defaultPrimary');

    $mdThemingProvider.theme('indigo', 'default')
      .primaryPalette('defaultPrimary')
      .dark();

    $mdThemingProvider.theme('indigo', 'default')
      .primaryPalette('indigo');

    $mdThemingProvider.theme('custom', 'default')
      .primaryPalette('defaultPrimary', {
        'hue-1': '50'
    });

    $mdThemingProvider.definePalette('defaultPrimary', {
      '50':  '#FFFFFF',
      '100': 'rgb(255, 198, 197)',
      '200': '#E75753',
      '300': '#E75753',
      '400': '#E75753',
      '500': '#E75753',
      '600': '#E75753',
      '700': '#E75753',
      '800': '#E75753',
      '900': '#E75753',
      'A100': '#E75753',
      'A200': '#E75753',
      'A400': '#E75753',
      'A700': '#E75753'
    });

    $mdIconProvider.icon('user', 'assets/images/user.svg', 64);
  }]);

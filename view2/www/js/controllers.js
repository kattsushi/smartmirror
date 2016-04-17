/*global angular */
(function() {
'use strict';

function MainCtrl($http) {
  var vm = this;

  vm.location = 'Hola mundo';

  vm.Feed = function(url){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
      }
  vm.feedSrc = 'http://ep00.epimg.net/rss/elpais/portada.xml';

    vm.loadFeed = function(e){        
      vm.Feed(vm.feedSrc)
            .then(function(res){
                // vm.loadBtnText = angular.element(e.target).text();
                 vm.feeds = res.data.responseData.feed.entries;
                 console.info(vm.feeds);
            });
      };
    vm.loadFeed();  
    setInterval(vm.loadFeed, 50000);  
       
  }
    

angular.module('app', [])
       .controller('mainCtrl',['$http', MainCtrl]);

})();


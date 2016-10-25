'use strict';

angular.module('myApp.browser', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/browser', {
    templateUrl: 'views/browser/browser.html',
    controller: 'browserCtrl'
  });
}])
.controller('browserCtrl',
	[ '$scope', '$location', 'proxyRegisterSvc',
		function($scope, $location, proxyRegisterSvc){
		
		  $scope.proxy = '';
		  $scope.isProxyRegister = false;
		
		  $scope.connect = function() {
		    console.log('should register ');
        proxyRegisterSvc.setUrl($scope.proxy);
        $scope.isProxyRegister = true;
		  }
		}
	]
);	
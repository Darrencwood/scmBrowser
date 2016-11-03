'use strict';

angular.module('myApp.menu', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/menu', {
    templateUrl: 'views/menu/menu.html',
    controller: 'menuCtrl'
  });
}])
.controller('menuCtrl',
	[ '$scope', '$location', 
		function($scope, $location){
		  $location.path('/browser');
		  $scope.browser = function() {
		    $location.path('/browser');
		  }
		}
	]
);	
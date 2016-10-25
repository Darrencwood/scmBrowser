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
		  $scope.browser = function() {
		    $location.path('/browser');
		  }
		  $scope.networkTopology = function() {
		    $location.path('/network_topology');
		  }
		}
	]
);	
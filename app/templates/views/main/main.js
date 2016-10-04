'use strict';

angular.module('myApp.main', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'views/main/main.html',
    controller: 'mainCtrl'
  });
}])
.controller('mainCtrl',
	[ '$scope', '$location', 
		function($scope, $location){
		  
		}
	]
);	
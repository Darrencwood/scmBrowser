angular.module('myApp.networkTopology', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/network_topology', {
    templateUrl: 'views/network_topology/network_topology.html',
    controller: 'networkTopologyCtrl'
  });
}])
.controller('networkTopologyCtrl',
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
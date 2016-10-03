angular.module('myApp.proxyRegister', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/proxyRegister', {
    templateUrl: 'views/proxyRegister/proxyRegister.html',
    controller: 'proxyRegisterCtrl'
  });
}])
.controller('proxyRegisterCtrl',
		[ '$scope', '$location', 'apiProxyRegisterSettings',  '$location',
			function($scope, $location, apiProxyRegisterSettings, $location){
				$scope.settings = { url: 'https://cc.vlab.test' };
				$scope.connect = function() {
					apiProxyRegisterSettings.save({}, $scope.settings);
					$location.path('/main');
				}
			}
		]
);
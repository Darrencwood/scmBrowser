// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ui.grid', 
	'ui.grid.edit',
	'ui.grid.resizeColumns', 
	'ui.grid.autoResize',
	'ui.grid.importer',
	'formly', 
	'formlyBootstrap',
  'myApp.proxyRegister',
  'myApp.main',
  'myApp.Ap',
  'myApp.Appgroups',
  'myApp.Bgpneighs',
  'myApp.Broadcasts',
  'myApp.Clusters',
  'myApp.Customapps',
  'myApp.Dcinterfaces',
  'myApp.Dcuplinks',
  'myApp.Devices',
  'myApp.Endpoints',
  'myApp.Inboundrules',
  'myApp.Networks',
  'myApp.Nodes',
  'myApp.Orgs',
  'myApp.Outboundrules',
  'myApp.Pathrules',
  'myApp.Sites',
  'myApp.Ssids',
  'myApp.Switches',
  'myApp.Uplinks',
  'myApp.Users',
  'myApp.Zones'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/proxyRegister'});
}]);


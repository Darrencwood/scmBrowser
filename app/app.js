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
  'myApp.ap',
  'myApp.appGroups',
  'myApp.bgpneighs',
  'myApp.broadcasts',
  'myApp.clusters',
  'myApp.customApps',
  'myApp.dcinterfaces',
  'myApp.dcuplinks',
  'myApp.devices',
  'myApp.endpoints',
  'myApp.inboundRules',
  'myApp.networks',
  'myApp.nodes',
  'myApp.orgs',
  'myApp.outboundRules',
  'myApp.pathRules',
  'myApp.sites',
  'myApp.ssids',
  'myApp.switches',
  'myApp.uplinks',
  'myApp.users',
  'myApp.zones'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/proxyRegister'});
}]);


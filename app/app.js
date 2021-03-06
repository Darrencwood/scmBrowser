// Declare app level module which depends on views, and components
angular.module('myApp', [
  'underscore',
  'ngRoute',
  'ngResource',
  'ui.grid', 
	'ui.grid.edit',
	'ui.grid.resizeColumns', 
	'ui.grid.autoResize',
	'ui.grid.importer',
	'ui.grid.exporter',
	'ui.grid.selection',
	'formly', 
	'formlyBootstrap',
  'myApp.browser',
  'myApp.networkTopology',
  'myApp.menu',
  'myApp.ap',
  'myApp.apps',
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
  'myApp.orgsAp',
  'myApp.orgsApp_groups',
  'myApp.orgsBgpneighs',
  'myApp.orgsBroadcasts',
  'myApp.orgsClusters',
  'myApp.orgsCustom_apps',
  'myApp.orgsDcinterfaces',
  'myApp.orgsDcuplinks',
  'myApp.orgsDevices',
  'myApp.orgsEndpoints',
  'myApp.orgsInbound_rules',
  'myApp.orgsNetworks',
  'myApp.orgsNodes',
  'myApp.orgsOutbound_rules',
  'myApp.orgsPath_rules',
  'myApp.orgsSites',
  'myApp.orgsSsids',
  'myApp.orgsSwitches',
  'myApp.orgsUplinks',
  'myApp.orgsUsers',
  'myApp.orgsWans',
  'myApp.orgsZones',
  'myApp.outboundRules',
  'myApp.pathRules',
  'myApp.ports',
  'myApp.sites',
  'myApp.ssids',
  'myApp.switches',
  'myApp.uplinks',
  'myApp.users',
  'myApp.zones'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/menu'});
}]);


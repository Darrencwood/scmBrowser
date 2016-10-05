'use strict';

angular.module('myApp.Networks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/networks', {
    templateUrl: 'views/networks/networks.html',
    controller: 'NetworksCtrl'
  });
}])
.controller('NetworksCtrl',
		[ '$scope', 'apiNetworks', '$location', 'currentNetworks', '$timeout',
			function($scope, apiNetworks, $location, currentNetworks, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Networks = apiNetworks.query();
				$scope.NetworksSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.NetworksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'nodenetcfgs', field:'nodenetcfgs'/*, visible: */},
						{ name:'zone', field:'zone'/*, visible: */},
						{ name:'name', field:'name'/*, visible: */},
						{ name:'dhcps_range_start', field:'dhcps_range_start'/*, visible: */},
						{ name:'devices', field:'devices'/*, visible: */},
						{ name:'dhcps_range_end', field:'dhcps_range_end'/*, visible: */},
						{ name:'primary', field:'primary'/*, visible: */},
						{ name:'site', field:'site'/*, visible: */},
						{ name:'netv6', field:'netv6'/*, visible: */},
						{ name:'netv4', field:'netv4'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'gwv6', field:'gwv6'/*, visible: */},
						{ name:'ra', field:'ra'/*, visible: */},
						{ name:'wans', field:'wans'/*, visible: */},
						{ name:'routes', field:'routes'/*, visible: */},
						{ name:'id', field:'id'/*, visible: */},
						{ name:'gwv4', field:'gwv4'/*, visible: */},
						{ name:'lnets', field:'lnets'/*, visible: */},
						{ name:'breakout_preference', field:'breakout_preference'/*, visible: */},
						{ name:'breakout_sitelink_site', field:'breakout_sitelink_site'/*, visible: */},
						{ name:'gw_noauto', field:'gw_noauto'/*, visible: */},
						{ name:'dhcps_leasetime', field:'dhcps_leasetime'/*, visible: */},
						{ name:'dhcps_options', field:'dhcps_options'/*, visible: */},
					],
					data: $scope.Networks,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiNetworks.save(newObject).$promise.then(function(data){
    						$scope.Networks.push(data);
    						$scope.updateResults.push({status: "ok", message: 'created.'});
    						refresh();
    					},function(error){
    						$scope.updateResults.push({status: "error", message: error.data.error.message});
							refresh();
    					});
    				},
    				onRegisterApi: function(gridApi){ 
      					$scope.gridApi = gridApi;
      						//$scope.gridApi.rowEdit.on.saveRow($scope,
      						//$scope.saveRow);
    					}
					};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                			$scope.NetworksSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.NetworksSelected = undefined;
				}
				
				$scope.NetworksFields = [
						{key: 'nodenetcfgs', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'nodenetcfgs', placeholder: "nodenetcfgs", required: false
            				}
          				},
						{key: 'zone', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'zone', placeholder: "zone", required: false
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: "name", required: false
            				}
          				},
						{key: 'dhcps_range_start', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dhcps_range_start', placeholder: "dhcps_range_start", required: false
            				}
          				},
						{key: 'devices', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'devices', placeholder: "devices", required: false
            				}
          				},
						{key: 'dhcps_range_end', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dhcps_range_end', placeholder: "dhcps_range_end", required: false
            				}
          				},
						{key: 'primary', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'primary', placeholder: "primary", required: false
            				}
          				},
						{key: 'site', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'site', placeholder: "site", required: false
            				}
          				},
						{key: 'netv6', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'netv6', placeholder: "netv6", required: false
            				}
          				},
						{key: 'netv4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'netv4', placeholder: "netv4", required: false
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "org", required: false
            				}
          				},
						{key: 'gwv6', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'gwv6', placeholder: "gwv6", required: false
            				}
          				},
						{key: 'ra', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'ra', placeholder: "ra", required: false
            				}
          				},
						{key: 'wans', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'wans', placeholder: "wans", required: false
            				}
          				},
						{key: 'routes', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'routes', placeholder: "routes", required: false
            				}
          				},
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'gwv4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'gwv4', placeholder: "gwv4", required: false
            				}
          				},
						{key: 'lnets', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'lnets', placeholder: "lnets", required: false
            				}
          				},
						{key: 'breakout_preference', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'breakout_preference', placeholder: "list of wans", required: false
            				}
          				},
						{key: 'breakout_sitelink_site', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'breakout_sitelink_site', placeholder: "RouteVPN breakout site", required: false
            				}
          				},
						{key: 'gw_noauto', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'gw_noauto', placeholder: "gw_noauto", required: false
            				}
          				},
						{key: 'dhcps_leasetime', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'dhcps_leasetime', placeholder: "DHCP lease-time", required: false
            				}
          				},
						{key: 'dhcps_options', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dhcps_options', placeholder: "dhcps_options", required: false
            				}
          				},
				];
		}]
)
;
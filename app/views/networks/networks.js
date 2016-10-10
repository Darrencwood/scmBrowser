'use strict';
angular.module('myApp.networks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/networks', {
    templateUrl: 'views/networks/networks.html',
    controller: 'networksCtrl'
  });
}])
.controller('networksCtrl',
		[ '$scope', 'networksApi', '$location', 'networksSelectionSvc', '$timeout',
			function($scope, networksApi, $location, networksSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.networks = networksApi.query();
				$scope.networksSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.networksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Nodenetcfgs', field:'nodenetcfgs'/*, visible: */},
						{ name:'Zone', field:'zone'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Dhcps Range Start', field:'dhcps_range_start'/*, visible: */},
						{ name:'Devices', field:'devices'/*, visible: */},
						{ name:'Dhcps Range End', field:'dhcps_range_end'/*, visible: */},
						{ name:'Primary', field:'primary'/*, visible: */},
						{ name:'Site', field:'site'/*, visible: */},
						{ name:'Netv6', field:'netv6'/*, visible: */},
						{ name:'Netv4', field:'netv4'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Gwv6', field:'gwv6'/*, visible: */},
						{ name:'Ra', field:'ra'/*, visible: */},
						{ name:'Wans', field:'wans'/*, visible: */},
						{ name:'Routes', field:'routes'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Gwv4', field:'gwv4'/*, visible: */},
						{ name:'Lnets', field:'lnets'/*, visible: */},
						{ name:'Breakout Preference', field:'breakout_preference'/*, visible: */},
						{ name:'Breakout Sitelink Site', field:'breakout_sitelink_site'/*, visible: */},
						{ name:'Gw Noauto', field:'gw_noauto'/*, visible: */},
						{ name:'Dhcps Leasetime', field:'dhcps_leasetime'/*, visible: */},
						{ name:'Dhcps Options', field:'dhcps_options'/*, visible: */},
					],
					data: $scope.networks,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					networksApi.save(newObject).$promise.then(function(data){
    						$scope.networks.push(data);
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
                					$scope.networksSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.networksSelected = undefined;
				}
				
				$scope.networksFields = [
						{key: 'nodenetcfgs', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'nodenetcfgs', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'zone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zone', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dhcps_range_start', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dhcps_range_start', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devices', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devices', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dhcps_range_end', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dhcps_range_end', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'primary', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'primary', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'netv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'netv6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'netv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'netv4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'gwv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gwv6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ra', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ra', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'wans', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'wans', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'routes', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'routes', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'gwv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gwv4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'lnets', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'lnets', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'breakout_preference', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout_preference', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'breakout_sitelink_site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout_sitelink_site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'gw_noauto', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gw_noauto', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dhcps_leasetime', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dhcps_leasetime', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dhcps_options', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dhcps_options', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);
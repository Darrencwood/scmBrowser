'use strict';

angular.module('myApp.Dcinterfaces', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dcinterfaces', {
    templateUrl: 'views/dcinterfaces/dcinterfaces.html',
    controller: 'DcinterfacesCtrl'
  });
}])
.controller('DcinterfacesCtrl',
		[ '$scope', 'apiDcinterfaces', '$location', 'currentDcinterfaces', '$timeout',
			function($scope, apiDcinterfaces, $location, currentDcinterfaces, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Dcinterfaces = apiDcinterfaces.query();
				$scope.DcinterfacesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.DcinterfacesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'org', field:'org'/*, visible: */},
						{ name:'port', field:'port'/*, visible: */},
						{ name:'gateway_ipv4', field:'gateway_ipv4'/*, visible: */},
						{ name:'gateway_ipv6', field:'gateway_ipv6'/*, visible: */},
						{ name:'ipv4', field:'ipv4'/*, visible: */},
						{ name:'ipv6', field:'ipv6'/*, visible: */},
						{ name:'mtu', field:'mtu'/*, visible: */},
						{ name:'auto_negotiation', field:'auto_negotiation'/*, visible: */},
						{ name:'enabled', field:'enabled'/*, visible: */},
					],
					data: $scope.Dcinterfaces,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiDcinterfaces.save(newObject).$promise.then(function(data){
    						$scope.Dcinterfaces.push(data);
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
                			$scope.DcinterfacesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.DcinterfacesSelected = undefined;
				}
				
				$scope.DcinterfacesFields = [
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "The ID of the organization this datacenter interface belongs to.", required: false
            				}
          				},
						{key: 'port', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'port', placeholder: "The ID of the appliance port this datacenter interface belongs to.", required: false
            				}
          				},
						{key: 'gateway_ipv4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'gateway_ipv4', placeholder: "Gateway IPv4 address.", required: false
            				}
          				},
						{key: 'gateway_ipv6', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'gateway_ipv6', placeholder: "Gateway IPv6 address.", required: false
            				}
          				},
						{key: 'ipv4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'ipv4', placeholder: "Static IPv4 address with optional netmask.", required: false
            				}
          				},
						{key: 'ipv6', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'ipv6', placeholder: "Static IPv6 address with optional netmask.", required: false
            				}
          				},
						{key: 'mtu', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'mtu', placeholder: "The maximum transmission unit of the datacenter interface (1280 to 9586).", required: false
            				}
          				},
						{key: 'auto_negotiation', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'auto_negotiation', placeholder: "Auto-negotiation on &quot;1&quot; or off &quot;0&quot;.", required: false
            				}
          				},
						{key: 'enabled', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'enabled', placeholder: "Enable &quot;1&quot; or disable &quot;0&quot;", required: false
            				}
          				},
				];
		}]
)
;
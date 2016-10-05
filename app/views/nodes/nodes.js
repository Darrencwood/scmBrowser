'use strict';

angular.module('myApp.Nodes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nodes', {
    templateUrl: 'views/nodes/nodes.html',
    controller: 'NodesCtrl'
  });
}])
.controller('NodesCtrl',
		[ '$scope', 'apiNodes', '$location', 'currentNodes', '$timeout',
			function($scope, apiNodes, $location, currentNodes, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Nodes = apiNodes.query();
				$scope.NodesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.NodesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'site', field:'site'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'local_as', field:'local_as'/*, visible: */},
						{ name:'router_id', field:'router_id'/*, visible: */},
						{ name:'serial', field:'serial'/*, visible: */},
						{ name:'id', field:'id'/*, visible: */},
						{ name:'uid', field:'uid'/*, visible: */},
						{ name:'zones', field:'zones'/*, visible: */},
						{ name:'radios', field:'radios'/*, visible: */},
						{ name:'realm', field:'realm'/*, visible: */},
						{ name:'location', field:'location'/*, visible: */},
						{ name:'ports', field:'ports'/*, visible: */},
						{ name:'uplinks', field:'uplinks'/*, visible: */},
						{ name:'inventory_version_cc', field:'inventory_version_cc'/*, visible: */},
						{ name:'disable_stp', field:'disable_stp'/*, visible: */},
						{ name:'license', field:'license'/*, visible: */},
						{ name:'model', field:'model'/*, visible: */},
						{ name:'sitelink', field:'sitelink'/*, visible: */},
						{ name:'simulated', field:'simulated'/*, visible: */},
					],
					data: $scope.Nodes,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiNodes.save(newObject).$promise.then(function(data){
    						$scope.Nodes.push(data);
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
                			$scope.NodesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.NodesSelected = undefined;
				}
				
				$scope.NodesFields = [
						{key: 'site', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'site', placeholder: "site", required: false
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "org", required: false
            				}
          				},
						{key: 'local_as', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'local_as', placeholder: "local_as", required: false
            				}
          				},
						{key: 'router_id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'router_id', placeholder: "router_id", required: false
            				}
          				},
						{key: 'serial', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'serial', placeholder: "serial", required: false
            				}
          				},
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'uid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uid', placeholder: "uid", required: false
            				}
          				},
						{key: 'zones', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'zones', placeholder: "zones", required: false
            				}
          				},
						{key: 'radios', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'radios', placeholder: "radios", required: false
            				}
          				},
						{key: 'realm', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'realm', placeholder: "realm", required: false
            				}
          				},
						{key: 'location', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'location', placeholder: "location", required: false
            				}
          				},
						{key: 'ports', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'ports', placeholder: "ports", required: false
            				}
          				},
						{key: 'uplinks', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'uplinks', placeholder: "uplinks", required: false
            				}
          				},
						{key: 'inventory_version_cc', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'inventory_version_cc', placeholder: "inventory_version_cc", required: false
            				}
          				},
						{key: 'disable_stp', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'disable_stp', placeholder: "disable_stp", required: false
            				}
          				},
						{key: 'license', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'license', placeholder: "license", required: false
            				}
          				},
						{key: 'model', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'model', placeholder: "model", required: false
            				}
          				},
						{key: 'sitelink', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'sitelink', placeholder: "sitelink", required: false
            				}
          				},
						{key: 'simulated', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'simulated', placeholder: "Set if this is a mock node simulated by NodeSim", required: false
            				}
          				},
				];
		}]
)
;
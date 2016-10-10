'use strict';
angular.module('myApp.sitesNodes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sitesNodes', {
    templateUrl: 'views/sitesNodes/sitesNodes.html',
    controller: 'sitesNodesCtrl'
  });
}])
.controller('sitesNodesCtrl',
		[ '$scope', 'sitesNodesApi', '$location', 'sitesNodesSelectionSvc', '$timeout',
			function($scope, sitesNodesApi, $location, sitesNodesSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.sitesNodes = sitesNodesApi.query();
				$scope.sitesNodesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.sitesNodesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Site', field:'site'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Local As', field:'local_as'/*, visible: */},
						{ name:'Router', field:'router_id'/*, visible: */},
						{ name:'Serial', field:'serial'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
						{ name:'Zones', field:'zones'/*, visible: */},
						{ name:'Radios', field:'radios'/*, visible: */},
						{ name:'Realm', field:'realm'/*, visible: */},
						{ name:'Location', field:'location'/*, visible: */},
						{ name:'Ports', field:'ports'/*, visible: */},
						{ name:'Uplinks', field:'uplinks'/*, visible: */},
						{ name:'Inventory Version Cc', field:'inventory_version_cc'/*, visible: */},
						{ name:'Disable Stp', field:'disable_stp'/*, visible: */},
						{ name:'License', field:'license'/*, visible: */},
						{ name:'Model', field:'model'/*, visible: */},
						{ name:'Sitelink', field:'sitelink'/*, visible: */},
						{ name:'Simulated', field:'simulated'/*, visible: */},
					],
					data: $scope.sitesNodes,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					sitesNodesApi.save(newObject).$promise.then(function(data){
    						$scope.sitesNodes.push(data);
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
                					$scope.sitesNodesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.sitesNodesSelected = undefined;
				}
				
				$scope.sitesNodesFields = [
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'local_as', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'local_as', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'router_id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'router_id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'serial', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'serial', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'zones', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zones', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'radios', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'radios', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'realm', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'realm', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'location', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'location', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ports', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ports', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplinks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'inventory_version_cc', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'inventory_version_cc', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'disable_stp', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'disable_stp', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'license', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'license', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'model', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'model', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'sitelink', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'sitelink', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'simulated', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'simulated', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);
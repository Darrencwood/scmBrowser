'use strict';
angular.module('myApp.broadcasts', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/broadcasts', {
  	templateUrl: 'views/broadcasts/broadcasts.html',
    controller: 'broadcastsCtrl'
  });
}])
.controller('broadcastsCtrl',
		[ '$scope', 'broadcastsApi', '$location', 'broadcastsSelectionSvc', '$timeout', 
			function($scope, broadcastsApi, $location, broadcastsSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.broadcasts = broadcastsApi.query();
				
				$scope.broadcastsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.broadcastsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Site', field:'site'/*, visible: */},
						{ name:'Zone', field:'zone'/*, visible: */},
						{ name:'Ssid', field:'ssid'/*, visible: */},
						{ name:'Inactive', field:'inactive'/*, visible: */},
						{ name:'Dynzone', field:'dynzone'/*, visible: */},
						{ name:'Portal', field:'portal'/*, visible: */},
						{ name:'Hide Ssid', field:'hide_ssid'/*, visible: */},
						{ name:'Band', field:'band'/*, visible: */},
					],
					data: $scope.broadcasts,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					broadcastsApi.save(newObject).$promise.then(function(data){
    						$scope.broadcasts.push(data);
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
                					$scope.broadcastsSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							broadcastsSelectionSvc.setbroadcasts(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.broadcastsSelected = undefined;
				}
				
				$scope.broadcastsFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'zone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zone', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ssid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ssid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'inactive', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'inactive', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dynzone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dynzone', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'portal', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'portal', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'hide_ssid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'hide_ssid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'band', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'band', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);
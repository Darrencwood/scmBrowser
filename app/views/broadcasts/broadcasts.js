'use strict';

angular.module('myApp.Broadcasts', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/broadcasts', {
    templateUrl: 'views/broadcasts/broadcasts.html',
    controller: 'BroadcastsCtrl'
  });
}])
.controller('BroadcastsCtrl',
		[ '$scope', 'apiBroadcasts', '$location', 'currentBroadcasts', '$timeout',
			function($scope, apiBroadcasts, $location, currentBroadcasts, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Broadcasts = apiBroadcasts.query();
				$scope.BroadcastsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.BroadcastsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'id', field:'id'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'site', field:'site'/*, visible: */},
						{ name:'zone', field:'zone'/*, visible: */},
						{ name:'ssid', field:'ssid'/*, visible: */},
						{ name:'inactive', field:'inactive'/*, visible: */},
						{ name:'dynzone', field:'dynzone'/*, visible: */},
						{ name:'portal', field:'portal'/*, visible: */},
						{ name:'hide_ssid', field:'hide_ssid'/*, visible: */},
						{ name:'band', field:'band'/*, visible: */},
					],
					data: $scope.Broadcasts,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiBroadcasts.save(newObject).$promise.then(function(data){
    						$scope.Broadcasts.push(data);
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
                			$scope.BroadcastsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.BroadcastsSelected = undefined;
				}
				
				$scope.BroadcastsFields = [
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "org", required: false
            				}
          				},
						{key: 'site', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'site', placeholder: "site", required: false
            				}
          				},
						{key: 'zone', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'zone', placeholder: "zone", required: false
            				}
          				},
						{key: 'ssid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'ssid', placeholder: "ssid", required: false
            				}
          				},
						{key: 'inactive', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'inactive', placeholder: "inactive", required: false
            				}
          				},
						{key: 'dynzone', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'dynzone', placeholder: "dynzone", required: false
            				}
          				},
						{key: 'portal', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'portal', placeholder: "portal", required: false
            				}
          				},
						{key: 'hide_ssid', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'hide_ssid', placeholder: "hide_ssid", required: false
            				}
          				},
						{key: 'band', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'band', placeholder: "portal", required: false
            				}
          				},
				];
		}]
)
;
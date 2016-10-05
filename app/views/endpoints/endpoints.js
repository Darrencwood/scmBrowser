'use strict';

angular.module('myApp.Endpoints', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/endpoints', {
    templateUrl: 'views/endpoints/endpoints.html',
    controller: 'EndpointsCtrl'
  });
}])
.controller('EndpointsCtrl',
		[ '$scope', 'apiEndpoints', '$location', 'currentEndpoints', '$timeout',
			function($scope, apiEndpoints, $location, currentEndpoints, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Endpoints = apiEndpoints.query();
				$scope.EndpointsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.EndpointsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'vmac', field:'vmac'/*, visible: */},
						{ name:'secret', field:'secret'/*, visible: */},
						{ name:'id', field:'id'/*, visible: */},
						{ name:'devices', field:'devices'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'user', field:'user'/*, visible: */},
						{ name:'client_id', field:'client_id'/*, visible: */},
					],
					data: $scope.Endpoints,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiEndpoints.save(newObject).$promise.then(function(data){
    						$scope.Endpoints.push(data);
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
                			$scope.EndpointsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.EndpointsSelected = undefined;
				}
				
				$scope.EndpointsFields = [
						{key: 'vmac', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'vmac', placeholder: "vmac", required: false
            				}
          				},
						{key: 'secret', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'secret', placeholder: "secret", required: false
            				}
          				},
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'devices', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'devices', placeholder: "devices", required: false
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "org", required: false
            				}
          				},
						{key: 'user', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'user', placeholder: "user", required: false
            				}
          				},
						{key: 'client_id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'client_id', placeholder: "client_id", required: false
            				}
          				},
				];
		}]
)
;
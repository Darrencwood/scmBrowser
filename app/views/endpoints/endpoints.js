'use strict';
angular.module('myApp.endpoints', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/endpoints', {
    templateUrl: 'views/endpoints/endpoints.html',
    controller: 'endpointsCtrl'
  });
}])
.controller('endpointsCtrl',
		[ '$scope', 'endpointsApi', '$location', 'endpointsSelectionSvc', '$timeout',
			function($scope, endpointsApi, $location, endpointsSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.endpoints = endpointsApi.query();
				$scope.endpointsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.endpointsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Vmac', field:'vmac'/*, visible: */},
						{ name:'Secret', field:'secret'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Devices', field:'devices'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'User', field:'user'/*, visible: */},
						{ name:'Client', field:'client_id'/*, visible: */},
					],
					data: $scope.endpoints,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					endpointsApi.save(newObject).$promise.then(function(data){
    						$scope.endpoints.push(data);
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
                					$scope.endpointsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.endpointsSelected = undefined;
				}
				
				$scope.endpointsFields = [
						{key: 'vmac', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'vmac', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'secret', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'secret', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devices', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devices', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'user', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'user', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'client_id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'client_id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);
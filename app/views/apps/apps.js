'use strict';
angular.module('myApp.apps', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/apps', {
  	templateUrl: 'views/apps/apps.html',
    controller: 'appsCtrl'
  });
}])
.controller('appsCtrl',
		[ '$scope', 'appsApi', '$location', 'appsSelectionSvc', '$timeout', 
			function($scope, appsApi, $location, appsSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.apps = appsApi.query();
				
				$scope.appsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.appsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Desc', field:'desc'/*, visible: */},
						{ name:'Dgrp', field:'dgrp'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
					],
					data: $scope.apps,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					appsApi.save(newObject).$promise.then(function(data){
    						$scope.apps.push(data);
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
                					$scope.appsSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							appsSelectionSvc.setapps(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.appsSelected = undefined;
				}
				
				$scope.appsFields = [
						{key: 'desc', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'desc', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dgrp', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dgrp', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);
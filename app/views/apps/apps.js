'use strict';

angular.module('myApp.Apps', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/apps', {
    templateUrl: 'views/apps/apps.html',
    controller: 'AppsCtrl'
  });
}])
.controller('AppsCtrl',
		[ '$scope', 'apiApps', '$location', 'currentApps', '$timeout',
			function($scope, apiApps, $location, currentApps, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Apps = apiApps.query();
				$scope.AppsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.AppsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'desc', field:'desc'/*, visible: */},
						{ name:'dgrp', field:'dgrp'/*, visible: */},
						{ name:'name', field:'name'/*, visible: */},
						{ name:'id', field:'id'/*, visible: */},
					],
					data: $scope.Apps,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiApps.save(newObject).$promise.then(function(data){
    						$scope.Apps.push(data);
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
                			$scope.AppsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.AppsSelected = undefined;
				}
				
				$scope.AppsFields = [
						{key: 'desc', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'desc', placeholder: "desc", required: false
            				}
          				},
						{key: 'dgrp', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dgrp', placeholder: "dgrp", required: false
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: "name", required: false
            				}
          				},
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
				];
		}]
)
;
'use strict';

angular.module('myApp.Appgroups', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/app_groups', {
    templateUrl: 'views/app_groups/app_groups.html',
    controller: 'AppgroupsCtrl'
  });
}])
.controller('AppgroupsCtrl',
		[ '$scope', 'apiAppgroups', '$location', 'currentAppgroups', '$timeout',
			function($scope, apiAppgroups, $location, currentAppgroups, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Appgroups = apiAppgroups.query();
				$scope.AppgroupsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.AppgroupsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'name', field:'name'/*, visible: */},
						{ name:'webcat', field:'webcat'/*, visible: */},
						{ name:'sapps', field:'sapps'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'predefined', field:'predefined'/*, visible: */},
						{ name:'apps', field:'apps'/*, visible: */},
						{ name:'id', field:'id'/*, visible: */},
						{ name:'desc', field:'desc'/*, visible: */},
					],
					data: $scope.Appgroups,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiAppgroups.save(newObject).$promise.then(function(data){
    						$scope.Appgroups.push(data);
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
                			$scope.AppgroupsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.AppgroupsSelected = undefined;
				}
				
				$scope.AppgroupsFields = [
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: "name", required: false
            				}
          				},
						{key: 'webcat', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'webcat', placeholder: "webcat", required: false
            				}
          				},
						{key: 'sapps', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'sapps', placeholder: "sapps", required: false
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "org", required: false
            				}
          				},
						{key: 'predefined', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'predefined', placeholder: "predefined", required: false
            				}
          				},
						{key: 'apps', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'apps', placeholder: "Apps", required: false
            				}
          				},
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'desc', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'desc', placeholder: "Description", required: false
            				}
          				},
				];
		}]
)
;
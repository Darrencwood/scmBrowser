'use strict';
angular.module('myApp.appGroups', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/app_groups', {
  	templateUrl: 'views/app_groups/appGroups.html',
    controller: 'appGroupsCtrl'
  });
}])
.controller('appGroupsCtrl',
		[ '$scope', 'appGroupsApi', '$location', 'appGroupsSelectionSvc', '$timeout', 
			function($scope, appGroupsApi, $location, appGroupsSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.appGroups = appGroupsApi.query();
				
				$scope.appGroupsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.appGroupsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Webcat', field:'webcat'/*, visible: */},
						{ name:'Sapps', field:'sapps'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Predefined', field:'predefined'/*, visible: */},
						{ name:'Apps', field:'apps'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Desc', field:'desc'/*, visible: */},
					],
					data: $scope.appGroups,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					appGroupsApi.save(newObject).$promise.then(function(data){
    						$scope.appGroups.push(data);
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
                					$scope.appGroupsSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							appGroupsSelectionSvc.setappGroups(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.appGroupsSelected = undefined;
				}
				
				$scope.appGroupsFields = [
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'webcat', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'webcat', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'sapps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'sapps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'predefined', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'predefined', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'apps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'apps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'desc', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'desc', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);
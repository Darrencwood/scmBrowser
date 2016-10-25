'use strict';
angular.module('myApp.appGroups', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/app_groups', {
  	templateUrl: 'views/appGroups/appGroups.html',
    controller: 'appGroupsCtrl'
  });
}])
.controller('appGroupsCtrl',
		[ '$scope', 'appGroupsApi', '$location', 'appGroupsSelectionSvc', '$timeout'   , 'proxyRegisterSvc', 
			function($scope, appGroupsApi, $location, appGroupsSelectionSvc, $timeout  , proxyRegisterSvc) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.isProxyRegister = function() {
					return proxyRegisterSvc.hasRegister;
				}
				
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
					enableSelectAll: true,
					multiSelect: false,
					modifierKeysToMultiSelect: false,
					noUnselect: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: ':appgrpid.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Name', field:'name'/*, visible: */, enableCellEdit: ('name'=='id' || 'name'=='uid' || 'name'=='gid')? false: true},
						{ name:'Webcat', field:'webcat'/*, visible: */, enableCellEdit: ('webcat'=='id' || 'webcat'=='uid' || 'webcat'=='gid')? false: true},
						{ name:'Sapps', field:'sapps'/*, visible: */, enableCellEdit: ('sapps'=='id' || 'sapps'=='uid' || 'sapps'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Predefined', field:'predefined'/*, visible: */, enableCellEdit: ('predefined'=='id' || 'predefined'=='uid' || 'predefined'=='gid')? false: true},
						{ name:'Apps', field:'apps'/*, visible: */, enableCellEdit: ('apps'=='id' || 'apps'=='uid' || 'apps'=='gid')? false: true},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Desc', field:'desc'/*, visible: */, enableCellEdit: ('desc'=='id' || 'desc'=='uid' || 'desc'=='gid')? false: true},
					],
					data: $scope.appGroups,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
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
      					gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            				console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
            				console.log(rowEntity);
            				let req = { };
							req['appgrpid'] = rowEntity.id;
            				appGroupsApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
          				gridApi.selection.on.rowSelectionChanged($scope,function(row){
        					console.log('row selected ' + row.entity.id);
        					appGroupsSelectionSvc.setappGroups(row.entity);
        					$scope.appGroupsSelected = row.entity;
							$scope.showSelectedRecord = true;
      					});
    					}
				};
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.appGroupsSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['appgrpid'] = row.entity.id;
					appGroupsApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.appGroups.length; i++){
							if ($scope.appGroups[i].id == row.entity.id) {
								$scope.appGroups.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

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
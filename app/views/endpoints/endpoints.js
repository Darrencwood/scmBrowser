'use strict';
angular.module('myApp.endpoints', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/endpoints', {
  	templateUrl: 'views/endpoints/endpoints.html',
    controller: 'endpointsCtrl'
  });
}])
.controller('endpointsCtrl',
		[ '$scope', 'endpointsApi', '$location', 'endpointsSelectionSvc', '$timeout'   , 'proxyRegisterSvc', 
			function($scope, endpointsApi, $location, endpointsSelectionSvc, $timeout  , proxyRegisterSvc) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.isProxyRegister = function() {
					return proxyRegisterSvc.hasRegister;
				}
				
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
					enableSelectAll: true,
					multiSelect: false,
					modifierKeysToMultiSelect: false,
					noUnselect: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: ':epid.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Vmac', field:'vmac'/*, visible: */, enableCellEdit: ('vmac'=='id' || 'vmac'=='uid' || 'vmac'=='gid')? false: true},
						{ name:'Secret', field:'secret'/*, visible: */, enableCellEdit: ('secret'=='id' || 'secret'=='uid' || 'secret'=='gid')? false: true},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Devices', field:'devices'/*, visible: */, enableCellEdit: ('devices'=='id' || 'devices'=='uid' || 'devices'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'User', field:'user'/*, visible: */, enableCellEdit: ('user'=='id' || 'user'=='uid' || 'user'=='gid')? false: true},
						{ name:'Client', field:'client_id'/*, visible: */, enableCellEdit: ('client_id'=='id' || 'client_id'=='uid' || 'client_id'=='gid')? false: true},
					],
					data: $scope.endpoints,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
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
      					gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            				console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
            				console.log(rowEntity);
            				let req = { };
							req['epid'] = rowEntity.id;
            				endpointsApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
          				gridApi.selection.on.rowSelectionChanged($scope,function(row){
        					console.log('row selected ' + row.entity.id);
        					endpointsSelectionSvc.setendpoints(row.entity);
        					$scope.endpointsSelected = row.entity;
							$scope.showSelectedRecord = true;
      					});
    					}
				};
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.endpointsSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['epid'] = row.entity.id;
					endpointsApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.endpoints.length; i++){
							if ($scope.endpoints[i].id == row.entity.id) {
								$scope.endpoints.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

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
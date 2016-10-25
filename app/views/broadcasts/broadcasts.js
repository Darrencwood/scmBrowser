'use strict';
angular.module('myApp.broadcasts', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/broadcasts', {
  	templateUrl: 'views/broadcasts/broadcasts.html',
    controller: 'broadcastsCtrl'
  });
}])
.controller('broadcastsCtrl',
		[ '$scope', 'broadcastsApi', '$location', 'broadcastsSelectionSvc', '$timeout'   , 'proxyRegisterSvc', 
			function($scope, broadcastsApi, $location, broadcastsSelectionSvc, $timeout  , proxyRegisterSvc) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.isProxyRegister = function() {
					return proxyRegisterSvc.hasRegister;
				}
				
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
					enableSelectAll: true,
					multiSelect: false,
					modifierKeysToMultiSelect: false,
					noUnselect: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: ':bcastid.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Site', field:'site'/*, visible: */, enableCellEdit: ('site'=='id' || 'site'=='uid' || 'site'=='gid')? false: true},
						{ name:'Zone', field:'zone'/*, visible: */, enableCellEdit: ('zone'=='id' || 'zone'=='uid' || 'zone'=='gid')? false: true},
						{ name:'Ssid', field:'ssid'/*, visible: */, enableCellEdit: ('ssid'=='id' || 'ssid'=='uid' || 'ssid'=='gid')? false: true},
						{ name:'Inactive', field:'inactive'/*, visible: */, enableCellEdit: ('inactive'=='id' || 'inactive'=='uid' || 'inactive'=='gid')? false: true},
						{ name:'Dynzone', field:'dynzone'/*, visible: */, enableCellEdit: ('dynzone'=='id' || 'dynzone'=='uid' || 'dynzone'=='gid')? false: true},
						{ name:'Portal', field:'portal'/*, visible: */, enableCellEdit: ('portal'=='id' || 'portal'=='uid' || 'portal'=='gid')? false: true},
						{ name:'Hide Ssid', field:'hide_ssid'/*, visible: */, enableCellEdit: ('hide_ssid'=='id' || 'hide_ssid'=='uid' || 'hide_ssid'=='gid')? false: true},
						{ name:'Band', field:'band'/*, visible: */, enableCellEdit: ('band'=='id' || 'band'=='uid' || 'band'=='gid')? false: true},
					],
					data: $scope.broadcasts,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
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
      					gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            				console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
            				console.log(rowEntity);
            				let req = { };
							req['bcastid'] = rowEntity.id;
            				broadcastsApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
          				gridApi.selection.on.rowSelectionChanged($scope,function(row){
        					console.log('row selected ' + row.entity.id);
        					broadcastsSelectionSvc.setbroadcasts(row.entity);
        					$scope.broadcastsSelected = row.entity;
							$scope.showSelectedRecord = true;
      					});
    					}
				};
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.broadcastsSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['bcastid'] = row.entity.id;
					broadcastsApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.broadcasts.length; i++){
							if ($scope.broadcasts[i].id == row.entity.id) {
								$scope.broadcasts.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

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
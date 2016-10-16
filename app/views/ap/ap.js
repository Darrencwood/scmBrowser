'use strict';
angular.module('myApp.ap', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/ap', {
  	templateUrl: 'views/ap/ap.html',
    controller: 'apCtrl'
  });
}])
.controller('apCtrl',
		[ '$scope', 'apApi', '$location', 'apSelectionSvc', '$timeout', 
			function($scope, apApi, $location, apSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.ap = apApi.query();
				
				$scope.apSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.apGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					enableSelectAll: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: ':apid.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					multiSelect: false,
					modifierKeysToMultiSelect: false,
					noUnselect: true,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Site', field:'site'/*, visible: */, enableCellEdit: ('site'=='id' || 'site'=='uid' || 'site'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Local As', field:'local_as'/*, visible: */, enableCellEdit: ('local_as'=='id' || 'local_as'=='uid' || 'local_as'=='gid')? false: true},
						{ name:'Router', field:'router_id'/*, visible: */, enableCellEdit: ('router_id'=='id' || 'router_id'=='uid' || 'router_id'=='gid')? false: true},
						{ name:'Serial', field:'serial'/*, visible: */, enableCellEdit: ('serial'=='id' || 'serial'=='uid' || 'serial'=='gid')? false: true},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Uid', field:'uid'/*, visible: */, enableCellEdit: ('uid'=='id' || 'uid'=='uid' || 'uid'=='gid')? false: true},
						{ name:'Zones', field:'zones'/*, visible: */, enableCellEdit: ('zones'=='id' || 'zones'=='uid' || 'zones'=='gid')? false: true},
						{ name:'Radios', field:'radios'/*, visible: */, enableCellEdit: ('radios'=='id' || 'radios'=='uid' || 'radios'=='gid')? false: true},
						{ name:'Realm', field:'realm'/*, visible: */, enableCellEdit: ('realm'=='id' || 'realm'=='uid' || 'realm'=='gid')? false: true},
						{ name:'Location', field:'location'/*, visible: */, enableCellEdit: ('location'=='id' || 'location'=='uid' || 'location'=='gid')? false: true},
						{ name:'Ports', field:'ports'/*, visible: */, enableCellEdit: ('ports'=='id' || 'ports'=='uid' || 'ports'=='gid')? false: true},
						{ name:'Uplinks', field:'uplinks'/*, visible: */, enableCellEdit: ('uplinks'=='id' || 'uplinks'=='uid' || 'uplinks'=='gid')? false: true},
						{ name:'Inventory Version Cc', field:'inventory_version_cc'/*, visible: */, enableCellEdit: ('inventory_version_cc'=='id' || 'inventory_version_cc'=='uid' || 'inventory_version_cc'=='gid')? false: true},
						{ name:'Disable Stp', field:'disable_stp'/*, visible: */, enableCellEdit: ('disable_stp'=='id' || 'disable_stp'=='uid' || 'disable_stp'=='gid')? false: true},
						{ name:'License', field:'license'/*, visible: */, enableCellEdit: ('license'=='id' || 'license'=='uid' || 'license'=='gid')? false: true},
						{ name:'Model', field:'model'/*, visible: */, enableCellEdit: ('model'=='id' || 'model'=='uid' || 'model'=='gid')? false: true},
						{ name:'Sitelink', field:'sitelink'/*, visible: */, enableCellEdit: ('sitelink'=='id' || 'sitelink'=='uid' || 'sitelink'=='gid')? false: true},
						{ name:'Simulated', field:'simulated'/*, visible: */, enableCellEdit: ('simulated'=='id' || 'simulated'=='uid' || 'simulated'=='gid')? false: true},
					],
					data: $scope.ap,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apApi.save(newObject).$promise.then(function(data){
    						$scope.ap.push(data);
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
							req['apid'] = rowEntity.id;
            				apApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.apSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							apSelectionSvc.setap(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.apSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['apid'] = row.entity.id;
					apApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.ap.length; i++){
							if ($scope.ap[i].id == row.entity.id) {
								$scope.ap.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.apFields = [
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'local_as', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'local_as', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'router_id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'router_id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'serial', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'serial', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'zones', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zones', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'radios', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'radios', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'realm', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'realm', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'location', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'location', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ports', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ports', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplinks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'inventory_version_cc', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'inventory_version_cc', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'disable_stp', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'disable_stp', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'license', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'license', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'model', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'model', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'sitelink', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'sitelink', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'simulated', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'simulated', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);
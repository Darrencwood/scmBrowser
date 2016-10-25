'use strict';
angular.module('myApp.ssids', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/ssids', {
  	templateUrl: 'views/ssids/ssids.html',
    controller: 'ssidsCtrl'
  });
}])
.controller('ssidsCtrl',
		[ '$scope', 'ssidsApi', '$location', 'ssidsSelectionSvc', '$timeout'   , 'proxyRegisterSvc', 
			function($scope, ssidsApi, $location, ssidsSelectionSvc, $timeout  , proxyRegisterSvc) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.isProxyRegister = function() {
					return proxyRegisterSvc.hasRegister;
				}
				
				$scope.ssids = ssidsApi.query();
				$scope.ssidsSelected = '';
				
				
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.ssidsGridOptions = {
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
					exporterCsvFilename: ':ssidid.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Ssid', field:'ssid'/*, visible: */, enableCellEdit: ('ssid'=='id' || 'ssid'=='uid' || 'ssid'=='gid')? false: true},
						{ name:'Security', field:'security'/*, visible: */, enableCellEdit: ('security'=='id' || 'security'=='uid' || 'security'=='gid')? false: true},
						{ name:'Encryption', field:'encryption'/*, visible: */, enableCellEdit: ('encryption'=='id' || 'encryption'=='uid' || 'encryption'=='gid')? false: true},
						{ name:'Key', field:'key'/*, visible: */, enableCellEdit: ('key'=='id' || 'key'=='uid' || 'key'=='gid')? false: true},
						{ name:'Authentication', field:'authentication'/*, visible: */, enableCellEdit: ('authentication'=='id' || 'authentication'=='uid' || 'authentication'=='gid')? false: true},
						{ name:'Eapol Version', field:'eapol_version'/*, visible: */, enableCellEdit: ('eapol_version'=='id' || 'eapol_version'=='uid' || 'eapol_version'=='gid')? false: true},
						{ name:'Dtim Period', field:'dtim_period'/*, visible: */, enableCellEdit: ('dtim_period'=='id' || 'dtim_period'=='uid' || 'dtim_period'=='gid')? false: true},
						{ name:'Bcasts', field:'bcasts'/*, visible: */, enableCellEdit: ('bcasts'=='id' || 'bcasts'=='uid' || 'bcasts'=='gid')? false: true},
					],
					data: $scope.ssids,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					ssidsApi.save(newObject).$promise.then(function(data){
    						$scope.ssids.push(data);
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
							req['ssidid'] = rowEntity.id;
            				ssidsApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
          				gridApi.selection.on.rowSelectionChanged($scope,function(row){
        					console.log('row selected ' + row.entity.id);
        					ssidsSelectionSvc.setssids(row.entity);
        					$scope.ssidsSelected = row.entity;
							$scope.showSelectedRecord = true;
      					});
    					}
				};
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.ssidsSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['ssidid'] = row.entity.id;
					ssidsApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.ssids.length; i++){
							if ($scope.ssids[i].id == row.entity.id) {
								$scope.ssids.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.ssidsFields = [
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
						{key: 'ssid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ssid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'security', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'security', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'encryption', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'encryption', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'key', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'key', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'authentication', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'authentication', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'eapol_version', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'eapol_version', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dtim_period', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dtim_period', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'bcasts', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bcasts', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);
'use strict';
angular.module('myApp.orgsEndpoints', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs/orgsEndpoints', {
  templateUrl: 'views/orgs/orgsEndpoints/orgsEndpoints.html',
    controller: 'orgsEndpointsCtrl'
  });
}])
.controller('orgsEndpointsCtrl',
		[ '$scope', 'orgsEndpointsApi', '$location', 'orgsEndpointsSelectionSvc', '$timeout' , 'orgsSelectionSvc'   , 'proxyRegisterSvc', 
			function($scope, orgsEndpointsApi, $location, orgsEndpointsSelectionSvc, $timeout  , orgsSelectionSvc  , proxyRegisterSvc) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.isProxyRegister = function() {
					return proxyRegisterSvc.hasRegister;
				}
				
				$scope.orgsEndpointsSelected = orgsSelectionSvc.getorgs();
				$scope.orgsEndpoints = orgsEndpointsApi.query({ orgid: $scope.orgsEndpointsSelected.id });
				
				
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsEndpointsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: 'endpoints.csv',
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
					data: $scope.orgsEndpoints,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsEndpointsApi.save({ orgid: $scope.orgsEndpointsSelected.id }, newObject).$promise.then(function(data){
    						$scope.orgsEndpoints.push(data);
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
            				orgsEndpointsApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
				$scope.deselect = function(){ 
					orgsEndpointsSelectionSvc.setorgsEndpoints();
					$location.path('/orgs');
				}
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsEndpointsSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['epid'] = row.entity.id;
					orgsEndpointsApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgsEndpoints.length; i++){
							if ($scope.orgsEndpoints[i].id == row.entity.id) {
								$scope.orgsEndpoints.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.orgsEndpointsFields = [
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
				console.log();
            		var uploadZone = document.getElementById('upload');

					// Optional.   Show the copy icon when dragging over.  Seems to
    				// only work for chrome.
    				uploadZone.addEventListener('dragover', function(e) {
    		    		e.stopPropagation();
    		    		e.preventDefault();
    		    		e.dataTransfer.dropEffect = 'copy';
    				});
            
            		// Get file data on drop
    				uploadZone.addEventListener('drop', function(e) {
    		    		e.stopPropagation();
    		    		e.preventDefault();
    		    		var files = e.dataTransfer.files; // Array of all files
    		    		$scope.updateResults =[];
    		    		$scope.showUploadResults = true;
    		    		$scope.gridApi.importer.importFile(files[0]);
					});
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("zvmac,secret,devices,org,user,client_id\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "endpoints.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);